<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register()
    {
        $repositories = [
            'App\Repositories\System\Setting\SettingInterface' => 'App\Repositories\System\Setting\SettingRepositories',
            'App\Service\Function\Execute\System\Setting\SettingServiceInterface' => 'App\Service\Function\Execute\System\Setting\SettingService',
            'App\Repositories\Room\TypeRoom\TypeRoomInterface' => 'App\Repositories\Room\TypeRoom\TypeRoomRepositories',
            'App\Service\Function\Execute\Room\TypeRoom\TypeRoomServiceInterface' => 'App\Service\Function\Execute\Room\TypeRoom\TypeRoomService',
            'App\Repositories\Room\Floor\FloorInterface' => 'App\Repositories\Room\Floor\FloorRepositories',
            'App\Service\Function\Execute\Room\Floor\FloorServiceInterface' => 'App\Service\Function\Execute\Room\Floor\FloorService',
            'App\Repositories\Room\Building\BuildingInterface' => 'App\Repositories\Room\Building\BuildingRepositories',
            'App\Service\Function\Execute\Room\Buidling\BuidlingInterface' => 'App\Service\Function\Execute\Room\Buidling\BuidlingService',
            'App\Service\Function\Execute\Room\Service\ServiceServiceInterface' => 'App\Service\Function\Execute\Room\Service\ServiceService',
            'App\Repositories\Room\Service\ServiceInterface' => 'App\Repositories\Room\Service\ServiceRepositories',
            'App\Repositories\Room\Furniture\FurnitureInterface' => 'App\Repositories\Room\Furniture\FurnitureRepositories',
            'App\Service\Function\Execute\Room\Furniture\FurnitureServiceInterface' => 'App\Service\Function\Execute\Room\Furniture\FurnitureService',
            'App\Repositories\Room\Room\RoomInterface' => 'App\Repositories\Room\Room\RoomRepositories',
            'App\Service\Function\Execute\Room\Room\RoomServiceInterface' => 'App\Service\Function\Execute\Room\Room\RoomService',
        ];

        foreach ($repositories as $interface => $repository) {
            $this->app->bind($interface, $repository);
        }
    }

    public function boot()
    {
    }
}
