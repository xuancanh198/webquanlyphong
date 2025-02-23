<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Service\Function\UserAction\AuthUserFuntion;
use App\Http\Resources\BillResource;
use App\Http\Requests\BillAuthRequest;
use App\Service\Function\Execute\User\Bill\BillServiceInterface;

class BillAuthController extends Controller
{
    protected $request;
    public function __construct(BillAuthRequest $request)
    {
        $this->request = $request;
    }
    public function index()  {
        $result = app(BillServiceInterface::class)->getMyListUser();
        return $this->returnResponseBase(BillResource::class, $this->request, $result);
    }
    public function pay(){
        
    }
}
