<?php

use App\Http\Controllers\FileController;
use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ServiController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ReasonController;
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
    Route::get('service', [ServiController::class, 'show'])->name('services.view');
    Route::get('create/service', [ServiController::class, 'create'])->name('services.create.view');
    Route::get('edit/{servi}/service', [ServiController::class, 'getUpdate'])->name('services.update.view');
    Route::get('list-reception/service', [ServiController::class, 'listReception'])->name('services.list.reception.view');
    Route::get('list-repair/service', [ServiController::class, 'listRepair'])->name('services.list.repair.view');
    Route::get('list-in-repair/service', [ServiController::class, 'listInRepair'])->name('service.list.in.repair.view');
    Route::get('list-diagnosis/service', [ServiController::class, 'listDiagnosis'])->name('service.list.in.diagnosis.view');
    Route::post('create/service', [ServiController::class, 'store'])->name('services.store');
    Route::post('manage/service', [ServiController::class, 'update'])->name('services.update');
    Route::delete('delete/service/{id}', [ServiController::class, 'delete'])->name('services.destroy');
    Route::post('to-repair/service', [ServiController::class, 'toRepaired'])->name('service.list.to.repaired');
    Route::post('to-diagnosis/service', [ServiController::class, 'toDiagnosis'])->name('service.list.to.diagnosis');

    // Product routes
    Route::get('product', [ProductController::class, 'list'])->name('products.list.view');
    Route::get('create/product', [ProductController::class, 'create'])->name('product.create.view');
    Route::post('create/product', [ProductController::class, 'store'])->name('product.store');
    Route::get('update/{product}/product', [ProductController::class, 'getUpdate'])->name('product.update.view');
    Route::post('update/product', [ProductController::class, 'update'])->name('products.update');
    Route::delete('delete/product/{id}', [ProductController::class, 'delete'])->name('products.destroy');

    // Organization routes
    Route::get('list/organization', [OrganizationController::class, 'list'])->name('organization.list.view');
    Route::get('create/organization', [OrganizationController::class, 'create'])->name('organization.create.view');
    Route::get('organization/{organization}/edit', [OrganizationController::class, 'getUpdate'])->name('organization.update.view');
    Route::get('organization/show', [OrganizationController::class, 'show'])->name('organization.show.view');
    Route::post('create/organization', [OrganizationController::class, 'store'])->name('organizations.store');
    Route::post('organization/edit', [OrganizationController::class, 'update'])->name('organizations.update');
    Route::delete('organization/delete/{id}', [OrganizationController::class, 'delete'])->name('organizations.destroy');

    // User Clients routes
    Route::get('create/user-client', [UserController::class, 'create'])->name('users.create.view');
    Route::get('user-client', [UserController::class, 'listClient'])->name('users.client.list.view');
    Route::get('update/{user}/user-client', [UserController::class, 'getUpdateClient'])->name('users.update.client.view');
    Route::post('create/user-client', [UserController::class, 'storeClient'])->name('users.store.client');
    Route::delete('delete-client/{id}', [UserController::class, 'deleteClient'])->name('users.client.destroy');
    Route::post('update-client', [UserController::class, 'updateClient'])->name('users.client.update');

    // File routes
    Route::delete('delete-image-service/{id}', [FileController::class, 'removeImage'])->name('service.file.delete');
    Route::post('upload-image-service', [FileController::class, 'uploadImage'])->name('service.file.upload');

    // Reason routes
    Route::post('store-reason-service', [ReasonController::class, 'store'])->name('reason.store');
    Route::delete('delete-reason-service/{id}', [ReasonController::class, 'delete'])->name('reason.delete');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
