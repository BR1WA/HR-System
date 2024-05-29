<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use PDF;

class CertificateController extends Controller
{
    public function printCertificate($id)
    {
        // Récupérer les informations de l'utilisateur
        $user = User::findOrFail($id);

        // Générer le PDF avec les informations de l'utilisateur
        $pdf = PDF::loadView('certificates.user_certificate', compact('user'));

        // Télécharger le PDF
        return $pdf->download('certificate.pdf');
    }
}
