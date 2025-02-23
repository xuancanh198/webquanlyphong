<?php

namespace App\Service\Function\Execute\Staff\Staff;

interface StaffServiceInterface
{
    public function getList();
    public function createAction();
    public function updateAction($id);
    public function deleteAction($id);
}