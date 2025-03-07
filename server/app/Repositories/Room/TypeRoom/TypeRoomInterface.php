<?php 
namespace App\Repositories\Room\TypeRoom;
interface TypeRoomInterface{
    public function getList($data);
    public function create($data);
    public function update($data, $id);
    public function delete($id);
}