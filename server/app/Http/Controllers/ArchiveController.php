<?php
// app/Http/Controllers/ArchiveController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Archive;
use App\Models\User;

class ArchiveController extends Controller
{
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

        return response()->json($archives);
    }
}