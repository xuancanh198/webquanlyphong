<?php

namespace App\Service\Function\UserAction;

use Illuminate\Support\Facades\Auth;
use App\Models\System\OTPModel;
use App\Enums\TypeOfValue;
use Carbon\Carbon;
use App\Models\User\UserModel;
use App\Jobs\SendOTPLoginByEmail;
use Illuminate\Support\Facades\Hash;

class AuthUserFuntion
{
    public function loginByUsername($request)
    {

        $credentials = $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $tokenResult = $user->createToken('Token user', ['user']);
            $accessToken = $tokenResult->accessToken;
            $token = $tokenResult->token;
            $token->expires_at = now()->addDays(7);
            $token->save();
            return[
                'status' => 'success',
                'token' => $accessToken,
                'type' => 'user'
            ];
        }
        return ['message' => 'Invalid credentials'];
    }
    public function loginByEmail($request){
        $otp = rand(10000, 99999);
        $userId = UserModel::select('id')->where('email', $request->email)->first()->id;

        $otpModel = new OTPModel;
        $otpModel->userId = $userId;
        $otpModel->email = $request->email;
        $otpModel->otp = $otp;
        $otpModel->status = 0;
        $otpModel->typeAuth = TypeOfValue::TypeAuthUser;
        $otpModel->expired_at = Carbon::now()->addMinutes(2);
        $saveOTP =  $otpModel->save();
        $user = UserModel::find($otpModel->userId);
        $tokenResult = $user->createToken('Token user', ['user']);
        $accessToken = $tokenResult->accessToken;
        $token = $tokenResult->token;
        
        $token->expires_at = now()->addDays(7);
        $token->save();
      SendOTPLoginByEmail::dispatch($request->email, $otp);
        return [
            'code' => 200, 
            'status' => 'success',
            'token' => $accessToken,
            'message' => trans('message.sendEmailSuccess')
        ];
    }
    public function authentionOTPEmail($request){
       $otpData =  OTPModel::where('userId', Auth::user()->id)
        ->where('otp', $request->otp)
    //   ->where('email', $request->email)
        ->first();
        if(!$otpData && $otpData?->expired_at <= Carbon::now()){
            return [
                'code' =>  400 ,
                'status' => 'fail',
                'message' => trans('message.sendEmailSuccess')   
            ];
        }
        $otpData->status = 1;
        $otpData->save();
        $user = UserModel::find(Auth::user()->id);
        $tokenResult = $user->createToken('Token user', ['user']);
        $accessToken = $tokenResult->accessToken;
        $token = $tokenResult->token;
        $token->expires_at = now()->addDays(7);
        $token->save();
        return[
            'code' =>  200,
            'status' => 'success',
            'token' => $accessToken,
            'message' => trans('message.loginSuccess'), 
        ];
    }
}
