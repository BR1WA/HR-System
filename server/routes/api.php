<?php

use Illuminate\Http\Request;
use App\Events\NotificationEvent;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Broadcast;

Route::get('/user', function (Request $request) {
     $user=$request->user();
     $user->role=$user->getRoleNames()[0];
     unset($user->roles);
     return $user;
})->middleware('auth:sanctum');
Route::group(['middleware' => ['guest']], function() {
});
  Route::middleware('auth:sanctum')->group(function () {
  Route::get('/test', function(){return "hello admin";})->middleware("permission:test");
  Route::get('/test2', function(){return "hello employee";})->middleware("permission:test2");
  Route::apiResource('/users', UserController::class);
  Route::post('/avatar/{id}', [UserController::class, 'setAvatar']);
  Route::delete('/avatar/{id}', [UserController::class, 'deleteAvatar']);

});
  
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/verifiy-email', [AuthController::class, 'verifyEmail']);
