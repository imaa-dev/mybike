import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, User } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { useInitials } from '@/hooks/use-initials';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import ButtonAdd from '@/components/button-add';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Clientes',
        href: '/client'
    },
];


interface ClientDataProp {
    clients: User[]
}

export default function Client({clients}: ClientDataProp){
    const [dropData, setDropData] = useState<number | null>(null)
    const [modal, setModal] = useState<boolean>(false);
    const getInitials = useInitials();
    const { post } = useForm({});
    const deleteClient = (id: number) => {
        post(`/delete/client/${id}`, {
            onSuccess: (page) => {
                const message = (page.props as { flash?: { message?: string } }).flash?.message;
                if (message) {
                    toast.success(message);
                }
            }
        })
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cliente" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <ButtonAdd route="/create/client" />
                <div className="flex h-full flex-1 flex-col items-center  gap-4 rounded-xl">
                    <div className="w-full overflow-x-auto">
                    <div className="min-w-[600px] relative shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead
                                className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Nombre
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Celular
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Accion
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {clients.map((client: User, index: number)=> (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">

                                    <th scope="row"
                                        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <Avatar className="h-8 w-8 overflow-hidden rounded-full">

                                            <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                                {getInitials(client.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="ps-3">
                                            <div className="text-base font-semibold">{client.name}</div>
                                            <div className="font-normal text-gray-500">{client.email}</div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">
                                        {client.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {client.phone ? client.phone : 'Celular sin ingresar' }
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="me-2 mb-2 rounded-lg border border-blue-700 px-5 py-2.5 text-center text-sm font-medium text-blue-700 hover:bg-blue-800 hover:text-white focus:ring-4 focus:ring-blue-300 focus:outline-none dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
                                            onClick={() => router.visit(`/update/${client.id}/client`)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="me-2 mb-2 rounded-lg border border-red-700 px-5 py-2.5 text-center text-sm font-medium text-red-700 hover:bg-red-800 hover:text-white focus:ring-4 focus:ring-red-300 focus:outline-none dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900"
                                            type="button"
                                            onClick={() => {
                                                setDropData(client.id)
                                                setModal(true)
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
                </div>
            <Toaster />
            {modal && (
                <div
                    className="fixed top-0 right-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50">
                    <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-700">
                        <h3 className="mb-4 text-lg text-gray-800 dark:text-gray-200">¿Realmente quieres eliminar el cliente?</h3>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => {
                                    if (dropData !== null) deleteClient(dropData);
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
            </div>
        </AppLayout>
    )
}
