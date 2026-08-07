<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ArchiveController;
use App\Http\Controllers\CertificateController;
use App\Http\Controllers\DemandeController;

Route::middleware('throttle:6,1')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/verify-email', [AuthController::class, 'verifyEmail']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        $user = $request->user();
        $user->role = $user->getRoleNames()->first();

        return $user;
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/users/{user}', [UserController::class, 'show']);
    Route::post('/avatar/{user}', [UserController::class, 'setAvatar']);
    Route::delete('/avatar/{user}', [UserController::class, 'deleteAvatar']);

    Route::post('/demandes', [DemandeController::class, 'store']);
    Route::get('/demandes/{user}', [DemandeController::class, 'getUserDemandes'])
        ->name('user.demandes');

    Route::middleware('role:admin')->group(function () {
        Route::get('/users', [UserController::class, 'index']);
        Route::post('/users', [UserController::class, 'store']);
        Route::match(['put', 'patch', 'post'], '/users/{user}', [UserController::class, 'update']);
        Route::delete('/users/{user}', [UserController::class, 'destroy']);

        Route::get('/demandes', [DemandeController::class, 'index'])->name('demandes.index');
        Route::put('/demandes/{demande}/status', [DemandeController::class, 'updateStatus']);
        Route::get('/demandes/{demande}/generatePDF', [DemandeController::class, 'generatePDF'])
            ->name('demandes.generatePDF');

        Route::post('/archive/{user}', [ArchiveController::class, 'archiveUser']);
        Route::get('/archives', [ArchiveController::class, 'getArchives']);

        Route::get('/generate-pdf/{user}', [CertificateController::class, 'generatePDF']);
        Route::get('/user/{user}/certificate', [CertificateController::class, 'printCertificate']);
        Route::get('/user/{user}/travail', [CertificateController::class, 'showAttestationTarifaire']);
    });
});
