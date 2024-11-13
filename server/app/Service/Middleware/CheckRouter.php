<?php 

namespace App\Service\Middleware;
use Illuminate\Support\Facades\Auth;
class CheckRouter    
{
    
    public function execute($request){
        $prefix = $request->segment(2);
        if ($prefix === 'admin') {
            Auth::guard('admin')->check();
        } elseif ($prefix === 'user') {
            Auth::guard('user')->check();
        }
    }
}