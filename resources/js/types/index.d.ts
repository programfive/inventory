import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}
export interface Flash {
    message: string;
    success?: string;
    error?: string;
    warning?: string;
    info?: string;
}
export interface Product {
    id: number;
    name: string;
    description: string | null;
    purchase_price: number | null;
    sale_price: number | null;
    is_excluded: boolean;
    created_at: string | Date;
    updated_at: string | Date;
}
