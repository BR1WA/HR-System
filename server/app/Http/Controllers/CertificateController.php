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
    public function generatePDF($id)
    {
        $user = User::findOrFail($id);
    
        $data = [
            'title' => 'Hello',
            'date' => date('d/m/Y'),
            'nom' => $user->nom,
            'prenom' => $user->prenom,
            'cin' => $user->cin,
        ]; 
              
        $pdf = PDF::loadView('MyPDF', $data);
       
        return $pdf->download('user.pdf');
    }
    public function showVacationCertificate($id)
{
    $professeur = User::findOrFail($id);
    return view('rh.certificat_vacance', compact('professeur'));
}

public function showAuthorizationCertificate($id)
{
    $professeur = User::findOrFail($id);
    return view('rh.certificat_autorisation', compact('professeur'));
}

public function showAttestationTarifaire($id)
{
    $professeur = User::findOrFail($id);
    return view('rh.certificat_attestation_tarifaire', compact('professeur'));
}

public function showAttestationTravail($id)
{
    $professeur = User::findOrFail($id);
    return view('rh.certificat_attestation_travail', compact('professeur'));
}
}
