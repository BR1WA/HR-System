<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\VerifyEmailRequest;
use App\Models\User;
use App\Notifications\OtpNotification;
use Ichtrojan\Otp\Otp;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    private $otp;

    public function __construct()
    {
        $this->otp = new Otp;
    }

    public function login(LoginRequest $request)
    {
        $email = $request->validated('email');
        $user = User::where('email', $email)->firstOrFail();
        $user->notify(new OtpNotification);

        return response()->json([
            'success' => true,
            'message' => ('otp message sent successfully'),
            'data' => [
                'user' => $user,
            ],
        ], 200);
    }

    public function verifyEmail(VerifyEmailRequest $request)
    {
        $otpObj = $this->otp->validate($request->email, $request->otp);
        if (! $otpObj->status) {
            return response()->json([
                'success' => false,
                'message' => 'Code de vérification invalide',
                'data' => null,
            ], 422);
        }
        $user = User::where('email', $request->email)->first();
        $user->email_verified_at = now();
        $user->save();
        $token = $user->createToken('auth_token')->plainTextToken;
        $user->role = $user->getRoleNames()->first();

        return response()->json([
            'success' => true,
            'message' => 'Email vérifié avec succès',
            'data' => [
                'user' => $user,
                'token' => $token,
            ],
        ], 200);
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'logout avec succès',
            'data' => null,
        ], 200);
    }
}
