<?php 
namespace App\Repositories\Room\Building;
interface BuildingInterface{
    public function getList($data);
    public function create($data);
    public function update($data, $id);
    public function delete($id);
}