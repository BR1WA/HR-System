<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Récupérer tous les utilisateurs
        $users = User::all();
        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Valider les données de la requête
        $validatedData = $request->validate([
            'ppr' => 'nullable|string',
            'nom' => 'nullable|string',
            'prenom' => 'nullable|string',
            'nom_ar' => 'nullable|string',
            'prenom_ar' => 'nullable|string',
            'cin' => 'nullable|string',
            'genre' => 'nullable|string',
            'lieu_naissance' => 'nullable|string',
            'adresse' => 'nullable|string',
            'telephone' => 'nullable|string',
            'situation_familiale' => 'nullable|string',
            'nationalite' => 'nullable|string',
            'grade' => 'nullable|string',
            'type_personnel' => 'nullable|string',
            'departement' => 'nullable|string',
            'diplome' => 'nullable|string',
            'specialite' => 'nullable|string',
            'etabl_diplome' => 'nullable|string',
            'situation_administrative' => 'nullable|string',
            'fonction_exercee' => 'nullable|string',
            'service_affectation' => 'nullable|string',
            'type_mouvement' => 'nullable|string',
            'organisme_accueil' => 'nullable|string',
            'date_mouvement' => 'nullable|date',
            'date_expiration_mouvement' => 'nullable|date',
            'date_naissance' => 'nullable|date',
            'date_debut_fonction' => 'nullable|date',
            'date_recrutement' => 'nullable|date',
            'echelle' => 'nullable|integer',
            'echelon' => 'nullable|integer',
            'indice' => 'nullable|integer',
            'email' => 'nullable|email|unique:users',
            'type' => 'nullable|string',
            'is_admin' => 'required|boolean',
            'is_archive' => 'required|boolean',
        ]);

        // Créer un nouvel utilisateur
        $user = User::create($validatedData);
        return response()->json($user, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Récupérer un utilisateur spécifique
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Valider les données de la requête
        $validatedData = $request->validate([
            'ppr' => 'nullable|string',
            'nom' => 'nullable|string',
            'prenom' => 'nullable|string',
            'nom_ar' => 'nullable|string',
            'prenom_ar' => 'nullable|string',
            'cin' => 'nullable|string',
            'genre' => 'nullable|string',
            'lieu_naissance' => 'nullable|string',
            'adresse' => 'nullable|string',
            'telephone' => 'nullable|string',
            'situation_familiale' => 'nullable|string',
            'nationalite' => 'nullable|string',
            'grade' => 'nullable|string',
            'type_personnel' => 'nullable|string',
            'departement' => 'nullable|string',
            'diplome' => 'nullable|string',
            'specialite' => 'nullable|string',
            'etabl_diplome' => 'nullable|string',
            'situation_administrative' => 'nullable|string',
            'fonction_exercee' => 'nullable|string',
            'service_affectation' => 'nullable|string',
            'type_mouvement' => 'nullable|string',
            'organisme_accueil' => 'nullable|string',
            'date_mouvement' => 'nullable|date',
            'date_expiration_mouvement' => 'nullable|date',
            'date_naissance' => 'nullable|date',
            'date_debut_fonction' => 'nullable|date',
            'date_recrutement' => 'nullable|date',
            'echelle' => 'nullable|integer',
            'echelon' => 'nullable|integer',
            'indice' => 'nullable|integer',
            'email' => 'nullable|email|unique:users,email,' . $id,
            'type' => 'nullable|string',
            'is_admin' => 'required|boolean',
            'is_archive' => 'required|boolean',
        ]);

        // Mettre à jour l'utilisateur
        $user = User::findOrFail($id);
        $user->update($validatedData);
        return response()->json($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Supprimer un utilisateur
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(null, 204);
    }
}
