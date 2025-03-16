import { ProductForm } from '@/components/products/product-form';
import { PRODUCT_EDIT_BREADCRUMBS } from '@/constants/breadcrumbs';
import AppLayout from '@/layouts/app-layout';
import { Product } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { PageProps } from '@inertiajs/inertia';

interface ProductEditProps extends PageProps {
    props: {
        products: Product;
    };
}
function ProductEditPage() {
    const { product   } = usePage<ProductEditProps>().props;
    return (
        <AppLayout breadcrumbs={PRODUCT_EDIT_BREADCRUMBS}>
            <Head title="Productos" />
            <section className='px-4 py-6'>
                <ProductForm isEditing product={product as Product}/>
            </section>
        </AppLayout>
    );
}
export default ProductEditPage;