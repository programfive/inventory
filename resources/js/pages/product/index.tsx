import AppLayout from '@/layouts/app-layout';
import { Head, usePage, router } from '@inertiajs/react';
import { PageProps } from '@inertiajs/inertia';
import { Product } from '@/types';
import { DataTable } from '@/components/table/data-table';
import { columns } from '@/components/products/columns';
import { PRODUCT_COLUMN_TRANSLATIONS } from '@/constants/translations';
import { PRODUCT_INDEX_BREADCRUMBS } from '@/constants/breadcrumbs';
import { ExportDialog } from '@/components/dialogs/export-dialog';
import { useState } from 'react';

interface ProductIndexProps extends PageProps {
  products: Product[];
}

function ProductIndexPage() {
  const { products } = usePage<ProductIndexProps>().props;
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);

  const handleNewResource = () => {
    router.get('/administration/products/create');
  };

  const handleDeleteSelectedItems = (selectedItems: Product[]) => {
    const selectedIds = selectedItems.map(item => (item as any).id);
    router.delete('/administration/products/delete-selected', {
      data: { ids: selectedIds },
    });
  };

  const handleExport = (params:URLSearchParams) => {
    window.location.href = `/administration/reports/products?${params.toString()}`;
  };

  return (
    <AppLayout breadcrumbs={PRODUCT_INDEX_BREADCRUMBS}>
      <Head title="Productos" />
      <section className='px-4 py-6'>
      <DataTable
        data={products as Product[]}
        columns={columns}
        globalFilterColumn="name"
        dateColumn="created_at"
        translations={PRODUCT_COLUMN_TRANSLATIONS}
        onExport={handleExport}
        newResource={handleNewResource}
        onDeleteSelected={handleDeleteSelectedItems}
        />

      </section>
    </AppLayout>
  );
}

export default ProductIndexPage;