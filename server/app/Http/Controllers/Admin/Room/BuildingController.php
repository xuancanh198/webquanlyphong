<?php

namespace App\Http\Controllers\Admin\Room;
use App\Http\Controllers\Controller;
use App\Service\Function\Execute\Room\Buidling\BuidlingInterface;
use App\Http\Resources\BuildingResource;
use App\Http\Requests\BuildingRequest;
class BuildingController extends Controller
{
    protected $service;
    protected $request;
    public function __construct(BuidlingInterface $service, BuildingRequest $request)
    {
        $this->service = $service;
        $this->request = $request;
    }
    public function index()
    {
        $result = $this->service->getList();
        return $this->returnResponseBase(BuildingResource::class, $this->request, $result);
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
