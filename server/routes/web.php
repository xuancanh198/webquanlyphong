<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\testSmsController;

Route::get('/', [testSmsController::class, 'index']);
