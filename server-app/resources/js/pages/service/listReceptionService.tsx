import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import  { BreadcrumbItem, ServiData } from '@/types';
import { deleteService } from '@/api/services/serviService';
import { useConfirmDialog } from '@/context/ModalContext';
import React, { useEffect, useState } from 'react';
import { useToast } from '@/context/ToastContext';
import { ServiceCard } from '@/components/cards/service/ServiceCard';
import { initFlowbite } from 'flowbite';
import { useLoading } from '@/context/LoadingContext';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Servicios',
        href: '/service',
    },
    {
        title:  <div className="flex">Recepcionados<div className="ml-3 mt-1 h-2.5 w-2.5 rounded-full bg-blue-500"> </div></div>,
        href: '/service',
    },
];
interface ServiDataProp {
    servis: ServiData[];
}

export default function ListReceptionService ({servis}: ServiDataProp) {
    const { success, error } = useToast()
    const [serviceShow, setServiceShow] = useState(servis)
    const { showConfirm } = useConfirmDialog()
    const { showLoading, hideLoading } = useLoading()
    const handleDelete = (serviceId: number) => {
        showConfirm({
            title: "Deseas eliminar el servicio",
            onConfirm: () => removeService(serviceId)
        })
    }

    useEffect(() => {
        initFlowbite()
    }, []);

    const removeService = async (id: number) => {
        showLoading()
        const response = await deleteService(id)
        if (response.code === 200) {
            success(response.message);
            setServiceShow(prev => prev.filter(ser => ser.id !== id))
        } else {
            error(response.message);
        }
        hideLoading()
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Servicios" />
            <div className="flex h-full flex-1 flex-col items-center gap-4 px-4 sm:px-5">
                <div className="w-full max-w-full rounded-lg border shadow-md">
                    { serviceShow.map((service: ServiData) => (
                        <ServiceCard key={service.id} service={service} handleDelete={() => handleDelete(service.id)} />
                    )) }
                </div>
            </div>
        </AppLayout>
    );
}
