import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { FormEventHandler } from 'react';
import ButtonTop from '@/components/button-top';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Producto',
        href: '/produc',
    },
    {
        title: 'Listado ',
        href: '/produc',
    },

];

type CreateProductForm = {
    name: string,
    description: string,
    brand: string,
    model: string,
    file?: File[],
};

const buttonItems : [] = [
    {
        name: 'Crear',
        href: '/create/product',
    },
    {
        name: 'Listar',
        href: '/product',
    }
]

export default function Product(){

    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Productos" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <ButtonTop items={buttonItems} />
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    Listado de productos
                </div>
            </div>
        </AppLayout>
    )
}
