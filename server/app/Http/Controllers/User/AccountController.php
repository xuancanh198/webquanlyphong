<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Service\Function\UserAction\AuthUserFuntion;
use App\Http\Requests\LoginUserRequest;
use App\Enums\Login;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\UserGetDataResource;
use App\Http\Requests\AuthUserRequest;
use Carbon\Carbon;
use App\Service\Function\Action\Firebase;
use App\Service\Function\Action\ConvertData;

class AccountController extends Controller
{
    // protected $request;
    // public function __construct(AuthUserRequest $request)
    // {
    //     $this->request = $request;
    // }
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
    public function authenticOTP(Request $request)
    {
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
    public function getMyUser()
    {
        $user = Auth::user();
        return $this->returnResponseResult(new UserGetDataResource($user));
    }
    public function updateInfoUser(Request $request)
    { 
            $data = Auth::user();
            $data->identificationCard = $request->identificationCard;
            $data->fullname = $request->fullname;
            $data->username = $request->username;
            $data->phoneNumber = $request->phoneNumber;
            $data->email = $request->email;
            $data->address = $request->address;
            $data->dateOfBirth = app(ConvertData::class)->convertDateTimeFormat($request->dateOfBirth);
            $data->dateIssuanceCard = app(ConvertData::class)->convertDateTimeFormat($request->dateIssuanceCard);
            $data->placeIssue = $request->placeIssue;
            if ($request->hasFile('image')) {
                $data->imgLink = app(Firebase::class)->uploadImage($request->file('image'));
            }
            $data->updated_at = Carbon::now();
            $data->save();
            return $this->returnResponseStatus('update thành công');
        
    }
}
