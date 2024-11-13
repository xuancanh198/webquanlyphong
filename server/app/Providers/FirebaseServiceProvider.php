<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Kreait\Firebase\Factory;
use Kreait\Firebase\Storage;
class FirebaseServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(Storage::class, function ($app) {
            return (new Factory)->withServiceAccount(env('FIREBASE_CREDENTIALS'))
                ->withStorageBucket(env('FIREBASE_STORAGE_BUCKET'))
                ->createStorage();
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
