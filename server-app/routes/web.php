<?php

use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('service', [\App\Http\Controllers\ServiController::class, 'create'])->name('services.create');
    Route::post('create/service', [\App\Http\Controllers\ServiController::class, 'store'])->name('services.store');

    Route::get('client', [UserController::class, 'createClient'])->name('clients.create');
    Route::post('create/client', [UserController::class, 'storeClient'])->name('clients.store');
    Route::get('product', [ProductController::class, 'create'])->name('products.create');
    Route::post('create/product', [ProductController::class, 'store'])->name('products.store');
    Route::get('organization', [OrganizationController::class, 'create'])->name('organizations.create');
    Route::post('create/organization', [OrganizationController::class, 'store'])->name('organizations.store');
    Route::get('user', [UserController::class, 'create'])->name('users.create');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
