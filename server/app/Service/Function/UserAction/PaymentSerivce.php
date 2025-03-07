<?php

namespace App\Service\Function\UserAction;


use Carbon\Carbon;
use App\Http\Requests\PaymentRequest;
class PaymentSerivce
{
    public function store(PaymentRequest $request)
    {
        $vnp_Url = env('VNPAY_vnp_Url');
        $vnp_Returnurl =  env('VNAPY_Return_link');
        $vnp_TmnCode = env('VNPAYTerminalID'); 
        $vnp_HashSecret = env('VNPAYSecretKey'); 

        $vnp_TxnRef = time(); 
        $vnp_OrderInfo = 'Thanh toán đơn hàng test';
        $vnp_OrderType = 'other';
        $vnp_Amount = $request->input('amount') * 100; 
        $vnp_Locale = 'vn'; 

        $vnp_IpAddr = $request->ip(); 
        $inputData = [
            "vnp_Version" => "2.1.0",
            "vnp_TmnCode" => $vnp_TmnCode,
            "vnp_Amount" => $vnp_Amount,
            "vnp_Command" => "pay",
            "vnp_CreateDate" => Carbon::now('Asia/Ho_Chi_Minh')->format('YmdHis'),
            "vnp_CurrCode" => "VND",
            "vnp_IpAddr" => $vnp_IpAddr,
            "vnp_Locale" => $vnp_Locale,
            "vnp_OrderInfo" => $vnp_OrderInfo,
            "vnp_OrderType" => $vnp_OrderType,
            "vnp_ReturnUrl" => $vnp_Returnurl,
            "vnp_TxnRef" => $vnp_TxnRef,
        ];

        if (!empty($vnp_BankCode)) {
            $inputData['vnp_BankCode'] = $vnp_BankCode;
        } else {
            unset($inputData['vnp_BankCode']);
        }

        ksort($inputData);

        $queryString = "";
        $hashdata = "";
        $i = 0;
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashdata .= urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
            $queryString .= urlencode($key) . "=" . urlencode($value) . '&';
        }

        $queryString = rtrim($queryString, '&');
        $vnpSecureHash = hash_hmac('sha512', $hashdata, $vnp_HashSecret);
        $vnp_Url .= "?" . $queryString . "&vnp_SecureHash=" . $vnpSecureHash;

         return $vnp_Url;
    }
}
