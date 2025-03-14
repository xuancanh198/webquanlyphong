<?php

namespace App\Http\Controllers\Admin\User;

use App\Http\Controllers\Controller;
use App\Service\Function\Execute\User\Transaction\TransactionServiceInterface;
use App\Http\Resources\TransactionResource;
use App\Http\Requests\TransactionRequest;
class TransactionController extends Controller
{
    protected $service;
    protected $request;
    public function __construct(TransactionServiceInterface $service, TransactionRequest $request)
    {
        $this->service = $service;
        $this->request = $request;
    }
    public function index()
    {
        $result = $this->service->getList();
        return $this->returnResponseBase(TransactionResource::class, $this->request, $result);
    }

    public function store()
    {
        $result = $this->service->createAction();
        return $this->returnResponseMessgae($result ? "success" : "fail", 'createAction');
    }
    public function update($id)
    {
        $result = $this->service->updateAction($id);
        return $this->returnResponseMessgae($result ? "success" : "fail", 'updateAction');
    }
    public function destroy($id)
    {
        $result = $this->service->deleteAction($id);
        return $this->returnResponseMessgae($result ? "success" : "fail", 'deleteAction');
    }

}
