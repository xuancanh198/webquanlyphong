<?php

namespace App\Repositories\Staff\Staff;

interface StaffInterface{

    public function getList($request);
    public function create($request);
    public function update($request, $id);
    public function delete($id);
}