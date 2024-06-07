<?php
namespace App\Http\Controllers;

use App\Models\Demande;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DemandeController extends Controller
{
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
            case 'demande__vacance_annuelle':
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
            break;
        }

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Créer la demande avec le champ traitement par défaut
        $demande = Demande::create(array_merge($request->all(), ['traitement' => 'en cour']));

        return response()->json($demande, 201);
    }
}
