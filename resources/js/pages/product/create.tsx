import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { ProductForm } from '@/components/products/product-form';
import { PRODUCT_CREATE_BREADCRUMBS } from '@/constants/breadcrumbs';

function ProductCreatePage() {
    return (
        <AppLayout breadcrumbs={PRODUCT_CREATE_BREADCRUMBS}>
            <Head title="Productos" />
            <section className='px-4 py-6'>
                <ProductForm />
            </section>
        </AppLayout>
    );
}
export default ProductCreatePage;