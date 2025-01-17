<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function setAvatar(Request $request, string $id){
        $employee=User::find($id);
        try{
            if($employee){
                $request->validate([
                    'avatar' => ['required', 'file', 'mimes:jpg', 'max:2048']
                ]);
                $request->file('avatar')->storeAs('public/Avatars', $id.'.jpg');
                $avatar=asset("storage/Avatars/{$employee->id}.jpg");
                return response()->json(['message' => 'The avatar was set successfully', 'avatar' =>$avatar]);
            }else{
                return response()->json('The employee was not found');
            }
        }catch(Exception $e) {
            return response()->json($e);
        }
    }


    
    public function deleteAvatar($id)
    {
        try {
            $avatarPath = "public/Avatars/{$id}.jpg";
            
            if (Storage::exists($avatarPath)) {
                Storage::delete($avatarPath);
                return response()->json(['message' => 'Avatar deleted successfully']);
            } else {
                return response()->json(['message' => 'Avatar not found'], 404);
            }
        } catch (Exception $e) {
            return response()->json(['message' => 'Error deleting avatar', 'error' => $e->getMessage()], 500);
        }
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Récupérer tous les utilisateurs
        $users = User::with('archive')->get(); 
        foreach ($users as $user) {
            $avatarPath = "public/Avatars/{$user->id}.jpg";
            if (Storage::exists($avatarPath)) {
                $user->avatar = asset("storage/Avatars/{$user->id}.jpg");
            } else {
                $user->avatar = null;
            }
        }
        $response = response()->json($users);

        $response->header('Cache-Control', 'no-cache, no-store, must-revalidate');
        $response->header('Pragma', 'no-cache');
        $response->header('Expires', '0');

        return $response;
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
            'echelle' => 'nullable|string',
            'echelon' => 'nullable|string',
            'indice' => 'nullable|string',
            'email' => 'nullable|email|unique:users',
            'type' => 'nullable|string',
            'is_archived' => 'boolean',
        ]);

        // Créer un nouvel utilisateur
        $user = User::create($validatedData);
        if ($request) {
                $request->validate([
                    'arrete' => ['required', 'file', 'mimes:jpg', 'max:2048']
                ]);
                $request->file('arrete')->storeAs('public/Arrete', $user->id.'.jpg');
                $arrete=asset("storage/Arrete/{$user->id}.jpg");
                return response()->json(['message' => 'The Arrete was set successfully', 'Arrete' =>$arrete]);
            return response()->json($user, 201);
        }
        return response()->json($user, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $user = User::findOrFail($id);
        $avatar = "public/Avatars/$id.jpg";
        if (Storage::exists($avatar)) {
            $user->avatar = asset("storage/Avatars/$id.jpg");
        } else {
            $user->avatar = null; 
        }
        $arrete = "public/Arrete/$id.jpg";
        if (Storage::exists($arrete)) {
            $user->arrete = asset("storage/Arrete/$id.jpg");
        } else {
            $user->arrete = null; 
        }
        return response()->json($user);
        } catch (Exception $e) {
            return response()->json($e);

        }
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
            'echelle' => 'nullable|string',
            'echelon' => 'nullable|string',
            'indice' => 'nullable|string',
            'email' => 'nullable|email|unique:users,email,' . $id,
            'type' => 'nullable|string',
            'is_archived' => 'boolean',
            // briwa hadi dyal arrete
            'arrete' => 'nullable|file|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Mettre à jour l'utilisateur
        $user = User::findOrFail($id);
        $user->update($validatedData);
        // briwa hadou dyal arrete
        if ($request->hasFile('arrete')) {
            $request->file('arrete')->storeAs('public/Arreters', $user->id.'.jpg');
            $user->arrete = asset("storage/Arreters/{$user->id}.jpg");
            $user->save();
        }
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
