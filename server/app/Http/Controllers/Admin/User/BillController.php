<?php

namespace App\Http\Controllers\Admin\User;

use App\Http\Controllers\Controller;
use App\Service\Function\Execute\User\Bill\BillServiceInterface;
use App\Http\Resources\BillResource;
use App\Http\Requests\BillRequest;
use App\Models\User\Contract\ServiceContractModel;
class BillController extends Controller
{
    protected $service;
    protected $request;
    protected $columSearch = ['code'];
    protected $columCode = 'code';
    public function __construct(BillServiceInterface $service, BillRequest $request)
    {
        $this->service = $service;
        $this->request = $request;
    }
    public function index()
    {
        $result = $this->service->getList();
        return $this->returnResponseBase(BillResource::class, $this->request, $result);
    }

    public function store() {
        $result = $this->service->createAction();
        return $this->returnResponseMessgae($result ? "success" : "fail",'createAction');
    }
    public function update($id) {
        $result = $this->service->updateAction($id);
        return $this->returnResponseMessgae($result ? "success" : "fail",'updateAction');
    }
    public function destroy($id) {
        $result = $this->service->deleteAction($id);
        return $this->returnResponseMessgae($result ? "success" : "fail",'deleteAction');
    }
}
