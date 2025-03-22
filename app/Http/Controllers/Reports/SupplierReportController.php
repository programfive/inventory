<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Supplier;
use Spatie\Browsershot\Browsershot;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\SupplierExport;

class SupplierReportController extends Controller
{
    /**
     * Displays the supplier report.
     */
    public function suppliers(Request $request)
    {
        $format = $request->query('format', 'pdf');
        $startDate = $request->query('startDate');
        $endDate = $request->query('endDate');

        $query = Supplier::query();

        if ($startDate) {
            $query->whereDate('created_at', '>=', $startDate);
        }

        if ($endDate) {
            $query->whereDate('created_at', '<=', $endDate);
        }

        $suppliers = $query->orderBy('created_at', 'desc')->get();

        if (!$request->has('format')) {
            return view('reports.pdf.suppliers', [
                'suppliers' => $suppliers,
                'startDate' => $startDate,
                'endDate' => $endDate,
                'title' => 'Reporte de Proveedores', 
            ]);
        }

        switch ($format) {
            case 'excel':
                return Excel::download(new SupplierExport($startDate, $endDate), 'suppliers.xlsx');
            case 'json':
                $jsonData = json_encode($suppliers, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
                return response($jsonData, 200)
                    ->header('Content-Type', 'application/json')
                    ->header('Content-Disposition', 'attachment; filename="suppliers_' . date('Y-m-d') . '.json"');
            case 'pdf':
            default:
                $html = view('reports.pdf.suppliers', [
                    'suppliers' => $suppliers,
                    'startDate' => $startDate,
                    'endDate' => $endDate,
                    'title' => 'Reporte de Proveedores',
                ])->render();

                $pdf = Browsershot::html($html)
                    ->format('A4')
                    ->landscape()
                    ->margins(10, 10, 10, 10)
                    ->showBackground()
                    ->waitUntilNetworkIdle()
                    ->pdf();

                return response($pdf, 200)
                    ->header('Content-Type', 'application/pdf')
                    ->header('Content-Disposition', 'attachment; filename="suppliers_' . date('Y-m-d') . '.pdf"');
        }
    }
}