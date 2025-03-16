import { BreadcrumbItem } from "@/types";

export const PRODUCT_INDEX_BREADCRUMBS: BreadcrumbItem[] = [
    {
        title: 'Productos',
        href: '/administration/products',
    },
];
export const PRODUCT_CREATE_BREADCRUMBS:BreadcrumbItem[] = [
    {
        title: 'Productos',
        href: '/administration/products',
    },
    {
        title:'Crear',
        href: '/administration/products/create',
    }
]
export const PRODUCT_EDIT_BREADCRUMBS:BreadcrumbItem[] = [
    {
        title: 'Productos',
        href: '/administration/products',
    },
    {
        title:'Editar',
        href: '/administration/products/edit',
    }
]
export const PRODUCT_SHOW_BREADCRUMBS:BreadcrumbItem[] = [
    {
        title: 'Productos',
        href: '/administration/products',
    },
    {
        title:'Mostrar',
        href: '/administration/products/show',
    }
]