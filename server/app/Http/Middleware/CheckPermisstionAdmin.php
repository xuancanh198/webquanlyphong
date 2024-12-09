<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Permisstion\PermisstionDetailModel;
use App\Enums\StaffsEnum;
use Illuminate\Support\Facades\Auth;

class CheckPermisstionAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        $user = Auth::user();
        if ($user->id !== StaffsEnum::SUPPER_ADMIN_ID) {
            $path = $request->path();
            $findCode = PermisstionDetailModel::where('url', $path)->first();
            if ($findCode) {
                $hasPermission = $user->hasPermission($findCode->code);
                if (!$hasPermission) {
                    return response()->json(['message' => 'Permission denied'], 403);
                }
            }
        }

        return $next($request);
    }
}
