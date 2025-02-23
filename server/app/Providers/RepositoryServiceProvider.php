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
            'App\Repositories\System\LogActive\LogActiveInterface' => 'App\Repositories\System\LogActive\LogActiveRepositories',
            'App\Service\Function\Execute\System\LogActive\LogActiveServiceInterface' => 'App\Service\Function\Execute\System\LogActive\LogActiveService',
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
            'App\Repositories\Staff\Role\RoleInterface' => 'App\Repositories\Staff\Role\RoleRepositories',
            'App\Service\Function\Execute\Staff\Role\RoleServiceInterface' => 'App\Service\Function\Execute\Staff\Role\RoleService',
            'App\Repositories\Staff\Staff\StaffInterface' => 'App\Repositories\Staff\Staff\StaffRepositories',
            'App\Service\Function\Execute\Staff\Staff\StaffServiceInterface' => 'App\Service\Function\Execute\Staff\Staff\StaffService',
            'App\Service\Function\Execute\Permisstion\Action\ActionServiceInterface' => 'App\Service\Function\Execute\Permisstion\Action\ActionService',
            'App\Repositories\Permisstion\Action\ActionInterface' => 'App\Repositories\Permisstion\Action\ActionRepositories',
            'App\Service\Function\Execute\Permisstion\Permisstion\PermisstionServiceInterface' => 'App\Service\Function\Execute\Permisstion\Permisstion\PermisstionService',
            'App\Repositories\Permisstion\Permisstion\PermisstionInterface' => 'App\Repositories\Permisstion\Permisstion\PermisstionRepositories',
            'App\Service\Function\Execute\Permisstion\PermisstionDetail\PermisstionDetailServiceInterface' => 'App\Service\Function\Execute\Permisstion\PermisstionDetail\PermisstionDetailService',
            'App\Repositories\Permisstion\PermisstionDetail\PermisstionDetailInterface' => 'App\Repositories\Permisstion\PermisstionDetail\PermisstionDetailRepositories',
            'App\Service\Function\Execute\User\User\UserServiceInterface' => 'App\Service\Function\Execute\User\User\UserService',
            'App\Repositories\User\User\UserInterface' => 'App\Repositories\User\User\UserRepositories',
            'App\Service\Function\Execute\User\Contract\ContractServiceInterface' => 'App\Service\Function\Execute\User\Contract\ContractService',
            'App\Repositories\User\Contract\ContractInterface' => 'App\Repositories\User\Contract\ContractRepositories',
            'App\Service\Function\Execute\User\Bill\BillServiceInterface' => 'App\Service\Function\Execute\User\Bill\BillService',
            'App\Repositories\User\Bill\BillInterface' => 'App\Repositories\User\Bill\BillRepositories',        
        ];


        foreach ($repositories as $interface => $repository) {
            $this->app->bind($interface, $repository);
        }
    }

    public function boot()
    {
    }
}
