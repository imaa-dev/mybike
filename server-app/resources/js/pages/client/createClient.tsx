import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { FormEventHandler } from 'react';
import InputError from '@/components/input-error';
import { SidebarGroupLabel } from '@/components/ui/sidebar';
import 'react-phone-input-2/lib/style.css'
import ButtonBack from '@/components/button-back';
import InputPhone from '@/components/input-phone';
import { useToast } from '@/context/ToastContext';
import CreateClientForm from '@/components/forms/client/CreateClientForm';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cliente',
        href: '/client',
    },
    {
        title: 'Crear',
        href: '/',
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
