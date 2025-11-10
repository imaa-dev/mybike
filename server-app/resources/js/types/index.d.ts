import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}
export interface BreadcrumbItem {
    title: string | JSX.Element;
    href: string;
}
export interface ButtonItem {
    title: string;
    href: string;
}
export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    handleDelete?: () => void;
}
export interface NavItemDrop {
    title: string;
    icon: LucideIcon;
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
    created_by_user_id?: number;
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
    type: string
}
export interface Client{
    id: number;
    name: string;
    email: string;
    phone: string;
}
export interface Page {
    props: {
        organization: {
            id: number,
        }
    };
}

export interface DiagnosisPage {
    props: {
        products: ProductData;
        clients: User;
    }
}
export interface ClientDataProp {
    clients: Client[];
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
    created_at: Date;
    updated_at: Date;
}

export interface SparePartsData {
    id: number;
    servi_id: number;
    user_id: number;
    model: string;
    brand: string;
    price: number;
    note: string;
    created_at: Date;
    updated_at: Date;
}
export interface ServiForm {
    id: number;
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

