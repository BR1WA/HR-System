<?php

namespace App\Http\Controllers;

use App\Events\NotificationEvent;
use App\Models\Demande;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use TCPDF;

class DemandeController extends Controller
{
    // Lister les demandes
    public function index()
    {
        $demandes = Demande::with('user')->get();

        return response()->json($demandes);
    }

    public function getUserDemandes(Request $request, User $user)
    {
        abort_unless($request->user()->is($user) || $request->user()->hasRole('admin'), 403);

        $demandes = Demande::where('user_id', $user->id)->get();

        return response()->json($demandes);
    }

    // Stocker une nouvelle demande
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'type' => ['required', Rule::in([
                'demande_quitter_territoire_national',
                'demande_attestation_salaire',
                'demande_vacance_annuelle',
                'damande_absence',
                'demande_licence_exceptionnelle',
                'demande_attestation_travail',
                'demande_attestation_travail_ar',
            ])],
            'date_debut' => ['nullable', 'date'],
            'date_fin' => ['nullable', 'date', 'after_or_equal:date_debut'],
            'raison' => ['nullable', 'string', 'max:1000'],
            'destination_torab_lwatani' => ['nullable', 'string', 'max:255'],
        ]);

        switch ($request->input('type')) {
            case 'demande_quitter_territoire_national':
                $validator->after(function ($validator) use ($request) {
                    if (! $request->filled('date_debut') || ! $request->filled('date_fin') || ! $request->filled('destination_torab_lwatani')) {
                        $validator->errors()->add('date_debut', 'Date de début est requise');
                        $validator->errors()->add('date_fin', 'Date de fin est requise');
                        $validator->errors()->add('destination_torab_lwatani', 'Destination est requise');
                    }
                });
                break;
            case 'demande_attestation_salaire':
            case 'demande_vacance_annuelle':
                $validator->after(function ($validator) use ($request) {
                    if (! $request->filled('date_debut') || ! $request->filled('date_fin')) {
                        $validator->errors()->add('date_debut', 'Date de début est requise');
                        $validator->errors()->add('date_fin', 'Date de fin est requise');
                    }
                });
                break;
            case 'damande_absence':
            case 'demande_licence_exceptionnelle':
                $validator->after(function ($validator) use ($request) {
                    if (! $request->filled('date_debut') || ! $request->filled('date_fin') || ! $request->filled('raison')) {
                        $validator->errors()->add('date_debut', 'Date de début est requise');
                        $validator->errors()->add('date_fin', 'Date de fin est requise');
                        $validator->errors()->add('raison', 'Raison est requise');
                    }
                });
                break;
            case 'demande_attestation_travail':
            case 'demande_attestation_travail_ar':
                // No additional validation needed
                break;
        }

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $demande = Demande::create(array_merge($validator->validated(), [
            'user_id' => $request->user()->id,
            'traitement' => 'en cours',
        ]));
        $demande->load('user');
        event(new NotificationEvent($demande));

        return response()->json($demande, 201);
    }

    // Générer un PDF selon le type de demande
    public function generatePDF(Demande $demande)
    {
        $user = $demande->user;

        $pdf = new TCPDF('P', 'mm', 'A4', true, 'UTF-8', false);
        $pdf->SetFont('dejavusans', '', 12, '', true);
        $pdf->AddPage();
        $currentDate = date('d/m/Y');

        $viewData = [
            'nom' => $user->nom,
            'prenom' => $user->prenom,
            'date_debut' => $demande->date_debut,
            'date_fin' => $demande->date_fin,
            'date' => $currentDate,
            'grade' => $user->grade,
            'cin' => $user->cin,
            'ppr' => $user->ppr,
        ];

        $content = '';

        try {
            switch ($demande->type) {
                case 'demande_quitter_territoire_national':
                    $viewData['destination_torab_lwatani'] = $demande->destination_torab_lwatani;
                    $content = view('attestations.quitter_territoire_national', $viewData)->render();
                    break;
                case 'demande_attestation_salaire':
                    $content = view('attestations.demande_attestation_salaire', $viewData)->render();
                    break;
                case 'demande_vacance_annuelle':
                case 'demande__vacance_annuelle':
                    $content = view('attestations.demande_vacance_annuelle', $viewData)->render();
                    break;
                case 'damande_absence':
                    $viewData['raison'] = $demande->raison;
                    $content = view('attestations.damande_absence', $viewData)->render();
                    break;
                case 'demande_licence_exceptionnelle':
                    $viewData['raison'] = $demande->raison;
                    $content = view('attestations.demande_licence_exceptionnelle', $viewData)->render();
                    break;
                case 'demande_attestation_travail':
                    $content = view('attestations.demande_attestation_travail', $viewData)->render();
                    break;
                case 'demande_attestation_travail_ar':
                    $content = view('attestations.demande_attestation_travail_ar', $viewData)->render();
                    break;
            }

            $pdf->writeHTML($content, true, false, true, false, '');

            // Set the path where you want to store the PDF file
            $storagePath = storage_path('app/public/Attestations/attestation.pdf');

            // Output PDF document to the storage path
            $pdf->Output($storagePath, 'F');
            $demande->update(['traitement' => 'valider']);

            // Optionally, you can return the storage path or any other response
            return asset('storage/Attestations/attestation.pdf');

        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to generate PDF: '.$e->getMessage()], 500);
        }
    }

    public function updateStatus(Request $request, Demande $demande)
    {
        $request->validate([
            'status' => 'required|in:en cours,valider,rejeter',
        ]);
        $demande->update(['traitement' => $request->status]);

        return response()->json([
            'message' => 'Statut mis à jour avec succès',
            'demande' => $demande,
        ]);
    }
}
