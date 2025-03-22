<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reporte</title>
    @vite('resources/css/app.css')
    <style>
        @page {
            margin: 1.5cm;
            size: A4 landscape;
        }
        body {
            font-family: 'Inter', sans-serif;
        }
    </style>
</head>
<body class="bg-zinc-50 text-zinc-900">
    <div class="max-w-[1200px] mx-auto p-6">
        <!-- Encabezado -->
        <div class="mb-8 text-center">
            <h1 class="text-2xl font-bold text-zinc-900">{{ $title }}</h1>
            
            @if($startDate || $endDate)
            <div class="mt-2 text-sm text-zinc-500">
                @if($startDate && $endDate)
                    Período: {{ \Carbon\Carbon::parse($startDate)->format('d/m/Y') }} - {{ \Carbon\Carbon::parse($endDate)->format('d/m/Y') }}
                @elseif($startDate)
                    Desde: {{ \Carbon\Carbon::parse($startDate)->format('d/m/Y') }}
                @elseif($endDate)
                    Hasta: {{ \Carbon\Carbon::parse($endDate)->format('d/m/Y') }}
                @endif
            </div>
            @endif
        </div>

        @yield('content')

        <div class="mt-8 text-center text-xs text-zinc-500">
            <p>Reporte generado el {{ date('d/m/Y H:i:s') }}</p>
        </div>
    </div>
</body>
</html>