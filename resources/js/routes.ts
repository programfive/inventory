import {
    Home,
    ShoppingCart,
    BadgeDollarSign,
    Users,
    ClipboardX,
    ClipboardList,
    Box,
    Key
} from 'lucide-react'; 
import { NavItem } from '@/types';

export const HOME_NAVIGATION: NavItem[] = [
    {
        title: 'Inicio',
        url: '/dashboard',
        icon: Home, 
    },
];

export const ADMINISTRATION_NAVIGATION: NavItem[] = [
    {
        title: 'Productos',
        url: '/administration/products',
        icon: Box, 
    },
    {
        title: 'Distribuidores',
        url: '/administration/suppliers',
        icon: Users,
    },
    {
        title: 'Desechos',
        url: '/administration/waste',
        icon: ClipboardX, 
    },
    {
        title: 'Compras',
        url: '/administration/purchases',
        icon: BadgeDollarSign, 
    },
    {
        title: 'Ventas',
        url: '/administration/sales',
        icon: ShoppingCart, 
    },
];

export const REPORTS_NAVIGATION: NavItem[] = [
    {
        title: 'Inventario',
        url: '/reports/inventories',
        icon: ClipboardList,
    },
    {
        title: 'Compras',
        url: '/reports/purchases',
        icon: BadgeDollarSign, 
    },
    {
        title: 'Ventas',
        url: '/reports/sales',
        icon: ShoppingCart, 
    },
];

export const ACCESS_LEVELS_NAVIGATION: NavItem[] = [
    {
        title: 'Roles',
        url: '/access-levels/roles',
        icon: Users,
    },
    {
        title: 'Permisos',
        url: '/access-levels/permissions',
        icon: Key, 
    },
];
