import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';
import type { BreadcrumbItem, ServiData } from '@/types';
import toast, { Toaster } from 'react-hot-toast';
import { CirclePlus, FileBox, FilePlus2, List, Truck, Wrench } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Servicios',
        href: '/service',
    },
];
const appUrl = import.meta.env.VITE_APP_URL;
interface ServiDataProp {
    servis: ServiData[];
    notOrganization: boolean;
}
export default function Service({servis, notOrganization}: ServiDataProp){
    console.log(servis)
    const [modal, setModal] = useState<boolean>(notOrganization);
    const [show, setShow] = useState<boolean>(false);
    const [serviceDelete, setServiceDelete] = useState<number>(0);
    const { post } = useForm({})

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
                <div className="flex p-5" >
                    <div className="relative ml-7">
                        <button
                            type="button"
                            className="flex"
                            onClick={() => {
                                if(notOrganization === true){
                                    toast.error('No tienes organización No puedes crear servicios')
                                } else {
                                    router.visit('/create/service');
                                }
                            }}
                        >
                            <FilePlus2 />

                        </button>
                    </div>
                    <div className="relative ml-7">
                        <button
                            type="button"
                            className="flex"
                            onClick={() => {
                                if(notOrganization === true){
                                    toast.error('No tienes organización No puedes crear servicios')
                                } else {
                                    router.visit('/create/service');
                                }
                            }}
                        >
                            <Wrench />

                        </button>
                    </div>
                    <div className="relative ml-7">
                        <button
                            type="button"
                            className="flex"
                            onClick={() => {
                                if(notOrganization === true){
                                    toast.error('No tienes organización No puedes crear servicios')
                                } else {
                                    router.visit('/create/service');
                                }
                            }}
                        >
                            <Truck />

                        </button>
                    </div>

                    <div className="relative ml-7">
                        <button
                            type="button"
                            className="flex"
                            onClick={() => {
                                if(notOrganization === true){
                                    toast.error('No tienes organización No puedes listar servicios')
                                } else {
                                    router.visit('/list-repair/service');
                                }
                            }}
                        >
                            <List />

                        </button>
                    </div>
                    <div className="relative ml-7">
                        <button
                            type="button"
                            className="flex"
                            onClick={() => {
                                if(notOrganization === true){
                                    toast.error('No tienes organización No puedes listar servicios')
                                } else {
                                    router.visit('/list-repair/service');
                                }
                            }}
                        >
                            <FileBox />
                        </button>
                    </div>
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

            </div>
        </AppLayout>
    );
}
