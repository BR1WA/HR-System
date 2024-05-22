<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\VerifyEmailRequest;
use App\Models\User;
use App\Notifications\OtpNotification;
use Illuminate\Http\Request;
use Ichtrojan\Otp\Otp;
use Laravel\Sanctum\HasApiTokens;

class AuthController extends Controller
{
    private $otp;

    public function __construct()
    {
        $this->otp = new Otp;
    }

    function login(LoginRequest $request){
        $email = $request->validated();
        $user= User::where('email',$email)->first();
        $user->notify(new OtpNotification());
        return response()->json([
                "success" => true,
                "message" =>("otp message sent successfully"),
                "data" => [
                    "user"=>$user,
                ],
        ], 200);
    }

    
    function verifyEmail(VerifyEmailRequest $request){
        $otpObj= $this->otp->validate($request->email, $request->otp);
        if(!$otpObj->status){
            return response()->json([
                "success" => false,
                "message" => "invalide credentials",
                "data" => null,
            ], 200);
        }
        $user = User::where('email', $request->email)->first();
        $user->email_verified_at= now();
        $user->save();
        $token = $user->createToken('auth_token')->plainTextToken;
        $user->role=$user->getRoleNames()[0];
        return response()->json([
            "success" => true,
            "message" =>"Email vérifié avec succès",
            "data" => [
                "user" => $user,
                "token" => $token
            ],
        ], 200);
    }
}
