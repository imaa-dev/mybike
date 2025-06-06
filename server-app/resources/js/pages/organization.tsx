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
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl">
                <div className="relative m-5 overflow-x-auto shadow-md sm:rounded-lg">
                    <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
                        <div>
                            <button id="dropdownActionButton" data-dropdown-toggle="dropdownAction"
                                    className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                    type="button">
                                <span className="sr-only">Action button</span>
                                Action
                                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path  d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <div id="dropdownAction"
                                 className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600">
                                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="dropdownActionButton">
                                    <li>
                                        <a href="#"
                                           className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reward</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                           className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Promote</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                           className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Activate
                                            account</a>
                                    </li>
                                </ul>
                                <div className="py-1">
                                    <a href="#"
                                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete
                                        User</a>
                                </div>

                            </div>
                        </div>
                        <div className="relative">
                            <button type="button" className="flex" onClick={() => router.visit('/create/organization')}  >
                                <CirclePlus />
                                Agregar Organización
                            </button>
                        </div>
                        <label htmlFor="table-search" className="sr-only">Search</label>
                        <div className="relative">
                            <div
                                className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="text" id="table-search-users"
                                   className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="Search for users" />
                        </div>

                    </div>



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
                                    {organization.file && (
                                        <img
                                            className="h-10 w-10 rounded-full"
                                            src={`http://localhost:8000/storage/${organization.file.path}`}
                                            alt="logo image"
                                        />
                                    )}
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
