<?php

use App\Http\Controllers\AdLocationController;
use App\Http\Controllers\AdSpendController;
use App\Http\Controllers\BusinessCryptoController;
use Illuminate\Support\Facades\Route;

Route::apiResource('ad-locations', AdLocationController::class);
Route::apiResource('ad-spends', AdSpendController::class);
Route::apiResource('business-cryptos', BusinessCryptoController::class);
