<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UploadFirebaseController;
use App\Http\Controllers\testSmsController;

Route::get('/', [testSmsController::class,'sendSms' ]);

Route::get('/upload-image', function () {
    return view('upload-image');
})->name('upload-image-form');

Route::post('/upload-image', [UploadFirebaseController::class, 'upload'])->name('upload.image');
