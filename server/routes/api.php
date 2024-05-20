<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::group(['middleware' => ['guest']], function() {
  });
  Route::middleware('auth:sanctum')->group(function () {
    Route::get('/test', function(){return "hello admin";})->middleware("permission:test");
    Route::get('/test2', function(){return "hello achraf zaml";})->middleware("permission:test2");
  });
  
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/verifiy-email', [AuthController::class, 'verifyEmail']);
