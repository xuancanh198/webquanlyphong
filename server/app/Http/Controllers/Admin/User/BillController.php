<?php

namespace App\Http\Controllers\Admin\User;

use App\Http\Controllers\Controller;
use App\Service\Function\Execute\BillService;
use App\Http\Resources\ContractResource;
use App\Http\Requests\BillRequest;
use App\Models\User\Contract\ServiceContractModel;
class BillController extends Controller
{
    protected $service;
    protected $request;
    public function __construct(BillService $service, BillRequest $request)
    {
        $this->service = $service;
        $this->request = $request;
    }
    public function index()
    {
        $result = $this->service->getList();
        return $this->returnResponseBase(ContractResource::class, $this->request, $result);
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
    public function getServiceRoomContract($roomId)
    {
        $result = $this->service->getDataInRoomContract($roomId, ServiceContractModel::class,'service');
        return $this->returnResponseData('success', $result);
    }
}
