<?php

namespace App\Http\Controllers\Administration;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Supplier;
use App\Http\Requests\StoreSupplierRequest;
use App\Http\Requests\Destroy\DestroySelectedSupplierRequest;
class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $suppliers = Supplier::orderBy('created_at', 'desc')->get();
        return Inertia::render('supplier/index', [
            'suppliers' => $suppliers,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('supplier/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSupplierRequest $request)
    {
        $validatedData = $request->validated();
        Supplier::create($validatedData);
        return redirect()->route('suppliers')->with('success', 'Proveedor creado correctamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $supplier = Supplier::findOrFail($id);
        return Inertia::render('supplier/show', [
            'supplier' => $supplier,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $supplier = Supplier::findOrFail($id);
        return Inertia::render('supplier/edit', [
            'supplier' => $supplier,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreSupplierRequest $request, string $id)
    {
        $validatedData = $request->validated();
        $supplier = Supplier::findOrFail($id);

        $supplier->update($validatedData);
        return redirect()->route('suppliers')->with('success', 'Proveedor actualizado correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $supplier = Supplier::findOrFail($id);
        $supplier->delete();
        return redirect()->route('suppliers')->with('success', 'Proveedor eliminado correctamente.');
    }

    /**
     * Delete multiple selected resources.
     */
    public function destroySelected(DestroySelectedSupplierRequest $request)
    {
        $validatedData = $request->validated();
        $count = count($validatedData['ids']);
        Supplier::whereIn('id', $validatedData['ids'])->delete();

        return redirect()->route('suppliers')->with('success', $count > 1
            ? "{$count} proveedores eliminados correctamente."
            : "Proveedor eliminado correctamente."
        );
    }
}