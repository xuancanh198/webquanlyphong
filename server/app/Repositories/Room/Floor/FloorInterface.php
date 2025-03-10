<?php 
namespace App\Repositories\Room\Floor;
interface FloorInterface{
    public function getList($data);
    public function create($data);
    public function update($data, $id);
    public function delete($id);
}