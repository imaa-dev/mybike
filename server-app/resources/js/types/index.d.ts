import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface ButtonItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    file?: FileMeta | null;
    [key: string]: unknown; // This allows for additional properties...
}
export interface FileMeta {
    id: number;
    fileable_id: number;
    fileable_type: string;
    path: string | null;
    created_at: string;
    updated_at: string;
}

export interface OrganizationData {
    id: number;
    user_id: number;
    file: FileMeta;
    name: string;
    description: string;
    active: number;
    phone: string;
    address: string;
    email: string;
    city: string;
    state: string;
    postal_code: string;
    website: string;
    created_at: string;
    updated_at: string;
}
export interface ProductData {
    id: number;
    product_type_id: number,
    brand: string,
    model: string,
    type: ProductTypeData,
    file: FileMeta[]
}
export interface ProductTypeData {
    id: number;
    name: string;
}
export interface Client{
    id: number;
    name: string;
    email: string;
    phone: string;
    file: FileMeta | null;
    [key: string]: unknown;
}
export interface ServiData {
    id: number;
    client_id: number;
    product_id: number;
    organization_id: number;
    name: string;
    master_note: string;
    note_exit: string;
    price: number;
    exit: Date;
    file: FileMeta[];
    satisfied: string;
    product: ProductData;
    client: Client;
    status: string;
    created_at: Date;
    updated_at: Date;
}


