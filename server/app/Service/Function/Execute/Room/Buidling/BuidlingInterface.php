<?php

namespace App\Service\Function\Execute\Room\Buidling;

interface BuidlingInterface
{
    public function getList();
    public function createAction();
    public function updateAction($id);
    public function deleteAction($id);
}