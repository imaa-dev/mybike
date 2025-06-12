import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, User } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import toast, { Toaster } from 'react-hot-toast';
import { CirclePlus } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cliente',
        href: '/client'
    },
    {
        title: 'Listar',
        href: '/client'
    },
];


interface ClientDataProp {
    clients: User[]
}
const appUrl = import.meta.env.VITE_APP_URL;
export default function Client({clients}: ClientDataProp){
    const [dropData, setDropData] = useState<number | null>(null)
    const [modal, setModal] = useState<boolean>(false);

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
                <div className="relative">
                    <button type="button" className="flex" onClick={() => router.visit('/create/client')}  >
                        <CirclePlus />
                        Agregar Cliente
                    </button>
                </div>
                <div
                    className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead
                                className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>

                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    phone
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {clients.map((client: User, index: number)=> (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">

                                    <th scope="row"
                                        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        { client.file && client.file.path ?
                                            <img className="w-10 h-10 rounded-full"
                                                 src={`${appUrl}/storage/${client.file?.path}`} alt="AvatarImage" />
                                            :
                                            <img className="w-10 h-10 rounded-full"
                                                 src={`${appUrl}/logo-img.png`} alt="DefaultAvatarImage" />
                                        }
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
        </AppLayout>
    )
}
