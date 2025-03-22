<?php

namespace App\Http\Controllers\Administration;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\Destroy\DestroySelectedProductRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use Spatie\Browsershot\Browsershot;
class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::orderBy('created_at', 'desc')->get();
        return Inertia::render('product/index',[
            'products' => $products,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('product/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $validatedData = $request->validated();
        Product::create($validatedData);
        return redirect()->route('products')->with('success', 'Producto creado correctamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = Product::findOrFail($id);
        
        return Inertia::render('product/show', [
            'product' => $product,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $product = Product::findOrFail($id);
        return Inertia::render('product/edit', [
            'product' => $product,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreProductRequest $request, $id)
    {
        $validatedData = $request->validated();
        $product = Product::findOrFail($id);
        $product->update($validatedData);
        return redirect()->route('products')->with('success', 'Producto actualizado correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return redirect()->route('products')->with('success', 'Producto eliminado correctamente.');
    }
    /**
     * Delete multiple selected resources.
     */
    public function destroySelected(DestroySelectedProductRequest $request)
    {
        $validatedData = $request->validated(); 
    
        $count = count($validatedData['ids']);
        Product::whereIn('id', $validatedData['ids'])->delete();
    
        return redirect()->route('products')->with('success', $count > 1
            ? "{$count} productos eliminados correctamente."
            : "Producto eliminado correctamente."
        );
    }
}
