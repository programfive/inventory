@extends('reports.pdf.layouts.base')
@section('content')
    <div class="overflow-hidden rounded-md border border-zinc-200 bg-white">
        <table class="w-full text-sm text-left">
            <thead>
                <tr class="bg-zinc-100 border-b border-zinc-200">
                    <th scope="col" class="py-3 px-4 font-medium">#</th>
                    <th scope="col" class="py-3 px-4 font-medium">Nombre</th>
                    <th scope="col" class="py-3 px-4 font-medium">Dirección</th>
                    <th scope="col" class="py-3 px-4 font-medium">Teléfono</th>
                    <th scope="col" class="py-3 px-4 font-medium">Email</th>
                    <th scope="col" class="py-3 px-4 font-medium">Persona de contacto</th>
                    <th scope="col" class="py-3 px-4 font-medium">NIT</th>
                    <th scope="col" class="py-3 px-4 font-medium">Estado</th>
                    <th scope="col" class="py-3 px-4 font-medium">Fecha de creación</th>
                </tr>
            </thead>
            <tbody>
                @foreach($suppliers as $index => $supplier)
                <tr class="border-b border-zinc-100 hover:bg-zinc-50">
                    <td class="py-3 px-4 text-zinc-600">{{ $index + 1 }}</td>
                    <td class="py-3 px-4 font-medium">{{ $supplier->name }}</td>
                    <td class="py-3 px-4 text-zinc-600">{{ $supplier->address ?? 'N/A' }}</td>
                    <td class="py-3 px-4 text-zinc-600">{{ $supplier->phone ?? 'N/A' }}</td>
                    <td class="py-3 px-4 text-zinc-600">{{ $supplier->email ?? 'N/A' }}</td>
                    <td class="py-3 px-4 text-zinc-600">{{ $supplier->contact_person ?? 'N/A' }}</td>
                    <td class="py-3 px-4 text-zinc-600">{{ $supplier->nit ?? 'N/A' }}</td>
                    <td class="py-3 px-4 text-center">
                        @if($supplier->is_active)
                            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                Activo
                            </span>
                        @else
                            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                Inactivo
                            </span>
                        @endif
                    </td>
                    <td class="py-3 px-4 text-zinc-600">
                        {{ \Carbon\Carbon::parse($supplier->created_at)->format('d/m/Y') }}
                    </td>
                </tr>
                @endforeach

                @if(count($suppliers) === 0)
                <tr>
                    <td colspan="9" class="py-8 text-center text-zinc-500">
                        No se encontraron proveedores en el período seleccionado
                    </td>
                </tr>
                @endif
            </tbody>
        </table>
    </div>

    <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-white rounded-md border border-zinc-200 p-4">
            <h3 class="font-medium mb-2 text-zinc-900">Total de proveedores</h3>
            <p class="text-2xl font-bold text-zinc-900">{{ count($suppliers) }}</p>
        </div>
    </div>
@endsection