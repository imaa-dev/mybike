import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import toast, { Toaster } from 'react-hot-toast';
import {  FileBox, FilePlus2, List, Truck, Wrench, ConciergeBell } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Servicios',
        href: '/service',
    },
];
interface ServiDataProp {
    notOrganization: boolean;
    countTypeService: CountTypeService;
}
interface CountTypeService {
    serviceRecepcionado: number,
    serviceDiagnosticado: number,
    serviceAR: number,
    serviceER: number,
    serviceReparad: number,
    serviceEntregado: number,
    serviceIncidencia: number
}
export default function Service({ notOrganization, countTypeService }: ServiDataProp){
    const [modal, setModal] = useState<boolean>(notOrganization);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Servicios" />
            <div className="flex h-full flex-1 flex-col items-center gap-4 rounded-xl">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                <div className="flex p-5 " >
                    <div className="relative">
                        <button
                            type="button"
                            className="flex"
                            onClick={() => {
                                if(notOrganization){
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
                                if(notOrganization){
                                    toast.error('No tienes organización No puedes crear servicios')
                                } else {
                                    router.visit('/list-reception/service');
                                }
                            }}
                        >
                            <ConciergeBell />
                            {countTypeService.serviceRecepcionado > 0 && (
                            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center rounded-full bg-blue-500 px-1.5 py-0.5 text-xs font-bold text-white">
                                {countTypeService.serviceRecepcionado}
                            </span>
                            )}
                        </button>
                    </div>
                    <div className="relative ml-7">
                        <button
                            type="button"
                            className="flex"
                            onClick={() => {
                                if(notOrganization){
                                    toast.error('No tienes organización No puedes crear servicios')
                                } else {
                                    router.visit('/list-in-repair/service');
                                }
                            }}
                        >
                            <Wrench />
                            {countTypeService.serviceDiagnosticado > 0 && (
                                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center rounded-full bg-red-600 px-1.5 py-0.5 text-xs font-bold text-white">
                              {countTypeService.serviceDiagnosticado}
                            </span>
                            )}
                        </button>
                    </div>
                    <div className="relative ml-7">
                        <button
                            type="button"
                            className="flex"
                            onClick={() => {
                                if(notOrganization){
                                    toast.error('No tienes organización No puedes crear servicios')
                                } else {
                                    router.visit('/create/service');
                                }
                            }}
                        >
                            <Truck />
                            {countTypeService.serviceAR > 0 && (
                                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center rounded-full bg-red-600 px-1.5 py-0.5 text-xs font-bold text-white">
                              {countTypeService.serviceAR}
                            </span>
                            )}
                        </button>

                    </div>

                    <div className="relative ml-7">
                        <button
                            type="button"
                            className="flex"
                            onClick={() => {
                                if(notOrganization){
                                    toast.error('No tienes organización No puedes listar servicios')
                                } else {
                                    router.visit('/list-repair/service');
                                }
                            }}
                        >
                            <List />
                            {countTypeService.serviceER > 0 && (
                                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center rounded-full bg-red-600 px-1.5 py-0.5 text-xs font-bold text-white">
                              {countTypeService.serviceER}
                            </span>
                            )}
                        </button>
                    </div>
                    <div className="relative ml-7">
                        <button
                            type="button"
                            className="flex"
                            onClick={() => {
                                if(notOrganization){
                                    toast.error('No tienes organización No puedes listar servicios')
                                } else {
                                    router.visit('/list-repair/service');
                                }
                            }}
                        >
                            <FileBox />
                            {countTypeService.serviceReparad > 0 && (
                                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center rounded-full bg-red-600 px-1.5 py-0.5 text-xs font-bold text-white">
                              {countTypeService.serviceReparad}
                            </span>
                            )}
                        </button>
                    </div>
                </div>
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
            </div>
        </AppLayout>
    );
}
