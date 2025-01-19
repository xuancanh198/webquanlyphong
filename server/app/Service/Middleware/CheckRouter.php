<?php 

namespace App\Service\Middleware;
use Illuminate\Support\Facades\Auth;
class CheckRouter    
{
    
    public function execute($request){
        $prefix = $request->segment(2);
        if ($prefix === 'admin') {
            config(['auth.defaults.guard' => 'admin']);
            config(['auth.defaults.passwords' => 'admin']);
        } elseif ($prefix === 'user') {
            config(['auth.defaults.guard' => 'user']);
            config(['auth.defaults.passwords' => 'user']);
        }
    }
}