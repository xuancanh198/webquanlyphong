<?php 
namespace App\Repositories\System\Setting;
interface SettingInterface{
    public function getList($request);
    public function create($request);
    public function update($request, $id);
    public function delete($id);
}