<?php

namespace App\Service\Function\Execute\User\Payment;

use App\Http\Requests\PaymentRequest;
use Carbon\Carbon;

use App\Enums\BillTypeFormPayment;
use App\Repositories\User\Bill\BillInterface;
use App\Repositories\User\Transaction\TransactionInterface;
use App\Helpers\Images;
use App\Enums\Bill;
class PaymentService implements PaymentServiceInterface
{
    protected $request;

    protected $statusTransaction = BILL::STATUSTRANSACTIONWAITING;

    protected $billRepository;
    protected $transactionRepositories;
    public function __construct(PaymentRequest $request, BillInterface $billRepository, TransactionInterface $transactionRepositories)
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

    public function createTransaction(){
        $data = [
            'billId' => $this->request->billId,
            'userId' => $this->request->userId,
            'totalMoney' => $this->request->totalMoney,
            'status' => $this->statusTransaction,
            'image' => app(Images::class)->checkImageIsStringOrUpdate($this->request->file('image'))
        ];
        $createBill = $this->transactionRepositories->create($data);
    }

    public function payVNPay()
    {
        $vnp_Url = env('VNPAY_vnp_Url');
        $vnp_Returnurl =  env('VNAPY_Return_link');
        $vnp_TmnCode = env('VNPAYTerminalID');
        $vnp_HashSecret = env('VNPAYSecretKey');

        $vnp_TxnRef = time();
        $vnp_OrderInfo = 'Thanh toán đơn hàng test';
        $vnp_OrderType = 'other';
        $vnp_Amount =  1000000;
        $vnp_Locale = 'vn';

        $vnp_IpAddr = $this->request->ip();
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
