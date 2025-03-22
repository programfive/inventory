
import { PRODUCT_SHOW_BREADCRUMBS } from '@/constants/breadcrumbs';
import AppLayout from '@/layouts/app-layout';
import { Supplier } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { PageProps } from '@inertiajs/inertia';
import { SupplierForm } from '@/components/suppliers/suppliers-form';

interface SupplierShowProps extends PageProps {
    props: {
        supplier: Supplier;
    };
}
function SupplierShowPage() {
    const { supplier   } = usePage<SupplierShowProps>().props;
    return (
        <AppLayout breadcrumbs={PRODUCT_SHOW_BREADCRUMBS}>
            <Head title="Productos" />
            <section className='px-4 py-6'>
            <SupplierForm supplier={supplier as Supplier} viewOnly />
            </section>
        </AppLayout>
    );
}
export default SupplierShowPage;