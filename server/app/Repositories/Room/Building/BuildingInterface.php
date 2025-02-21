<?php 
namespace App\Repositories\Room\Building;
interface BuildingInterface{
    public function getList($request);
    public function create($request);
    public function update($request, $id);
    public function delete($id);
}