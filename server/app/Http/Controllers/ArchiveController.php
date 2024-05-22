<?php
// app/Http/Controllers/ArchiveController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Archive;
use App\Models\User;

class ArchiveController extends Controller
{
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

        return response()->json($archives);
    }
}
