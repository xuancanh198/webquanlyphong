<?php

namespace App\Service\Function\Execute\Room\Floor;

interface FloorServiceInterface
{
    public function getList();
    public function createAction();
    public function updateAction($id);
    public function deleteAction($id);
}