<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    protected $fillable = [
        'ppr', 'nom', 'prenom', 'nom_ar', 'prenom_ar', 'cin', 'genre',
        'lieu_naissance', 'adresse', 'telephone', 'situation_familiale', 'nationalite',
        'grade', 'type_personnel', 'departement', 'diplome', 'specialite', 'etabl_diplome',
        'situation_administrative', 'fonction_exercee', 'service_affectation',
        'type_mouvement', 'organisme_accueil', 'date_mouvement',
        'date_expiration_mouvement', 'date_naissance', 'date_debut_fonction',
        'date_recrutement', 'echelle', 'echelon', 'indice', 'email', 'type', 'arreter'
    ];

    protected $hidden = [
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    
    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function archives()
    {
        return $this->hasMany(Archive::class);
    }

    public function promotions()
    {
        return $this->hasMany(Promotion::class);
    }

    public function attestations()
    {
        return $this->hasMany(Attestation::class);
    }
}
