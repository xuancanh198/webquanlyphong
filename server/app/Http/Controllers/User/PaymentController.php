<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Service\Function\Execute\User\Payment\PaymentServiceInterface;
class PaymentController extends Controller
{
  protected $paymentService ;
  public function __construct(PaymentServiceInterface $paymentService) {
    $this->paymentService = $paymentService;
  }
  public function payBill() {
    $data = $this->paymentService->payVNPay();
    return $this->returnResponseResult($data);
  }
}
