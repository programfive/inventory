@extends('reports.pdf.layouts.base')

@section('content')
    <div class="overflow-hidden rounded-md border border-zinc-200 bg-white">
        <table class="w-full text-sm text-left">
            <thead>
                <tr class="bg-zinc-100 border-b border-zinc-200">
                    <th scope="col" class="py-3 px-4 font-medium">#</th>
                    <th scope="col" class="py-3 px-4 font-medium">Nombre</th>
                    <th scope="col" class="py-3 px-4 font-medium">Descripción</th>
                    <th scope="col" class="py-3 px-4 font-medium text-right">Precio de compra</th>
                    <th scope="col" class="py-3 px-4 font-medium text-right">Precio de venta</th>
                    <th scope="col" class="py-3 px-4 font-medium text-center">Estado</th>
                    <th scope="col" class="py-3 px-4 font-medium">Fecha de creación</th>
                </tr>
            </thead>
            <tbody>
                @foreach($products as $index => $product)
                <tr class="border-b border-zinc-100 hover:bg-zinc-50">
                    <td class="py-3 px-4 text-zinc-600">{{ $index + 1 }}</td>
                    <td class="py-3 px-4 font-medium">{{ $product->name }}</td>
                    <td class="py-3 px-4 text-zinc-600">
                        {{ Str::limit($product->description, 40) ?? 'Sin descripción' }}
                    </td>
                    <td class="py-3 px-4 text-right">
                        Bs {{ number_format($product->purchase_price ?? 0, 2) }}
                    </td>
                    <td class="py-3 px-4 text-right">
                        Bs {{ number_format($product->sale_price ?? 0, 2) }}
                    </td>
                    <td class="py-3 px-4 text-center">
                        @if($product->is_excluded)
                            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                Excluido
                            </span>
                        @else
                            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                Activo
                            </span>
                        @endif
                    </td>
                    <td class="py-3 px-4 text-zinc-600">
                        {{ \Carbon\Carbon::parse($product->created_at)->format('d/m/Y') }}
                    </td>
                </tr>
                @endforeach

                @if(count($products) === 0)
                <tr>
                    <td colspan="7" class="py-8 text-center text-zinc-500">
                        No se encontraron productos en el período seleccionado
                    </td>
                </tr>
                @endif
            </tbody>
        </table>
    </div>

    <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-white rounded-md border border-zinc-200 p-4">
            <h3 class="font-medium mb-2 text-zinc-900">Total de productos</h3>
            <p class="text-2xl font-bold text-zinc-900">{{ count($products) }}</p>
        </div>

        <div class="bg-white rounded-md border border-zinc-200 p-4">
            <h3 class="font-medium mb-2 text-zinc-900">Valor de compra</h3>
            <p class="text-2xl font-bold text-zinc-900">Bs {{ number_format($products->sum('purchase_price'), 2) }}</p>
        </div>

        <div class="bg-white rounded-md border border-zinc-200 p-4">
            <h3 class="font-medium mb-2 text-zinc-900">Valor de venta</h3>
            <p class="text-2xl font-bold text-zinc-900">Bs {{ number_format($products->sum('sale_price'), 2) }}</p>
        </div>
    </div>

    <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white rounded-md border border-zinc-200 p-4">
            <h3 class="font-medium mb-4 text-zinc-900">Estado de productos</h3>
            <div class="flex items-center justify-between">
                <div>
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 mr-2">
                        Activos
                    </span>
                    <span class="text-lg font-semibold">{{ $products->where('is_excluded', false)->count() }}</span>
                </div>
                <div>
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 mr-2">
                        Excluidos
                    </span>
                    <span class="text-lg font-semibold">{{ $products->where('is_excluded', true)->count() }}</span>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-md border border-zinc-200 p-4">
            <h3 class="font-medium mb-4 text-zinc-900">Margen promedio</h3>
            @php
                $totalMargin = 0;
                $count = 0;
                foreach($products as $product) {
                    if($product->purchase_price > 0 && $product->sale_price > 0) {
                        $totalMargin += (($product->sale_price - $product->purchase_price) / $product->purchase_price) * 100;
                        $count++;
                    }
                }
                $averageMargin = $count > 0 ? $totalMargin / $count : 0;
            @endphp
            <p class="text-lg font-semibold">{{ number_format($averageMargin, 2) }}%</p>
        </div>
    </div>
@endsection