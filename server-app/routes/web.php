<?php

use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ServiController;
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

    // Service routes
    Route::get('service', [ServiController::class, 'list'])->name('services.list.view');
    Route::get('create/service', [ServiController::class, 'create'])->name('services.create.view');
    Route::get('update/{servi}/service', [ServiController::class, 'getUpdate'])->name('services.update.view');
    Route::post('create/service', [ServiController::class, 'store'])->name('services.store.view');
    Route::post('update/service', [ServiController::class, 'update'])->name('services.update');


    // Client routes
    Route::get('client', [UserController::class, 'listClient'])->name('clients.list.view');
    Route::get('create/client', [UserController::class, 'createClient'])->name('client.create');
    Route::post('create/client', [UserController::class, 'storeClient'])->name('client.store');
    Route::get('update/{user}/client', [UserController::class, 'getClientUpdate'])->name('client.update.view');
    Route::patch('update/client/{user}', [UserController::class, 'updateClient'])->name('client.update');

    // Product routes
    Route::get('product', [ProductController::class, 'list'])->name('products.list.view');
    Route::get('create/product', [ProductController::class, 'create'])->name('product.create.view');
    Route::post('create/product', [ProductController::class, 'store'])->name('product.store');
    Route::get('update/{product}/product', [ProductController::class, 'getUpdate'])->name('product.update.view');
    Route::post('update/product', [ProductController::class, 'update'])->name('products.update');
    Route::post('delete/product/{id}', [ProductController::class, 'delete'])->name('products.destroy');

    // Organization routes
    Route::get('list/organization', [OrganizationController::class, 'list'])->name('organization.list.view');
    Route::get('create/organization', [OrganizationController::class, 'create'])->name('organization.create.view');
    Route::get('organization/{organization}/edit', [OrganizationController::class, 'getUpdate'])->name('organization.update.view');
    Route::post('create/organization', [OrganizationController::class, 'store'])->name('organizations.store');
    Route::post('organization/edit', [OrganizationController::class, 'update'])->name('organizations.update');
    Route::post('organization/delete/{id}', [OrganizationController::class, 'delete'])->name('organizations.destroy');

    // User routes
    Route::get('user', [UserController::class, 'create'])->name('users.create');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
