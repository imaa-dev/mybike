import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import type { BreadcrumbItem, ServiData } from '@/types';
import { Toaster } from 'react-hot-toast';
import { CirclePlus } from 'lucide-react';

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

interface ServiDataProp {
    servis: ServiData[];
}
const appUrl = import.meta.env.VITE_APP_URL;
export default function Service({servis}: ServiDataProp){
    console.log(appUrl, servis[0].file[0].path);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Servicios" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="relative">
                    <button type="button" className="flex" onClick={() => router.visit('/create/service')}>
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
                                {servis.map((servi: ServiData, index: number) => (

                                    <tr
                                        key={index}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    >
                                        <td className="p-4">
                                            <img
                                                src={`${appUrl}/storage/${servi.file?.[0].path}`}
                                                className="max-h-full w-16 max-w-full md:w-32"
                                                alt="Servi File"
                                            />
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{servi.name}</td>
                                        <td className="px-6 py-4">{servi.master_note}</td>
                                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                            {new Date(servi.created_at).toLocaleString('es-ES', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </td>
                                        <td className="px-6 py-4">
                                            {servi.exit ? (
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
                                                    router.visit(`/update/${servi.id}/service`);
                                                }}
                                                className="me-2 mb-2 rounded-lg border border-blue-700 px-5 py-2.5 text-center text-sm font-medium text-blue-700 hover:bg-blue-800 hover:text-white focus:ring-4 focus:ring-blue-300 focus:outline-none dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
                                            >
                                                Editar
                                            </button>

                                            <button
                                                className="me-2 mb-2 rounded-lg border border-red-700 px-5 py-2.5 text-center text-sm font-medium text-red-700 hover:bg-red-800 hover:text-white focus:ring-4 focus:ring-red-300 focus:outline-none dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900"
                                                type="button"
                                                onClick={() => {
                                                    console.log('ELIMINAR');
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
                </div>
            </div>
        </AppLayout>
    );
}
