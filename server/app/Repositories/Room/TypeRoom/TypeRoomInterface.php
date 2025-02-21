<?php 
namespace App\Repositories\Room\TypeRoom;
interface TypeRoomInterface{
    public function getList($request);
    public function create($request);
    public function update($request, $id);
    public function delete($id);
}