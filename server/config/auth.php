<?php

return [
    'defaults' => [
        'guard' => 'web',
        'passwords' => 'admins',
    ],
    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'admins',
        ],
        'api' => [
            'driver' => 'passport',
            'provider' => 'admins',
        ],
        'admin' => [
            'driver' => 'passport', 
            'provider' => 'admins',
        ],

        'user' => [
            'driver' => 'passport',
            'provider' => 'users',
        ],

    ],
    'providers' => [
        
        'users' => [
            'driver' => 'eloquent',
            'model' => App\Models\User\UserModel::class,
        ],

        'admins' => [
            'driver' => 'eloquent',
            'model' => App\Models\Staff\StaffModel::class,
        ],
    ],
    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table' => 'password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],
        'admins' => [
            'provider' => 'admins',
            'table' => 'password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],  
    ],

    'password_timeout' => 10800,

];
