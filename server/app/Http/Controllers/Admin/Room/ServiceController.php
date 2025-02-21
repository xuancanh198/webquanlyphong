<?php

namespace App\Http\Controllers\Admin\Room;

use App\Http\Controllers\Controller;
use App\Service\Function\Execute\Room\Service\ServiceServiceInterface;
use App\Http\Resources\ServiceResource;
use App\Http\Requests\ServiceRequest;

class ServiceController extends Controller
{
    protected $service;
    protected $request;
    public function __construct(ServiceServiceInterface $service, ServiceRequest $request)
    {
        $this->service = $service;
        $this->request = $request;
    }
    public function index()
    {
        $result = $this->service->getList();
        return $this->returnResponseBase(ServiceResource::class, $this->request, $result);
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
