<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Spatie\Browsershot\Browsershot;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\ProductExport;
class ProductReportController extends Controller
{
   /**
     *Displays the product report.
    */
    public function products(Request $request)
    {
        $format = $request->query('format', 'pdf');
        $startDate = $request->query('startDate');
        $endDate = $request->query('endDate');
        
        $query = Product::query();
        
        if ($startDate) {
            $query->whereDate('created_at', '>=', $startDate);
        }
        
        if ($endDate) {
            $query->whereDate('created_at', '<=', $endDate);
        }
        
        $products = $query->orderBy('created_at', 'desc')->get();
        
        if (!$request->has('format')) {
            return view('reports.pdf.products', [
                'products' => Product::orderBy('created_at', 'desc')->get(),
                'startDate' => null,
                'endDate' => null
            ]);
        }
        
        switch ($format) {
            case 'excel':
              return Excel::download(new ProductExport($startDate, $endDate), 'products.xlsx');
              case 'json':
                $jsonData = json_encode($products, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
                return response($jsonData, 200)
                    ->header('Content-Type', 'application/json')
                    ->header('Content-Disposition', 'attachment; filename="products_' . date('Y-m-d') . '.json"');
            case 'pdf':
            default:
                $html = view('reports.pdf.products', [
                    'products' => $products,
                    'startDate' => $startDate,
                    'endDate' => $endDate
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
                    ->header('Content-Disposition', 'attachment; filename="productos_' . date('Y-m-d') . '.pdf"');
        }
    }
}
