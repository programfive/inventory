import { PRODUCT_CREATE_BREADCRUMBS } from '@/constants/breadcrumbs/products';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

function ProductCreatePage() {
    return (
        <AppLayout breadcrumbs={PRODUCT_CREATE_BREADCRUMBS}>
            <Head title="Productos" />
            create
        </AppLayout>
    );
}
export default ProductCreatePage;