import AppLayout from '@/layouts/app-layout';
import { Head ,usePage ,router} from '@inertiajs/react';
import { PageProps } from '@inertiajs/inertia';
import { Product } from '@/types';
import {DataTable} from '@/components/table/data-table';
import { columns } from '@/components/products/columns';
import { PRODUCT_COLUMN_TRANSLATIONS } from '@/constants/translations';
import { PRODUCT_INDEX_BREADCRUMBS } from '@/constants/breadcrumbs';
import { ExportDialog } from '@/components/dialogs/export-dialog';
import { useState } from 'react';


interface ProductIndexProps extends PageProps {
    props: {
        products: Product[];
    };
}
function ProductIndexPage() {
    const { products } = usePage<ProductIndexProps>().props;
    const [open, setOpen] = useState(false);
    const handleNewResource = ()=>{
        router.get('/administration/products/create')
    }
    const handleDeleteItems = (selectedItems:Product[]) => {
        const selectedIds = selectedItems.map(item => (item as any).id);
        router.delete('/administration/products/delete-selected', {
            data: { ids: selectedIds },
        })
    }
    const handleExportResource = ()=>{
        setOpen(!open);
    }
    const handleExport = (format: string, startDate?: Date, endDate?: Date) => {
        const params = new URLSearchParams();
        params.append('format', format);
        if (startDate) {
          params.append('startDate', startDate.toISOString().split('T')[0]);
        }
        
        if (endDate) {
          params.append('endDate', endDate.toISOString().split('T')[0]);
        }
        window.location.href = `/administration/reports/products?${params.toString()}`;
    }
    return (
        <AppLayout breadcrumbs={PRODUCT_INDEX_BREADCRUMBS}>
            <Head title="Productos" />
            <section className='px-4 py-6'>
                <ExportDialog 
                 open={open}
                 setOpen={setOpen}
                 onExport={handleExport}
                 title="Exportar datos"
                 description="Selecciona el formato y rango de fechas para exportar los datos."
                 buttonText="Exportar"
                 exportFormats={["pdf", "excel", "json"]}
                />
                <DataTable 
                    data={products as Product[]}
                    columns={columns}
                    globalFilterColumn="name"
                    dateColumn="created_at" 
                    translations={PRODUCT_COLUMN_TRANSLATIONS}
                    handleExport={handleExportResource}
                    newResource={handleNewResource}
                    onDeleteSelected={handleDeleteItems}
                />
            </section>
        </AppLayout>
    );
}
export default ProductIndexPage;