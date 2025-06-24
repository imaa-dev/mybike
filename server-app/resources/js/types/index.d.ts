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
    file: FileMeta | null;
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
    brand: string,
    model: string,
    type: string,
    file: FileMeta[]
}
export interface Client{
    id: number;
    name: string;
    email: string;
    phone: string;
    file: FileMeta | null;
    [key: string]: unknown;
}
export interface Page {
    props: {
        organization: {
            id: number,
        }
    };
}
export interface ClientDataProp {
    clients: User[];
}
export interface ProductDataProp {
    products: ProductData[];
}
export interface ServiDataForm {
    organization_id: number;
    product_id: number;
    client_id: number;
    date_entry: string;
    file: File[] | null;
    reason_notes: { reason_note: string }[];
}
export interface Reasons{
    id: number;
    servi_id: number;
    reason_note: string;
    created_at: string;
    updated_at: string;
}
export interface Status {
    id: number;
    name: string;
}
export interface ServiData {
    id: number;
    client_id: number;
    product_id: number;
    organization_id: number;
    status_id: number;
    date_entry: string;
    date_exit: string;
    satisfied: number;
    reasons: Reasons[];
    file: FileMeta[];
    product: ProductData;
    client: Client;
    status: Status;
    created_at: Date;
    updated_at: Date;
}
export interface ServiForm {
    organization_id: number;
    product_id: number;
    client_id: number;
    date_entry: string;
}

export interface FileResponse {
    code: number;
    message: string;
    success: boolean;
    file: FileMeta[];
}
export interface ReasonResponse {
    code: number;
    message: string;
    success: boolean;
    reasons: Reasons[];
}
