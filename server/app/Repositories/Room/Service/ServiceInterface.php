<?php 
namespace App\Repositories\Room\Service;
interface ServiceInterface{

    public function getList($data);

    public function create($data);

    public function update($data, $id);

    public function delete($id);
}