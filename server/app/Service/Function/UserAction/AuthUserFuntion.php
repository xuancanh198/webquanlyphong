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

    public function loginByUsername( $request)
    {
        $credentials = $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        // Tìm user bằng username
        $user = \App\Models\User\UserModel::where('username', $credentials['username'])->first();

        // Xác thực thủ công
        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json([
                'status' => 'fail',
                'message' => 'Invalid credentials'
            ], 401);
        }

        // Tạo token với Laravel Passport
        $tokenResult = $user->createToken('Token user', ['user']);
        $accessToken = $tokenResult->accessToken;
        $token = $tokenResult->token;
        $token->expires_at = now()->addDays(7);
        $token->save();

        return response()->json([
            'status' => 'success',
            'token' => $accessToken,
            'expires_at' => $token->expires_at,
            'type' => 'user'
        ]);
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

       $sendOTP = SendOTPLoginByEmail::dispatch($request->email, $otp);
        return [
            'code' => 200, 
            'status' => 'success',
            'message' => trans('message.sendEmailSuccess')
        ];
    }
    public function authentionOTPEmail($request){
        $userId = UserModel::select('id')->where('email', $request->email)->first()->id;
       $otpData =  OTPModel::where('userId', $userId)
        ->where('otp', $request->otp)
        ->where('email', $request->email)
        ->first();
        if(!$otpData && $otpData?->expired_at <= Carbon::now()){
            return [
                'code' =>  400 ,
                'status' => 'fail',
                'message' => trans('message.sendEmailSuccess')   
            ];
        }
        $otpData->status = 1;
        $$otpData->save();
        $user = UserModel::find($userId);

        $tokenResult = $user->createToken('Token user', ['user']);
        $accessToken = $tokenResult->accessToken;
        $token = $tokenResult->token;
        $token->expires_at = now()->addDays(7);
        $token->save();

        return[
            'code' =>  400,
            'status' => 'success',
            'token' => $accessToken,
            'message' => trans('message.loginSuccess'), 
        ];
    }
}
