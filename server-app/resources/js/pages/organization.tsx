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
    },
    {
        title: 'Listar',
        href: '/list/organization',
    }
];
interface OrganizationDataProp {
    organizations:  OrganizationData[];
}
const appUrl = import.meta.env.VITE_APP_URL;
export default function Organization({ organizations }: OrganizationDataProp) {
    const [organizationDrop, setOrganizationDrop] = useState<number>(0);
    const [modal, setModal] = useState<boolean>(false);
    const { post } = useForm({});

    const eliminar = (id: number) => {
        post(`/organization/delete/${id}`, {
            onSuccess: (page) => {
                const message = (page.props as { flash?: { message?: string } }).flash?.message;
                if (message) {
                    toast.success(message);
                }
            },
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Organizacion" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="relative">
                    <button type="button" className="flex" onClick={() => router.visit('/create/organization')}  >
                        <CirclePlus />
                        Agregar Organización
                    </button>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                        <thead
                            className="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input
                                        id="checkbox-all-search"
                                        type="checkbox"
                                        className="h-4 w-4 rounded-sm border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                                    />
                                    <label htmlFor="checkbox-all-search" className="sr-only">
                                        checkbox
                                    </label>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Organizacion
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Activa
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Acciones
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {organizations.map((organization: OrganizationData, index: number) => (
                            <tr
                                key={index}
                                className="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                            >
                                <td key={index} className="w-4 p-4">
                                    <div key={index} className="flex items-center">
                                        <input
                                            id="checkbox-table-search-1"
                                            type="checkbox"
                                            className="h-4 w-4 rounded-sm border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                                        />
                                        <label htmlFor="checkbox-table-search-1" className="sr-only">
                                            checkbox
                                        </label>
                                    </div>
                                </td>
                                <th scope="row"
                                    className="flex items-center px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                                    {organization.file && organization.file.path ? (
                                        <img
                                            className="h-10 w-10 rounded-full"
                                            src={`${appUrl}/storage/${organization.file?.path}`}
                                            alt="logo image"
                                        />
                                    ) :
                                        <img
                                            className="h-10 w-10 rounded-full"
                                            src={`${appUrl}/logo-img.png`}
                                            alt="logo image"
                                        />
                                    }
                                    <div className="ps-3">
                                        <div className="text-base font-semibold">{organization.name}</div>
                                        <div className="font-normal text-gray-500">{organization.description}</div>
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    {organization.active ? (
                                        <div className="flex items-center">
                                            <div className="me-2 h-2.5 w-2.5 rounded-full bg-green-500"></div>
                                            Activa
                                        </div>
                                    ) : (
                                        <div className="flex items-center">
                                            <div className="me-2 h-2.5 w-2.5 rounded-full bg-red-500"></div>
                                            Inactiva
                                        </div>
                                    )}
                                </th>

                                <td className="px-6 py-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            router.visit(`/organization/${organization.id}/edit`);
                                        }}
                                        className="me-2 mb-2 rounded-lg border border-blue-700 px-5 py-2.5 text-center text-sm font-medium text-blue-700 hover:bg-blue-800 hover:text-white focus:ring-4 focus:ring-blue-300 focus:outline-none dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
                                    >
                                        Editar
                                    </button>

                                    <button
                                        className="me-2 mb-2 rounded-lg border border-red-700 px-5 py-2.5 text-center text-sm font-medium text-red-700 hover:bg-red-800 hover:text-white focus:ring-4 focus:ring-red-300 focus:outline-none dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900"
                                        type="button"
                                        onClick={() => {
                                            setOrganizationDrop(organization.id);
                                            setModal(true);
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
                </div>
                {modal && (
                    <div
                        className="fixed top-0 right-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50">
                        <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-700">
                            <h3 className="mb-4 text-lg text-gray-800 dark:text-gray-200">¿Realmente quieres eliminar la
                                organización?</h3>
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => {
                                        if (organizationDrop !== null) eliminar(organizationDrop);
                                        setModal(false);
                                    }}
                                    className="me-2 mb-2 rounded-lg border border-red-700 px-5 py-2.5 text-center text-sm font-medium text-red-700 hover:bg-red-800 hover:text-white focus:ring-4 focus:ring-red-300 focus:outline-none dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900"
                                >
                                    Sí, eliminar
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
                <Toaster />
            </div>
        </AppLayout>
    );
}
