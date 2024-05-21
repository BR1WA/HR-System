<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id(); // Clé primaire auto-incrémentée
            $table->string('ppr')->nullable();
            $table->string('nom')->nullable();
            $table->string('prenom')->nullable();
            $table->string('nom_ar')->nullable();
            $table->string('prenom_ar')->nullable();
            $table->string('cin')->nullable();
            $table->string('genre')->nullable();
            $table->string('lieu_naissance')->nullable();
            $table->string('adresse')->nullable();
            $table->string('telephone')->nullable();
            $table->string('situation_familiale')->nullable();
            $table->string('nationalite')->nullable();
            $table->string('grade')->nullable();
            $table->string('type_personnel')->nullable();
            $table->string('departement')->nullable();
            $table->string('diplome')->nullable();
            $table->string('specialite')->nullable();
            $table->string('etabl_diplome')->nullable();
            $table->string('situation_administrative')->nullable();
            $table->string('fonction_exercee')->nullable();
            $table->string('service_affectation')->nullable();
            $table->string('type_mouvement')->nullable();
            $table->string('organisme_accueil')->nullable();
            $table->date('date_mouvement')->nullable();
            $table->date('date_expiration_mouvement')->nullable();
            $table->date('date_naissance')->nullable();
            $table->date('date_debut_fonction')->nullable();
            $table->date('date_recrutement')->nullable();
            $table->integer('echelle')->nullable();
            $table->integer('echelon')->nullable();
            $table->integer('indice')->nullable();
            $table->string('email')->unique()->nullable();
            $table->string('type')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->boolean('is_archived')->default(false);
            $table->rememberToken();
            $table->timestamps();
        });


        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('sessions');
    }
};
