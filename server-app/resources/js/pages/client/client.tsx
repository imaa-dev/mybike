import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, User } from '@/types';
import { Head, router } from '@inertiajs/react';
import toast, { Toaster } from 'react-hot-toast';
import { useInitials } from '@/hooks/use-initials';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import ButtonAdd from '@/components/button-add';
import { useConfirmDialog } from '@/context/ModalContext';
import { deleteClient } from '@/api/clients/clientsService';
import { Pencil, Trash2 } from 'lucide-react';

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
    const getInitials = useInitials();
    const { showConfirm } = useConfirmDialog();
    const handleDelete = (clientId: number) => {
        showConfirm({
            title: "Deseas eliminar el cliente",
            onConfirm: () => removeClient(clientId)
        })
    }
    const removeClient = async (id: number) => {
        const response = await deleteClient(id);
        if (response.code === 200) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cliente" />
            <ButtonAdd route="/create/client" />
                    <div className="flex h-full flex-1 flex-col items-center gap-4 rounded-xl">
                        <div className="relative m-5 overflow-x-auto shadow-md sm:rounded-lg">
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
                                        <button
                                            type="button"
                                            className="p-2"
                                            onClick={() => router.visit(`/update/${client.id}/client`)}
                                        >
                                            <Pencil color={'#1d4ed8'} />
                                        </button>
                                        <button
                                            type="button"
                                            className="p-2"
                                            onClick={() => {
                                                handleDelete(client.id)
                                            }}
                                        >
                                            <Trash2 color={'#b91c1c'} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    </div>

            <Toaster />
        </AppLayout>
    )
}
