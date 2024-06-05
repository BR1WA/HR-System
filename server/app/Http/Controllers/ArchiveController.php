<?php
// app/Http/Controllers/ArchiveController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Archive;
use App\Models\User;

class ArchiveController extends Controller
{
<<<<<<< HEAD
    public function archiveUser(Request $request, $userId)
{
    try {
        // Update the user's is_archived status
        $user = User::findOrFail($userId);
        $user->is_archived = true;
        $user->save();

        // Create a new archive entry
        $archive = new Archive();
        $archive->user_id = $userId;
        $archive->date = now(); // Current date
        $archive->raison = $request->input('raison', "Raison de l'archivage"); // Default reason if not provided
        $archive->save();

        return response()->json(['message' => 'Utilisateur archivé avec succès'], 201);
    } catch (\Exception $e) {
        // Log the error for debugging purposes
        Log::error('Failed to archive user: ' . $e->getMessage());

        return response()->json(['message' => 'Failed to archive user'], 500);
    }
}


    public function getArchives()
    {
        $archives = Archive::with('user')->orderBy('created_at', 'desc')->get();

=======
    public function archiveUser(User $user)
    {
        $archive = new Archive();
        $archive->user_id = $user->id;
        $archive->date = now(); // Date actuelle
        $archive->raison = "Raison de l'archivage"; // Vous pouvez personnaliser cela selon vos besoins
        $archive->save();

        return response()->json(['message' => 'Utilisateur archivé avec succès'], 201);
    }

    public function getArchives()
    {
        $archives = Archive::with('user')->orderBy('created_at', 'desc')->get();

>>>>>>> 6511c8f9ea7f7bbbb1b272c405e3cf4ab314e4d4
        return response()->json($archives);
    }
}
