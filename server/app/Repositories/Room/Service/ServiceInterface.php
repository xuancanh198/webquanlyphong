<?php 
namespace App\Repositories\Room\Service;
interface ServiceInterface{

    public function getList($request);

    public function create($request);

    public function update($request, $id);

    public function delete($id);
}