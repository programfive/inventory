import { ProductForm } from '@/components/products/product-form';
import { PRODUCT_SHOW_BREADCRUMBS } from '@/constants/breadcrumbs';
import AppLayout from '@/layouts/app-layout';
import { Product } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { PageProps } from '@inertiajs/inertia';

interface ProductShowProps extends PageProps {
    props: {
        products: Product;
    };
}
function ProductShowPage() {
    const { product   } = usePage<ProductShowProps>().props;
    return (
        <AppLayout breadcrumbs={PRODUCT_SHOW_BREADCRUMBS}>
            <Head title="Productos" />
            <section className='px-4 py-6'>
            <ProductForm product={product as Product} viewOnly={true} />
            </section>
        </AppLayout>
    );
}
export default ProductShowPage;