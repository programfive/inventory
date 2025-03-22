import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

import { SUPPLIER_CREATE_BREADCRUMBS } from '@/constants/breadcrumbs';
import { SupplierForm } from '@/components/suppliers/suppliers-form';

function ProductCreatePage() {
    return (
        <AppLayout breadcrumbs={SUPPLIER_CREATE_BREADCRUMBS}>
            <Head title="Proveedores" />
            <section className='px-4 py-6'>
                <SupplierForm/>
            </section>
        </AppLayout>
    );
}
export default ProductCreatePage;