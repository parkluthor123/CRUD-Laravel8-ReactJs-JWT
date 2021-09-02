<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\ApiController;
use App\Http\Controllers\api\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(['middleware' => ['apiJwt']], function(){
    Route::get('/data/show/{id}', [ApiController::class, 'show']);
    Route::get('/data', [ApiController::class, 'index']);
});

Route::post('/data/cadastrar', [ApiController::class, 'store']);
Route::post('/data/editar/{id}', [ApiController::class, 'update']);
Route::post('/data/deletar/{id}', [ApiController::class, 'destroy']);

Route::post('/login', [AuthController::class, 'login']);
