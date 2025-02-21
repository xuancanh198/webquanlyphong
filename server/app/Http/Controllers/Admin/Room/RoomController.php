<?php

namespace App\Http\Controllers\Admin\Room;

use App\Http\Controllers\Controller;
use App\Service\Function\Execute\Room\Room\RoomServiceInterface;
use App\Http\Resources\RoomResource;
use App\Http\Requests\RoomRequest;

class RoomController extends Controller
{
    protected $service;
    protected $request;
    public function __construct(RoomServiceInterface $service, RoomRequest $request)
    {
        $this->service = $service;
        $this->request = $request;
    }
    public function index()
    {
        $result = $this->service->getList();
        return $this->returnResponseBase(RoomResource::class, $this->request, $result);
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
