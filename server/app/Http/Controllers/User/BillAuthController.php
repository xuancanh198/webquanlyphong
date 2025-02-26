<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Service\Function\UserAction\AuthUserFuntion;
use App\Http\Resources\BillResource;
use App\Http\Requests\BillAuthRequest;
use App\Service\Function\Execute\User\Payment\PaymentServiceInterface;
use App\Service\Function\Execute\User\Bill\BillServiceInterface;
class BillAuthController extends Controller
{
    protected $request;
    protected $paymentService;
    public function __construct(BillAuthRequest $request , PaymentServiceInterface $paymentService)
    {
        $this->request = $request;
        $this->paymentService = $paymentService;
    }
    public function index()  {
  
        $result = app(BillServiceInterface::class)->getMyListUser();
        return $this->returnResponseBase(BillResource::class, $this->request, $result);
    }
    public function pay(){
        $data = $this->paymentService->payViaBankAccount();
        return $this->returnResponseResult($data);
    }
}
