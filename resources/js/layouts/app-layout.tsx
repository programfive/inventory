import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import {Flash, Product, type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { type ReactNode } from 'react';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { PageProps } from '@inertiajs/inertia';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

interface AppLayoutPageProps extends PageProps {
    props: {
        flash?: Flash;
    };
}
export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    const { flash } = usePage<AppLayoutPageProps>().props as unknown as { flash: Flash };
    useEffect(() => {
        if (flash) {
            if (flash.success) toast.success(flash.success);
            if (flash.error) toast.error(flash.error);
            if (flash.warning) toast.warning(flash.warning);
            if (flash.info) toast.info(flash.info);
        }
    }, [flash]);
    return (
        (
            <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
                {children}
            </AppLayoutTemplate>
        )
    )
}
