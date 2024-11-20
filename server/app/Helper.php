<?php
use Illuminate\Support\Facades\Cache;
use App\Models\System\SettingModel;

if (!function_exists('setting')) {
    function setting($key, $default = null)
    {
        return Cache::rememberForever("setting_{$key}", function () use ($key, $default) {
            $setting = SettingModel::where('key', $key)->first();
            return $setting ? $setting->value : $default;
        });
    }
}