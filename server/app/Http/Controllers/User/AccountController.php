<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Service\Function\UserAction\AuthUserFuntion;
use App\Http\Requests\LoginUserRequest;
use App\Enums\Login;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User\UserModel;
class AccountController extends Controller
{

    public function login(Request $request)
    {

         $credentials = $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);
        
        
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            dd($user);
            $tokenResult = $user->createToken('Token user', ['user']);
            $accessToken = $tokenResult->accessToken;
            $token = $tokenResult->token;
            $token->expires_at = now()->addDays(7);
            $token->save();
            return response()->json([
                'status' => 'success',
                'token' => $accessToken,
                'type' => 'user'
            ], 200);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }
    // public function login(LoginUserRequest $request)
    // {
    //     $res = null;
    //     $typeLogin = $request->typeLogin;
    //     if($typeLogin === Login::LOGINUSERBYEMAIL) {
    //       $res =  app(AuthUserFuntion::class)->loginByEmail($request);
    //     }
    //     if($typeLogin === Login::LOGINUSERBYPASSWORD){
    //         $res =  app(AuthUserFuntion::class)->loginByUsername($request);
    //     }
    //     return response()->json($res);
    // }
    public function authenticOTP(Request $request) {
        $res = null;
        $typeLogin = $request->typeLogin;
        if ($typeLogin === Login::LOGINUSERBYEMAIL) {
            $res =  app(AuthUserFuntion::class)->authentionOTPEmail($request);
        }
            return response()->json([
            'status' => $res['status'], 
            'message' => $res['message'],
        ], $res['code']);
    }
}
