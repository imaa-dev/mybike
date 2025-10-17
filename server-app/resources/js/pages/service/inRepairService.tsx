import React from "react";
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from "@/types";
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Servicios',
        href: '/service',
    },
    {
        title:  <div className="flex">En Reparación<div className="ml-3 mt-1 h-2.5 w-2.5 rounded-full bg-red-500"> </div></div>,
        href: '/service',
    },
];
export default function InRepairService(){
    return (
        <AppLayout breadcrumbs={breadcrumbs} >
            <Head title="Servicios"/>
            <div>
                <h2>
                    EN REPARACIÓN
                </h2>
            </div>
        </AppLayout>
    )
}
