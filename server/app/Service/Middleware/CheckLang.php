<?php 

namespace App\Service\Middleware;

class CheckLang 
{
    
    public function execute($request){
        $lang = $request->header('Accept-Language') ?? $request->get('lang', 'vi');
        if (in_array($lang, ['en', 'vi'])) {
            app()->setLocale($lang);
        } else {
            app()->setLocale('vi');
        }
    }
}