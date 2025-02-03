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
use App\Http\Controllers\Admin\Permisstion\PermisstionDetailController;
use App\Http\Controllers\Admin\User\ContractController;
use App\Http\Controllers\Admin\User\BillController;
use App\Http\Controllers\Admin\Staff\AuthController;
use App\Http\Controllers\Admin\Staff\StaffController;
use App\Http\Controllers\Admin\System\SettingController;
use App\Http\Controllers\User\AccountController;

Route::middleware(['admin.middleware'])->group(function () {
    Route::group(['prefix' => 'admin',], function () {
        Route::post('/login', [AuthController::class, 'login']);
            Route::middleware(['admin.checkPermisstion'])->group(function () {
            Route::get('/my-user-account', [AuthController::class, 'getMyInfoAccount']);
            Route::put('/update-staff-account', [AuthController::class, 'updateInfo']);
                Route::group(['prefix' => 'system'], function () {
                    Route::group(['prefix' => 'setting'], function () {
                        Route::get('', [SettingController::class, 'index']);
                        Route::post('/', [SettingController::class, 'store']);
                        Route::put('/{id}', [SettingController::class, 'update']);
                        Route::delete('/{id}', [SettingController::class, 'destroy']);
                    });
                });
                Route::group(['prefix' => 'staff'], function () {
                    Route::group(['prefix' => 'role'], function () {
                        Route::get('', [RoleController::class, 'index']);
                        Route::post('/', [RoleController::class, 'store']);
                        Route::put('/{id}', [RoleController::class, 'update']);
                        Route::delete('/{id}', [RoleController::class, 'destroy']);
                    });
                    Route::group(['prefix' => 'staff'], function () {
                        Route::get('', [StaffController::class, 'index']);
                        Route::post('/', [StaffController::class, 'store']);
                        Route::put('/{id}', [StaffController::class, 'update']);
                        Route::delete('/{id}', [StaffController::class, 'destroy']);
                    });
                });
                Route::group(['prefix' => 'user'], function () {
                    Route::group(['prefix' => 'user'], function () {
                        Route::get('', [UserController::class, 'index']);
                        Route::post('/', [UserController::class, 'store']);
                        Route::put('/{id}', [UserController::class, 'update']);
                        Route::delete('/{id}', [UserController::class, 'destroy']);
                    });
                    Route::group(['prefix' => 'contact'], function () {
                        Route::get('', [ContractController::class, 'index']);
                        Route::post('/', [ContractController::class, 'store']);
                        Route::put('/{id}', [ContractController::class, 'update']);
                        Route::delete('/{id}', [ContractController::class, 'destroy']);
                        Route::get('/get-service/{id}', [ContractController::class, 'getService']);
                        Route::get('/get-furniture/{id}', [ContractController::class, 'getFurniture']);
                    });
                    Route::group(['prefix' => 'bill'], function () {
                        Route::get('', [BillController::class, 'index']);
                        Route::post('/', [BillController::class, 'store']);
                        Route::put('/{id}', [BillController::class, 'update']);
                        Route::delete('/{id}', [BillController::class, 'destroy']);
                        Route::get('/get-service-room-contract/{roomId}', [BillController::class, 'getServiceRoomContract']);
                    });
                });
                Route::group(['prefix' => 'permission'], function () {
                    Route::group(['prefix' => 'permission'], function () {
                        Route::get('', [PermisstionController::class, 'index']);
                        Route::post('/', [PermisstionController::class, 'store']);
                        Route::put('/{id}', [PermisstionController::class, 'update']);
                        Route::delete('/{id}', [PermisstionController::class, 'destroy']);
                    });
                    Route::group(['prefix' => 'permissionDetail'], function () {
                        Route::get('', [PermisstionDetailController::class, 'index']);
                        Route::post('/', [PermisstionDetailController::class, 'store']);
                        Route::put('/{id}', [PermisstionDetailController::class, 'update']);
                        Route::delete('/{id}', [PermisstionDetailController::class, 'destroy']);
                    });
                    Route::group(['prefix' => 'action'], function () {
                        Route::get('', [ActionController::class, 'index']);
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
                        Route::post('', [FloorController::class, 'store']);
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
                        Route::get('', [ServiceController::class, 'index']);
                        Route::post('/', [ServiceController::class, 'store']);
                        Route::put('/{id}', [ServiceController::class, 'update']);
                        Route::delete('/{id}', [ServiceController::class, 'destroy']);
                    });
                    Route::group(['prefix' => 'furniture'], function () {
                        Route::get('', [FurnitureController::class, 'index']);
                        Route::post('/', [FurnitureController::class, 'store']);
                        Route::put('/{id}', [FurnitureController::class, 'update']);
                        Route::delete('/{id}', [FurnitureController::class, 'destroy']);
                    });
                    Route::group(['prefix' => 'room'], function () {
                        Route::get('', [RoomController::class, 'index']);
                        Route::post('/', [RoomController::class, 'store']);
                        Route::put('/{id}', [RoomController::class, 'update']);
                        Route::delete('/{id}', [RoomController::class, 'destroy']);
                    });
                });
            });

    });
    Route::group(['prefix' => 'user'], function () {
        Route::post('/login', [AccountController::class, 'login']);

            Route::get('/my-account', [AccountController::class, 'getMyUser']);
            Route::post('/send-otp', [AccountController::class, 'authenticOTP']);
    });
});
