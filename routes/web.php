<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Administration\ProductController; 
use App\Http\Controllers\Administration\SupplierController; 
use App\Http\Controllers\Reports\ProductReportController; 
use App\Http\Controllers\Reports\SupplierReportController; 


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::prefix('administration/reports')->group(function () {
        Route::get('/products', [ProductReportController::class, 'products'])->name('reports.products');
        Route::get('/suppliers', [SupplierReportController::class, 'suppliers'])->name('reports.suppliers');

    });


    Route::prefix('administration/products')->controller(ProductController::class)->group(function () {
        Route::get('/', 'index')->name('products');
        Route::get('/create', 'create')->name('products.create');
        Route::get('/{id}/edit', 'edit')->name('products.edit');
        Route::get('/{id}/show', 'show')->name('products.show');
        Route::post('/create', 'store');
        Route::put('/{id}/update', 'update');
        Route::delete('/{id}/delete', 'destroy');
        Route::delete('/delete-selected', 'destroySelected');
    });
    Route::prefix('administration/suppliers')->controller(SupplierController::class)->group(function () {
        Route::get('/', 'index')->name('suppliers');
        Route::get('/create', 'create')->name('suppliers.create');
        Route::get('/{id}/edit', 'edit')->name('suppliers.edit');
        Route::get('/{id}/show', 'show')->name('suppliers.show');
        Route::post('/create', 'store');
        Route::put('/{id}/update', 'update');
        Route::delete('/{id}/delete', 'destroy');
        Route::delete('/delete-selected', 'destroySelected');
    });
    
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
