
import { SUPPLIER_EDIT_BREADCRUMBS } from '@/constants/breadcrumbs';
import AppLayout from '@/layouts/app-layout';
import { Supplier } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { PageProps } from '@inertiajs/inertia';
import { SupplierForm } from '@/components/suppliers/suppliers-form';

interface ProductEditProps extends PageProps {
    props: {
        suppliers: Supplier;
    };
}
function ProductEditPage() {
    const { supplier   } = usePage<ProductEditProps>().props;
    return (
        <AppLayout breadcrumbs={SUPPLIER_EDIT_BREADCRUMBS}>
            <Head title="Productos" />
            <section className='px-4 py-6'>
                <SupplierForm isEditing supplier={supplier as Supplier}/>
            </section>
        </AppLayout>
    );
}
export default ProductEditPage;