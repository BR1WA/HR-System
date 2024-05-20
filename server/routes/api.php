<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CertificateController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::group(['middleware' => ['guest']], function() {
  });
  
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/verifiy-email', [AuthController::class, 'verifyEmail']);


    Route::apiResource('users', UserController::class);
    Route::get('/user/{id}/certificate', [CertificateController::class, 'printCertificate']);