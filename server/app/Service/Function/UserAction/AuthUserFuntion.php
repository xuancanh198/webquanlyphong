<?php

namespace App\Service\Function\UserAction;

use Illuminate\Support\Facades\Auth;
use App\Models\System\OTPModel;
use App\Enums\TypeOfValue;
use Carbon\Carbon;
use App\Models\User\UserModel;
use App\Models\User\BilModel;
use App\Jobs\SendOTPLoginByEmail;
use Illuminate\Support\Facades\Hash;
use App\Service\Function\Base\BaseService;
class AuthUserFuntion
{
    protected $columSearch = ['code'];
    protected $columSelect = ['id', 'code', 'price'];

    protected $columCode = 'code';
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
    public function getMyBillAuth()
    {
        $page = $this->request->page ?? 1;
        $limit = $this->request->limit ?? 10;
        $excel = $this->request->excel ?? null;
        $search = $this->request->search ?? null;
        $typeTime = $this->request->typeTime ?? null;
        $start = $this->request->start ?? null;
        $end = $this->request->end ?? null;
        $isSelect = $this->request->isSelect ?? false;
        $filtersBase64 = $this->request->filtersBase64 ?? null;
        $filterBaseDecode = $this->request->filterBaseDecode ?? null;
        $query = BilModel::where('userId', Auth::id())->with([
            'detail.service' => function ($query) {
                $query->select('id', 'name', 'price', 'unit');
            },
            'user' => function ($query) {
                $query->select('id', 'fullname');
            },
            'staff' => function ($query) {
                $query->select('id', 'fullname');
            },
            'room' => function ($query) {
                $query->select('id', 'name', 'buildingId', 'floorId');
            },
            'room.type_room' => function ($query) {
                $query->select('id', 'name', 'code');
            },
            'room.floor' => function ($query) {
                $query->select('id', 'name', 'code');
            },
            'room.building' => function ($query) {
                $query->select('id', 'name', 'code', 'address');
            },
        ]);
        $result = app(BaseService::class)->getListBaseFun($query, $page, $limit, $search, $this->columSearch, $excel, $typeTime, $start, $end, $filtersBase64, $isSelect, $this->columSelect, $filterBaseDecode);
        return $result;
    
    }
}
