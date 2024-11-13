<?php

namespace App\Http\Controllers\Admin\Room;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Service\Function\Execute\FurnitureService;
use App\Http\Resources\FurnitureResource;
use App\Http\Requests\FurnitureRequest;
class FurnitureController extends Controller
{
    protected $service;
    protected $request;
    public function __construct(FurnitureService $service, FurnitureRequest $request)
    {
        $this->service = $service;
        $this->request = $request;
    }
    public function index()
    {
        $result = $this->service->getList();
        return $this->returnResponseBase(FurnitureResource::class, $this->request, $result);
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
