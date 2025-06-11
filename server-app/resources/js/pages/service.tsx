import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';
import type { BreadcrumbItem, ServiData } from '@/types';
import toast, { Toaster } from 'react-hot-toast';
import { CirclePlus } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Servicio',
        href: '/service',
    },
    {
        title: 'Listar',
        href: '/service',
    },

];
const appUrl = import.meta.env.VITE_APP_URL;
interface ServiDataProp {
    servis: ServiData[];
    notOrganization: boolean;
}
export default function Service({servis, notOrganization}: ServiDataProp){
    const [modal, setModal] = useState<boolean>(notOrganization);
    const [show, setShow] = useState<boolean>(false);
    const [serviceDelete, setServiceDelete] = useState<number>(0);
    const { post } = useForm({})
    // agregar alguna funcion a los botones para que no se haga submit dos veces
    const deleteServi = (id: number) => {
        post(`delete/service/${id}`, {
            onSuccess: (page) => {
                const message = (page.props as { flash?: { message?: string } }).flash?.message;
                if (message) {
                    toast.success(message);
                }
            },
        })
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Servicios" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="relative">
                    <button
                        type="button"
                        className="flex"
                        onClick={() => {
                            if(notOrganization === true){
                                toast.error('No tienes organizacion No puedes crear servicios')
                            } else {
                                router.visit('/create/service');
                            }
                        }}
                    >
                        <CirclePlus />
                        Agregar Servicio
                    </button>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                            <thead className="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-16 py-3">
                                        <span className="sr-only">Image</span>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Servicio
                                    </th>
                                    <th scope="col" className="px-6 py-3" >
                                        Cliente
                                    </th>
                                    <th>
                                        Producto
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Maestro nota
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Fecha Ingreso/Salida
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Estado Reaparacion
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
                                                        className="max-h-full w-16 max-w-full md:w-32"
                                                        alt="Servi File"
                                                    />
                                            ):
                                                (
                                                    <img
                                                        src={`${appUrl}/logo-img.png`}
                                                        className="max-h-full w-16 max-w-full md:w-32"
                                                        alt="Servi File"
                                                    />
                                                )}

                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{service.name}</td>
                                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                            <div className="ps-3">
                                                <div className="text-base font-semibold">{service.user.name}</div>
                                                <div className="font-normal text-gray-500">{service.user.phone}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                            {service.product.name}
                                            <div className="font-normal text-gray-500">
                                                {service.product.description}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">{service.master_note}</td>
                                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                            {new Date(service.created_at).toLocaleString('es-ES', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </td>
                                        <td className="px-6 py-4">
                                            {service.exit ? (
                                                <div className="flex items-center">
                                                    <div className="me-2 h-2.5 w-2.5 rounded-full bg-red-500"></div>
                                                    Entregada
                                                </div>
                                            ) : (
                                                <div className="flex items-center">
                                                    <div className="me-2 h-2.5 w-2.5 rounded-full bg-green-500"></div>
                                                    En curso
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    router.visit(`/manage/${service.id}/service`);
                                                }}
                                                className="me-2 mb-2 rounded-lg border border-blue-700 px-5 py-2.5 text-center text-sm font-medium text-blue-700 hover:bg-blue-800 hover:text-white focus:ring-4 focus:ring-blue-300 focus:outline-none dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
                                            >
                                                Gestionar
                                            </button>

                                            <button
                                                className="me-2 mb-2 rounded-lg border border-red-700 px-5 py-2.5 text-center text-sm font-medium text-red-700 hover:bg-red-800 hover:text-white focus:ring-4 focus:ring-red-300 focus:outline-none dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900"
                                                type="button"
                                                onClick={() => {
                                                    setShow(true)
                                                    setServiceDelete(service.id);
                                                }}
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Toaster />
                    {modal && (
                        <div className="fixed top-0 right-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50">
                            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-700">
                                <h3 className="mb-4 text-lg text-gray-800 dark:text-gray-200">
                                    Notamos que no tienes una organización, ¿deseas crear una?
                                </h3>
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => {
                                            router.visit('/create/organization');
                                        }}
                                        className="me-2 mb-2 rounded-lg border border-green-700 px-5 py-2.5 text-center text-sm font-medium text-green-700 hover:bg-green-800 hover:text-white focus:ring-4 focus:ring-green-300 focus:outline-none dark:border-green-500 dark:text-green-500 dark:hover:bg-green-600 dark:hover:text-white dark:focus:ring-green-800"
                                    >
                                        Ir a crear organización
                                    </button>
                                    <button
                                        onClick={() => setModal(false)}
                                        type="button"
                                        className="me-2 mb-2 rounded-lg border border-gray-800 px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white focus:ring-4 focus:ring-gray-300 focus:outline-none dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-800"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {show && (
                        <div className="fixed top-0 right-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50">
                            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-700">
                                <h3 className="mb-4 text-lg text-gray-800 dark:text-gray-200">
                                    ¿Deseas eliminar el servicio?
                                </h3>
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => {
                                            deleteServi(serviceDelete);
                                            setShow(false);
                                        }}
                                        className="me-2 mb-2 rounded-lg border border-red-700 px-5 py-2.5 text-center text-sm font-medium text-red-700 hover:bg-red-800 hover:text-white focus:ring-4 focus:ring-red-300 focus:outline-none dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900"
                                    >
                                       Si, Eliminar
                                    </button>
                                    <button
                                        onClick={() => setShow(false)}
                                        type="button"
                                        className="me-2 mb-2 rounded-lg border border-gray-800 px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white focus:ring-4 focus:ring-gray-300 focus:outline-none dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-800"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
