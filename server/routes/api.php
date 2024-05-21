<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::group(['middleware' => ['guest']], function() {
  });
  Route::middleware('auth:sanctum')->group(function () {
    Route::get('/test', function(){return "hello admin";})->middleware("permission:test");
    Route::get('/test2', function(){return "hello achraf zaml";})->middleware("permission:test2");
  });
    Route::apiResource('users', UserController::class);
  
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/verifiy-email', [AuthController::class, 'verifyEmail']);
