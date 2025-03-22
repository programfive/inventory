import AppLayout from '@/layouts/app-layout';
import { Head ,usePage ,router} from '@inertiajs/react';
import { PageProps } from '@inertiajs/inertia';
import { Supplier } from '@/types';
import { SUPPLIER_INDEX_BREADCRUMBS } from '@/constants/breadcrumbs';
import { SUPPLIER_COLUMN_TRANSLATIONS } from '@/constants/translations';
import { columns } from '@/components/suppliers/columns';
import { DataTable } from '@/components/table/data-table';


interface SuppliersIndexProps extends PageProps {
    props: {
        suppliers: Supplier[];
    };
}
function SuppliersIndexPage() {
    const { suppliers } = usePage<SuppliersIndexProps>().props;
    const handleNewResource = ()=>{
        router.get('/administration/suppliers/create')
    }
    const handleDeleteSelectedItems = (selectedItems:Supplier[]) => {
        const selectedIds = selectedItems.map(item => (item as any).id);
        router.delete('/administration/suppliers/delete-selected', {
            data: { ids: selectedIds },
        })
    }
    const handleExport = (params:URLSearchParams) => {
        window.location.href = `/administration/reports/suppliers?${params.toString()}`;
    };
    return (
        <AppLayout breadcrumbs={SUPPLIER_INDEX_BREADCRUMBS}>
            <Head title="Proveedores" />
            <section className='px-4 py-6'>
                <DataTable 
                    data={suppliers as Supplier[]}
                    columns={columns}
                    globalFilterColumn="name"
                    dateColumn="created_at" 
                    translations={SUPPLIER_COLUMN_TRANSLATIONS}
                    onExport={handleExport}
                    newResource={handleNewResource}
                    onDeleteSelected={handleDeleteSelectedItems}
                />
            </section>
        </AppLayout>
    );
}
export default SuppliersIndexPage;