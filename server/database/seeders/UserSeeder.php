<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // $admin = User::create([
        //     "nom" => "admin",
        //     "email" => "salaheddinezouitni00@gmail.com"
        // ]);
        // $admin->assignRole("admin");

        // $employee = User::create([
        //     'ppr' => 'PPR003',
        //     'nom' => 'Ahmed',
        //     'prenom' => 'Mohamed',
        //     'nom_ar' => 'أحمد',
        //     'prenom_ar' => 'محمد',
        //     'cin' => 'CIN789012',
        //     'genre' => 'homme',
        //     'lieu_naissance' => 'Rabat',
        //     'adresse' => '789 Some Street, Rabat, Morocco',
        //     'telephone' => '0611223344',
        //     'situation_familiale' => 'célibataire',
        //     'nationalite' => 'Marocaine',
        //     'grade' => 'Analyst',
        //     'type_personnel' => 'permanent',
        //     'departement' => 'Finance Department',
        //     'diplome' => 'Finance',
        //     'specialite' => 'Financial Analysis',
        //     'etabl_diplome' => 'University of Rabat',
        //     'situation_administrative' => 'active',
        //     'fonction_exercee' => 'Financial Analyst',
        //     'service_affectation' => 'Analysis',
        //     'type_mouvement' => 'assignment',
        //     'organisme_accueil' => 'Finance Corp',
        //     'date_mouvement' => '2022-03-01',
        //     'date_expiration_mouvement' => '2023-03-01',
        //     'date_naissance' => '1990-07-10',
        //     'date_debut_fonction' => '2021-03-01',
        //     'date_recrutement' => '2020-03-01',
        //     'echelle' => 6,
        //     'echelon' => 3,
        //     'indice' => 180,
        //     'email' => 'ahmed.mohamed@example.com',
        //     'type' => 'enseignant',
        //     'is_archived' => false,
        //     'created_at' => now(),
        //     'updated_at' => now(),
        // ]);
        // $employee->assignRole("employee");

        // $employee2 = User::create([
        //         'ppr' => '54321',
        //         'nom' => 'Smith',
        //         'prenom' => 'Alice',
        //         'nom_ar' => 'سميث',
        //         'prenom_ar' => 'أليس',
        //         'cin' => 'XY987654',
        //         'genre' => 'Female',
        //         'lieu_naissance' => 'City Y',
        //         'adresse' => '456 Elm St',
        //         'telephone' => '+1 555-987-6543',
        //         'situation_familiale' => 'Married',
        //         'nationalite' => 'UK',
        //         'grade' => 'Analyst',
        //         'type_personnel' => 'Contract',
        //         'departement' => 'Finance',
        //         'diplome' => 'Master of Business Administration',
        //         'specialite' => 'Finance and Accounting',
        //         'etabl_diplome' => 'University Z',
        //         'situation_administrative' => 'Active',
        //         'fonction_exercee' => 'Financial Analyst',
        //         'service_affectation' => 'Finance Team',
        //         'type_mouvement' => 'Transfer',
        //         'organisme_accueil' => 'Company A',
        //         'date_mouvement' => '2024-05-26',
        //         'date_expiration_mouvement' => '2025-05-26',
        //         'date_naissance' => '1985-03-10',
        //         'date_debut_fonction' => '2022-02-01',
        //         'date_recrutement' => '2022-02-01',
        //         'echelle' => 4,
        //         'echelon' => 3,
        //         'indice' => 850,
        //         'email' => 'alice.smith@example.com',
        //         'type' => 'enseignant',
        //         'email_verified_at' => now(),
        //         'is_archived' => false,
        //     ]);
        // $employe2->assignRole("employee");

        $employee3 = User::create([
                'ppr' => '98765',
                'nom' => 'Johnson',
                'prenom' => 'Eva',
                'nom_ar' => 'جونسون',
                'prenom_ar' => 'إيفا',
                'cin' => 'CD543210',
                'genre' => 'Male',
                'lieu_naissance' => 'City Z',
                'adresse' => '789 Oak St',
                'telephone' => '+1 555-789-0123',
                'situation_familiale' => 'Married',
                'nationalite' => 'CA',
                'grade' => 'Manager',
                'type_personnel' => 'Permanent',
                'departement' => 'HR',
                'diplome' => 'Master of Human Resources',
                'specialite' => 'Organizational Development',
                'etabl_diplome' => 'University W',
                'situation_administrative' => 'Active',
                'fonction_exercee' => 'HR Manager',
                'service_affectation' => 'Human Resources Team',
                'type_mouvement' => 'Promotion',
                'organisme_accueil' => 'Company B',
                'date_mouvement' => '2024-05-26',
                'date_expiration_mouvement' => '2025-05-26',
                'date_naissance' => '1980-08-20',
                'date_debut_fonction' => '2020-03-15',
                'date_recrutement' => '2020-03-15',
                'echelle' => 6,
                'echelon' => 4,
                'indice' => 950,
                'email' => 'eva.johnson@example.com',
                'type' => 'fonctionnaire',
                'email_verified_at' => now(),
                'is_archived' => false,
            ]);
        $employee3->assignRole("employee");


    }
}
