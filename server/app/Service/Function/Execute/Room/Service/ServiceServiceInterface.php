<?php

namespace App\Service\Function\Execute\Room\Service;

interface ServiceServiceInterface
{
    public function getList();
    public function createAction();
    public function updateAction($id);
    public function deleteAction($id);
}