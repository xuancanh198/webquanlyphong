<?php

namespace App\Service\Function\Execute\User\Transaction;

use App\Http\Requests\TransactionRequest;
use App\Repositories\User\Transaction\TransactionInterface;
use App\Repositories\User\Bill\BillInterface;
use App\Enums\BillTypeFormPayment;
use App\Enums\Bill;
use Illuminate\Support\Facades\DB;

class TransactionService implements TransactionServiceInterface
{
    protected $request;

    protected $repository;
    protected $billRepository;
    public function __construct(TransactionRequest $request, TransactionInterface $repository, BillInterface $billRepository)
    {
        $this->request = $request;
        $this->repository = $repository;
        $this->billRepository = $billRepository;
    }
    public function getList()
    {
        return $this->repository->getList($this->request);
    }
    public function createAction()
    {
        return $this->repository->create($this->request);
    }

    public function updateAction($id)
    {
        $data = [
            'status' => $this->request->status
        ];

        DB::beginTransaction();

        try {
            $update = $this->repository->update($data, $id);

            if (!$update) {
                DB::rollBack();
                return false;
            }
            $dataBill = [
                'status' => Bill::BILLSTATUSPAYED,
                'formPayment' => BillTypeFormPayment::BANKPAYMENTVALUE,
                'image' => $update->image ?? null,

            ];
            $updateBill = $this->billRepository->updateStatus($update->billId, $dataBill);

            if (!$updateBill) {
                DB::rollBack();
                return false;
            }

            DB::commit();
            return true;
        } catch (\Exception $e) {
               DB::rollBack();
            return false;
        }
    }

    public function deleteAction($id)
    {
        return $this->repository->delete($id);
    }
}
