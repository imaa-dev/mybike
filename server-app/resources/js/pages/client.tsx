import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, User } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Toaster } from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cliente',
        href: '/client'
    },
    {
        title: 'Listar',
        href: '/client'
    },
];


interface ClientDataProp {
    clients: User
}

export default function Client({clients}: ClientDataProp){
    console.log(clients);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cliente" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <button
                        type="button"
                        onClick={() => router.visit('/create/client')}
                    >
                        Crear Cliente
                    </button>
                </div>
            </div>
            <Toaster />
        </AppLayout>
    )
}
