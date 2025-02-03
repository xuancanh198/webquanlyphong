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
        $res = null;
        $typeLogin = $request->typeLogin;
        if ($typeLogin === Login::LOGINUSERBYEMAIL) {
            $res =  app(AuthUserFuntion::class)->loginByEmail($request);
        } elseif ($typeLogin === Login::LOGINUSERBYPASSWORD) {
            $res =  app(AuthUserFuntion::class)->loginByUsername($request);
        } else {
            $res =  app(AuthUserFuntion::class)->loginByUsername($request);
        }
        return response()->json($res);
    }
    public function authenticOTP(Request $request) {
        $res = null;
        $typeLogin = $request->typeLogin;
        if ($typeLogin === Login::LOGINUSERBYEMAIL) {
            $res =  app(AuthUserFuntion::class)->authentionOTPEmail($request);
        }
            return response()->json([
            'status' => $res['status'],
            'token' => $res['token'], 
            'message' => $res['message'],
        ], $res['code']);
    }
     public function myAuth(){
       dd('21321312');
     }
}
