<?php


use Illuminate\Http\Request;
use App\Events\NotificationEvent;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Broadcast;
use App\Http\Controllers\ArchiveController;
use App\Http\Controllers\CertificateController;
use App\Http\Controllers\DemandeController;

Route::get('/user', function (Request $request) {
     $user=$request->user();
     $user->role=$user->getRoleNames()[0];
     unset($user->roles);
     return $user;
})->middleware('auth:sanctum');

  Route::middleware('auth:sanctum')->group(function () {
  Route::get('/test', function(){return "hello admin";})->middleware("permission:test");
  Route::get('/test2', function(){return "hello employee";})->middleware("permission:test2");
  Route::apiResource('/users', UserController::class);
  Route::post('/avatar/{id}', [UserController::class, 'setAvatar']);
  Route::delete('/avatar/{id}', [UserController::class, 'deleteAvatar']);
  Route::post('/archive/{user}', [ArchiveController::class, 'archiveUser']);
  Route::get('/archives', [ArchiveController::class, 'getArchives']);

});
  
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/verifiy-email', [AuthController::class, 'verifyEmail']);
    Route::get('/generate-pdf/{id}', [CertificateController::class, 'generatePDF']);

    Route::get('/user/{id}/certificate', [CertificateController::class, 'printCertificate']);
    Route::get('/user/{id}/travail', [CertificateController::class, 'showAttestationTarifaire']);



    
    // demande 
    Route::post('/demandes', [DemandeController::class, 'store']);