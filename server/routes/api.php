<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\Room\TypeRoomController;
use App\Http\Controllers\Admin\Room\FloorController;
use App\Http\Controllers\Admin\Room\ServiceController;
use App\Http\Controllers\Admin\Room\BuildingController;
use App\Http\Controllers\Admin\Room\FurnitureController;
use App\Http\Controllers\Admin\Room\RoomController;
use App\Http\Controllers\Admin\Staff\RoleController;
use App\Http\Controllers\Admin\User\UserController;
use App\Http\Controllers\Admin\Permisstion\PermisstionController;
use App\Http\Controllers\Admin\Permisstion\ActionController;
use App\Http\Controllers\Admin\User\ContractController;
use App\Http\Controllers\Admin\Staff\AuthController;
use App\Http\Controllers\Admin\Staff\StaffController;
Route::middleware(['admin.middleware'])->group(function () {
    Route::group(['prefix' => 'admin'], function () {
        Route::post('/login', [AuthController::class, 'login']);
        Route::group(['prefix' => 'staff'], function () {
            Route::group(['prefix' => 'role'], function () {
                Route::get('/', [RoleController::class, 'index']);
                Route::post('/', [RoleController::class, 'store']);
                Route::put('/{id}', [RoleController::class, 'update']);
                Route::delete('/{id}', [RoleController::class, 'destroy']);
            });
            Route::group(['prefix' => 'staff'], function () {
                Route::get('/', [StaffController::class, 'index']);
                Route::post('/', [StaffController::class, 'store']);
                Route::put('/{id}', [StaffController::class, 'update']);
                Route::delete('/{id}', [StaffController::class, 'destroy']);
            });
        });
        Route::group(['prefix' => 'user'], function () {
            Route::group(['prefix' => 'user'], function () {
                Route::get('/', [UserController::class, 'index']);
                Route::post('/', [UserController::class, 'store']);
                Route::put('/{id}', [UserController::class, 'update']);
                Route::delete('/{id}', [UserController::class, 'destroy']);
            });
            Route::group(['prefix' => 'contact'], function () {
                Route::get('/', [ContractController::class, 'index']);
                Route::post('/', [ContractController::class, 'store']);
                Route::put('/{id}', [ContractController::class, 'update']);
                Route::delete('/{id}', [ContractController::class, 'destroy']);
            });
        });
        Route::group(['prefix' => 'permission'], function () {
            Route::group(['prefix' => 'permission'], function () {
                Route::get('/', [PermisstionController::class, 'index']);
                Route::post('/', [PermisstionController::class, 'store']);
                Route::put('/{id}', [PermisstionController::class, 'update']);
                Route::delete('/{id}', [PermisstionController::class, 'destroy']);
            });
            Route::group(['prefix' => 'action'], function () {
                Route::get('/', [ActionController::class, 'index']);
                Route::post('/', [ActionController::class, 'store']);
                Route::put('/{id}', [ActionController::class, 'update']);
                Route::delete('/{id}', [ActionController::class, 'destroy']);
            });
        });
        Route::group(['prefix' => 'room'], function () {
            Route::group(['prefix' => 'typeRoom'], function () {
                Route::get('/', [TypeRoomController::class, 'index']);
                Route::post('/', [TypeRoomController::class, 'store']);
                Route::put('/{id}', [TypeRoomController::class, 'update']);
                Route::delete('/{id}', [TypeRoomController::class, 'destroy']);
            });
            Route::group(['prefix' => 'floor'], function () {
                Route::get('/', [FloorController::class, 'index']);
                Route::post('/', [FloorController::class, 'store']);
                Route::put('/{id}', [FloorController::class, 'update']);
                Route::delete('/{id}', [FloorController::class, 'destroy']);
            });
            Route::group(['prefix' => 'building'], function () {
                Route::get('/', [BuildingController::class, 'index']);
                Route::post('/', [BuildingController::class, 'store']);
                Route::put('/{id}', [BuildingController::class, 'update']);
                Route::delete('/{id}', [BuildingController::class, 'destroy']);
            });
            Route::group(['prefix' => 'service'], function () {
                Route::get('/', [ServiceController::class, 'index']);
                Route::post('/', [ServiceController::class, 'store']);
                Route::put('/{id}', [ServiceController::class, 'update']);
                Route::delete('/{id}', [ServiceController::class, 'destroy']);
            });
            Route::group(['prefix' => 'furniture'], function () {
                Route::get('/', [FurnitureController::class, 'index']);
                Route::post('/', [FurnitureController::class, 'store']);
                Route::put('/{id}', [FurnitureController::class, 'update']);
                Route::delete('/{id}', [FurnitureController::class, 'destroy']);
            });
            Route::group(['prefix' => 'room'], function () {
                Route::get('/', [RoomController::class, 'index']);
                Route::post('/', [RoomController::class, 'store']);
                Route::put('/{id}', [RoomController::class, 'update']);
                Route::delete('/{id}', [RoomController::class, 'destroy']);
            });
        });
    });
});
