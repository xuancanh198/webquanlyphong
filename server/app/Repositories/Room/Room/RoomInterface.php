<?php 
namespace App\Repositories\Room\Room;
interface RoomInterface {
    public function getList($request);
    public function create($request);
    public function update($request, $id);
    public function delete($id);
}