<?php

namespace App\Http\Controllers\Admin\Room;

use App\Http\Controllers\Controller;
use App\Service\Function\Execute\Room\TypeRoom\TypeRoomServiceInterface;
use App\Http\Resources\TypeRoomResource;
use App\Http\Requests\TypeRoomRequest;
class TypeRoomController extends Controller
{
    protected $service;
    protected $request;
    public function __construct(TypeRoomServiceInterface $service, TypeRoomRequest $request)
    {
        $this->service = $service;
        $this->request = $request;
    }
    public function index()
    {
        $result = $this->service->getList();
        return $this->returnResponseBase(TypeRoomResource::class, $this->request, $result);
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
