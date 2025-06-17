import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { BreadcrumbItem, OrganizationData } from '@/types';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { CirclePlus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Organización',
        href: '/list/organization',
    }
];
interface OrganizationDataProp {
    organization:  OrganizationData;
}
const appUrl = import.meta.env.VITE_APP_URL;
export default function Organization({ organization }: OrganizationDataProp) {
    console.log(organization, appUrl);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Organizacion" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

            </div>
        </AppLayout>
    );
}
