<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Service\Middleware\CheckLang;
use App\Service\Middleware\CheckRouter;
use App\Service\Middleware\CheckToken;
class GlobalMiddleware
{
   
    protected $checkLang;

    protected $checkRouter;
    protected $checkToken;
    protected   $excludePaths = ['login', 'register', 'reset-password'];

    public function __construct(CheckLang $checkLang, CheckRouter $checkRouter )
    {
        $this->checkLang = $checkLang;
        $this->checkRouter = $checkRouter;
    }

    public function handle($request, Closure $next)
    {
        $this->checkLang->execute($request);
        $this->checkRouter->execute($request);
        $path = $request->path();
        foreach ($this->excludePaths as $excludePath) {
            if (str_ends_with($path, $excludePath)) {
                return $next($request);
            }
        }
    //    $result =  $this->checkToken->execute($request);
    //    if($result === 401){
    //     return response()->json([
    //         'status' => 'error',
    //         'message' => 'Unauthorized access. Invalid token.'
    //     ], 401);
    //    }
        return $next($request);
    }
}
