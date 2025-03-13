import { PRODUCT_INDEX_BREADCRUMBS } from '@/constants/breadcrumbs/products';
import AppLayout from '@/layouts/app-layout';
import { Head ,usePage } from '@inertiajs/react';
import { PageProps } from '@inertiajs/inertia';
import { Product } from '@/types';
import Datatable from '@/components/table/data-table';
import { columns } from '@/components/products/columns';

interface ProductIndexProps extends PageProps {
    props: {
        products: Product[];
    };
}
const columnNameTranslations: Record<string, string> = {
    nombre: "Nombre",
    descripcion: "Descripción",
    purchase_price: "Precio de compra",
    sale_price: "Precio de venta",
    is_excluded: "Excluido",
    created_at: "Fecha de creación",
};
function ProductIndexPage() {
    const { products } = usePage<ProductIndexProps>().props;
    return (
        <AppLayout breadcrumbs={PRODUCT_INDEX_BREADCRUMBS}>
            <Head title="Productos" />
            <section className='px-4 py-6'>
                <Datatable 
                    data={products as Product[]}
                    columns={columns}
                    globalFilterColumn="name"
                    translations={columnNameTranslations}
                    handleExport={()=>{}}
                    newResource={()=>{}}
                />
            </section>
        </AppLayout>
    );
}
export default ProductIndexPage;