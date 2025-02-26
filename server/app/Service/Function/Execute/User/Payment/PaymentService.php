<?php

namespace App\Service\Function\Execute\User\Payment;

use App\Http\Requests\PaymentRequest;
use Carbon\Carbon;

use App\Enums\BillTypeFormPayment;
use App\Repositories\User\Bill\BillInterface;
use App\Repositories\User\Transaction\TransactionRepositories;
class PaymentService implements PaymentServiceInterface
{
    protected $request;

    protected $billRepository;
    protected $transactionRepositories;
    public function __construct(PaymentRequest $request, BillInterface $billRepository, TransactionRepositories $transactionRepositories)
    {
        $this->request = $request;
        $this->billRepository = $billRepository;
        $this->transactionRepositories = $transactionRepositories;
    }

    public function payViaBankAccount () {
        $createTransaction = $this->transactionRepositories->create($this->request);
        $updateBill =   $this->billRepository->updateStatus($this->request->id, $this->request);
        return $createTransaction  &&  $updateBill ? trans('message.updateSuccess') : trans('message.loginSuccess');
    }

    public function payVNPay()
    {
        session(['cost_id' => $this->request->id]);
        session(['url_prev' => url()->previous()]);

        $vnp_TmnCode = env('VNPAYTerminalID');
        $vnp_HashSecret = env('VNPAYSecretKey');
        $vnp_Url = env('VNPAY_vnp_Url');
        $vnp_Returnurl = env('VNPAY_Return_link');

        $vnp_TxnRef = rand(1, 10000); // Mã giao dịch
        $vnp_IpAddr =  $_SERVER['REMOTE_ADDR']; // IP của khách hàng


        $vnp_TxnRef = rand(1, 10000); //Mã giao dịch thanh toán tham chiếu của merchant
        $vnp_IpAddr = $_SERVER['REMOTE_ADDR']; //IP Khách hàng thanh toán
        $startTime = date("YmdHis");
        $expire = date('YmdHis', strtotime('+15 minutes', strtotime($startTime)));
        $inputData = array(
            "vnp_Version" => "2.1.0",
            "vnp_TmnCode" => "PLQNPF36",
            "vnp_Amount" =>  10000,
            "vnp_Command" => "pay",
            "vnp_CreateDate" => date('YmdHis'),
            "vnp_CurrCode" => "VND",
            "vnp_IpAddr" => $vnp_IpAddr,
            "vnp_Locale" =>'vn',
            "vnp_OrderInfo" => "Thanh toan GD:" . $vnp_TxnRef,
            "vnp_OrderType" => "other",
            "vnp_ReturnUrl" => "http://localhost/vnpay_php/vnpay_return.php",
            "vnp_TxnRef" => rand(1, 10000),
            "vnp_ExpireDate" => "20250225031413" 
        );
        if (isset($vnp_BankCode) && $vnp_BankCode != "") {
            $inputData['vnp_BankCode'] = $vnp_BankCode;
        }

        ksort($inputData);
        $query = "";
        $i = 0;
        $hashdata = "";
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashdata .= urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
            $query .= urlencode($key) . "=" . urlencode($value) . '&';
        }

        $vnp_Url = $vnp_Url . "?" . $query;
        if (isset($vnp_HashSecret)) {
            $vnpSecureHash =   hash_hmac('sha512', $hashdata, $vnp_HashSecret); //  
            $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
        }
        die($vnp_Url);
    }

}
