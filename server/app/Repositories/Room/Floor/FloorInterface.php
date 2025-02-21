<?php 
namespace App\Repositories\Room\Floor;
interface FloorInterface{
    public function getList($request);
    public function create($request);
    public function update($request, $id);
    public function delete($id);
}