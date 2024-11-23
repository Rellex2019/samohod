<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductCartController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


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


Route::post('/login', [UserController::class, 'login']);
Route::post('/signup', [UserController::class, 'signup']);
Route::get('/products', [ProductController::class, 'index']);
Route::post('/change', [ProductCartController::class, 'changeQuantity']);

Route::middleware(['auth:api'])->group(function () {
    Route::get('/logout', [UserController::class, 'logout'])->middleware(['auth:api']);


    Route::prefix('cart')->group(function () {
        Route::post('/{product}', [ProductCartController::class, 'addProduct']);
        Route::get('/', [ProductCartController::class, 'show']);
        Route::delete('/{productCart}', [ProductCartController::class, 'remove']);


    });

    Route::prefix('order')->group(function () {
        Route::post('/', [OrderController::class, 'store']);
        Route::get('/', [OrderController::class, 'index']);
    });



    Route::middleware(['can:isAdmin,App\Models\User'])->group(function () {

        Route::prefix('product')->group(function () {
            Route::post('/', [ProductController::class, 'store']);
            Route::delete('/{product}', [ProductController::class, 'remove']);
            Route::patch('/{product}', [ProductController::class, 'update']);
        });

    });

});
