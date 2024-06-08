<?php

namespace App\Http\Controllers;

use App\Models\Demande;
use Illuminate\Http\Request;
use TCPDF;
use Illuminate\Support\Facades\Validator;

class DemandeController extends Controller
{
    // Lister les demandes
    public function index()
    {
        $demandes = Demande::with('user')->get();
        return response()->json($demandes);
    }

    // Stocker une nouvelle demande
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'type' => 'required|string',
            'user_id' => 'required|exists:users,id',
        ]);

        switch ($request->input('type')) {
            case 'demande_quitter_territoire_national':
                $validator->after(function ($validator) use ($request) {
                    if (!$request->filled('date_debut') || !$request->filled('date_fin') || !$request->filled('destination_torab_lwatani')) {
                        $validator->errors()->add('date_debut', 'Date de début est requise');
                        $validator->errors()->add('date_fin', 'Date de fin est requise');
                        $validator->errors()->add('destination_torab_lwatani', 'Destination est requise');
                    }
                });
                break;
            case 'demande_attestation_salaire':
            case 'demande_vacance_annuelle':
                $validator->after(function ($validator) use ($request) {
                    if (!$request->filled('date_debut') || !$request->filled('date_fin')) {
                        $validator->errors()->add('date_debut', 'Date de début est requise');
                        $validator->errors()->add('date_fin', 'Date de fin est requise');
                    }
                });
                break;
            case 'damande_absence':
            case 'demande_licence_exceptionnelle':
                $validator->after(function ($validator) use ($request) {
                    if (!$request->filled('date_debut') || !$request->filled('date_fin') || !$request->filled('raison')) {
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

        $demande = Demande::create(array_merge($request->all(), ['traitement' => 'en cours']));
        return response()->json($demande, 201);
    }

    // Générer un PDF selon le type de demande
    public function generatePDF($id)
    {
        $demande = Demande::findOrFail($id);
        $user = $demande->user;

        $pdf = new TCPDF('P', 'mm', 'A4', true, 'UTF-8', false);
        $pdf->SetFont('dejavusans', '', 12, '', true);
        $pdf->AddPage();

        $viewData = [
            'nom' => $user->nom,
            'prenom' => $user->prenom,
            'date_debut' => $demande->date_debut,
            'date_fin' => $demande->date_fin,
            'grade' => $user->grade,
            'cin' => $user->cin,
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
            $pdf->Output('attestation.pdf', 'D');

            // Update the request status to 'valider'
            $demande->update(['traitement' => 'valider']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to generate PDF: ' . $e->getMessage()], 500);
        }
    }
}
