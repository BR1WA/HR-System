<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTraitementToDemandesTable extends Migration
{
    public function up()
    {
        Schema::table('demandes', function (Blueprint $table) {
            $table->string('traitement')->default('en cour');
        });
    }

    public function down()
    {
        Schema::table('demandes', function (Blueprint $table) {
            $table->dropColumn('traitement');
        });
    }
}
