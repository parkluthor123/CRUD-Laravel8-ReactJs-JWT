<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\CrudController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get("/", [HomeController::class, 'index']);
Route::get("/cadastrar", [CrudController::class, 'create']);
Route::get("/editar/{id}", [CrudController::class, 'edit']);
Route::get("/visualizar", [CrudController::class, 'show']);
Route::post("/cadastrar", [CrudController::class, 'store'])->name('cadastrar');
Route::post("/deletar", [CrudController::class, 'destroy']);