import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import ButtonBack from '@/components/button-back';
import { CreateClientForm } from '@/components/forms/client/CreateClientForm';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cliente',
        href: '/user-client',
    },
    {
        title: 'Crear',
        href: '/user-client',
    },

];

export default function CreateClient() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clientes" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <ButtonBack />
            <div className="flex h-full flex-1 flex-col items-center gap-4 rounded-xl">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <CreateClientForm />
                </div>
            </div>
            </div>
        </AppLayout>
    )
}
