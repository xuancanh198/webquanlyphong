<?php 
namespace App\Repositories\Room\Furniture;
interface FurnitureInterface{

    public function getList($request);

    public function create($request);

    public function update($request, $id);

    public function delete($id);
}