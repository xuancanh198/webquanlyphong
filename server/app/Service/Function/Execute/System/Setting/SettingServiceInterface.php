<?php

namespace App\Service\Function\Execute\System\Setting;

interface SettingServiceInterface
{
    public function getList();
    public function createAction();
    public function updateAction($id);
    public function deleteAction($id);
}