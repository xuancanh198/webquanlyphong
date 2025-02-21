<?php

namespace App\Service\Function\Execute\Room\Room;

interface RoomServiceInterface
{
    public function getList();
    public function createAction();
    public function updateAction($id);
    public function deleteAction($id);
}