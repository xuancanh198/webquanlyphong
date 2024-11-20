<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];
    public function boot(): void
    {
        $this->registerPolicies();
        Passport::tokensCan([
            'admin' => 'Quyền truy cập tài nguyên quản trị viên',
            'user' => 'Quyền truy cập tài nguyên người dùng',
        ]);
    
        Passport::setDefaultScope([
            'user', // Scope mặc định
        ]);
    }
}
