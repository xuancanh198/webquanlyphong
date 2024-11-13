<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Service\Middleware\CheckLang;
use App\Service\Middleware\CheckRouter;
class GlobalMiddleware
{
   
    protected $checkLang;

    protected $checkRouter;

    public function __construct(CheckLang $checkLang, CheckRouter $checkRouter)
    {
        $this->checkLang = $checkLang;
        $this->checkRouter = $checkRouter;
    }

    public function handle($request, Closure $next)
    {
        $this->checkLang->execute($request);
        $this->checkRouter->execute($request);
        return $next($request);
    }
}
