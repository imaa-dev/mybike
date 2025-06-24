import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import type { BreadcrumbItem, ServiData } from '@/types';
import toast, { Toaster } from 'react-hot-toast';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { deleteService } from '@/api/services/serviService';
import { useConfirmDialog } from '@/context/ModalContext';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Servicios',
        href: '/service',
    },
    {
        title: 'Recepcionados',
        href: '/service',
    },
];
const appUrl = import.meta.env.VITE_APP_URL;
interface ServiDataProp {
    servis: ServiData[];
}

export default function ListReceptionService ({servis}: ServiDataProp) {
    const { showConfirm } = useConfirmDialog()
    const handleDelete = (serviceId: number) => {
        showConfirm({
            title: "Deseas eliminar el servicio",
            onConfirm: () => removeService(serviceId)
        })
    }

    const removeService = async (id: number) => {
        const response = await deleteService(id)
        if (response.code === 200) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Servicios" />
            <div className="flex h-full flex-1 flex-col items-center gap-4 rounded-xl">
                <div className="relative m-5 overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                            <thead className="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-16 py-3">
                                    <span className="sr-only">Image</span>
                                </th>
                                <th scope="col" className="px-6 py-3" >
                                    Cliente
                                </th>
                                <th>
                                    Producto
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Detalles de ingreso
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Fecha Ingreso
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Estado
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Acciones
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {servis.map((service: ServiData, index: number) => (
                                <tr
                                    key={index}
                                    className="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                                >
                                    <td className="p-4">
                                        {service.file?.[0]?.path ? (
                                                <img
                                                    src={`${appUrl}/storage/${service.file?.[0]?.path}`}
                                                    className="max-h-full w-16 max-w-full md:w-32 rounded border"
                                                    alt="Servi File"
                                                />
                                            ):
                                            (
                                                <img
                                                    src={`${appUrl}/images/image.png`}
                                                    className="max-h-full w-16 max-w-full md:w-32 rounded border"
                                                    alt="Servi File"
                                                />
                                            )}

                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        <div className="ps-3">
                                            <div className="text-base font-semibold">{service.client.name}</div>
                                            <div className="font-normal text-gray-500">{service.client.phone}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {service.product.type}
                                        <div className="font-normal text-gray-500">
                                            {service.product.brand}{' '}{service.product.model}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {service.reasons.map((reason, index) => (
                                            <div className="p-1" key={index}>{reason.reason_note}</div>
                                        ))}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {new Date(service.date_entry).toLocaleString('es-ES', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="me-2 h-2.5 w-2.5 rounded-full bg-blue-500"></div>
                                            {service.status.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 items-center">
                                            <button
                                                type="button"
                                                className="p-2"
                                                onClick={() => {
                                                    router.visit(`/edit/${service.id}/service`)
                                                }}
                                            >
                                                <Pencil color={'#1d4ed8'} />
                                            </button>
                                            <button
                                                type="button"
                                                className="p-2"
                                                onClick={() => {
                                                    handleDelete(service.id)
                                                }}
                                            >
                                                <Trash2 color={'#b91c1c'} />
                                            </button>
                                            <button
                                                type="button"
                                                className="p-2"
                                                onClick={() => {
                                                    console.log('DIAGNOSTICAR SERVICIO')
                                                }}
                                            >
                                                <Eye color={'#0f766e'} />
                                            </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <Toaster />
                </div>
        </AppLayout>
    );
}
