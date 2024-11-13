<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Twilio\Rest\Client;
class TwilioServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(Client::class, function ($app) {
            if (app()->environment('production')) {
                $sid = env('TWILIO_LIVE_SID');
                $token = env('TWILIO_LIVE_TOKEN');
                $from = env('TWILIO_LIVE_FROM');
            } else {
                $sid = env('TWILIO_TEST_SID');
                $token = env('TWILIO_TEST_TOKEN');
                $from = env('TWILIO_TEST_FROM');
            }

            return new Client($sid, $token, $from);
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
