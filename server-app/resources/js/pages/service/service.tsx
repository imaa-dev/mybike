import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import toast from 'react-hot-toast';
import { FileBox, FilePlus2, List, Truck, Wrench, ConciergeBell } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useModal } from '@/context/ModalContextForm';
import { AskContent } from '@/components/ask-content';

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
    const [modal] = useState<boolean>(notOrganization);
    const { openModal } = useModal();

    useEffect(() => {
        if(modal){
            openModal( <AskContent></AskContent> )
        }
    }, [modal])

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
            </div>
            </div>
        </AppLayout>
    );
}
