<?php

namespace App\Http\Controllers\Admin\System;


use App\Http\Controllers\Controller;
use App\Service\Function\Execute\System\LogActive\LogActiveServiceInterface;
use App\Http\Resources\LogActiveResource;
use App\Http\Requests\LogActiveRequest;
class LogActiveController extends Controller
{
    protected $service;
    protected $request;
    public function __construct(LogActiveServiceInterface $service, LogActiveRequest $request)
    {
        $this->service = $service;
        $this->request = $request;
    }
    public function index()
    {
        
        $result = $this->service->getList();
        return $this->returnResponseBase(LogActiveResource::class, $this->request, $result);
    }

  
    public function destroy($id)
    {
        $result = $this->service->deleteAction($id);
        return $this->returnResponseMessgae($result ? "success" : "fail", 'deleteAction');
    } 
}
