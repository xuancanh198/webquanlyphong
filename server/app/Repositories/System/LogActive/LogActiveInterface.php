<?php 
namespace App\Repositories\System\LogActive;
interface LogActiveInterface{
    public function getList($request);
    public function delete($id);
}