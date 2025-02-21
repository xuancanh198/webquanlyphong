<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Service\Function\UserAction\AuthUserFuntion;
use App\Http\Resources\BillResource;
use App\Http\Requests\BillAuthRequest;

class BillAuthController extends Controller
{
    protected $request;
    public function __construct(BillAuthRequest $request)
    {
        $this->request = $request;
    }
    public function index()  {
        $result = app(AuthUserFuntion::class)->getMyBillAuth();
        return $this->returnResponseBase(BillResource::class, $this->request, $result);
    }
    public function pay(){
        
    }
}
