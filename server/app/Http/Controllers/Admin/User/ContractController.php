<?php

namespace App\Http\Controllers\Admin\User;

use App\Http\Controllers\Controller;
use App\Service\Function\Execute\User\Contract\ContractServiceInterface;
use App\Http\Resources\ContractResource;
use App\Http\Requests\ContractRequest;
use App\Models\Room\RoomFurnitureModel;
use App\Models\Room\RoomServiceModel;
class ContractController extends Controller
{
    protected $service;
    protected $request;
    public function __construct(ContractServiceInterface $service, ContractRequest $request)
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

    public function getService($roomId)
    {
        $result = $this->service->getDataInRoom($roomId, RoomServiceModel::class,'service');
        return $this->returnResponseData('success', $result);
    }
    public function getFurniture($roomId)
    {
        $result = $this->service->getDataInRoom($roomId, RoomFurnitureModel::class,'furniture');
        return $this->returnResponseData('success', $result);
    }
}
