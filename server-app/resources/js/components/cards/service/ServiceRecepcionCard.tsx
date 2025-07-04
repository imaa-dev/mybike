import React from 'react';
import { NavItemDrop, ServiData } from '@/types';
import { SidebarGroupLabel } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { appUrl } from '@/config/env';
import { BriefcaseMedical,  Pencil, Trash2 } from 'lucide-react';

import { NavDropDown } from '@/components/cards/service/NavDropDown';
interface ServiceDataPropCard {
    service: ServiData,
    handleDelete: () => void
}
const mainNavItems: NavItemDrop[] = [
    {
        title: 'Editar',
        icon: Pencil,
    },
    {
        title: 'Diagnosticar',
        icon: BriefcaseMedical,
    },
    {
        title: 'Eliminar',
        icon: Trash2,
    },
];
const ServiceRecepcionCard = ({ service, handleDelete }: ServiceDataPropCard ) => {
    const dropdownId = `dropdown-${service.id}`;
    const buttonId = `dropdownButton-${service.id}`;
    const getInitials = useInitials()

    return (
        <div>
            <div className="flex justify-end px-4 pt-2 ">
                <button id={`${buttonId}`} data-dropdown-toggle={`${dropdownId}`}
                        className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                        type="button">
                    <span className="sr-only">Open dropdown</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                         viewBox="0 0 16 3">
                        <path
                            d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                    </svg>
                </button>
                <div id={`${dropdownId}`}
                     className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                    <ul className="py-2" aria-labelledby="dropdownButton">
                        <NavDropDown items={mainNavItems} serviceId={service.id} handleDelete={handleDelete}/>
                    </ul>
                </div>
            </div>
            <a href="#"
               className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 ">
                {service.file?.[0]?.path ? (
                        <img
                            src={`${appUrl}/storage/${service.file?.[0]?.path}`}
                            className="max-h-full w-full max-w-full md:w-80 rounded border"
                            alt="Servi File"
                        />
                    ):
                    (
                        <img
                            src={`${appUrl}/images/image.png`}
                            className="max-h-full w-full max-w-full md:w-80 rounded border"
                            alt="Servi File"
                        />
                    )}
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <SidebarGroupLabel> Datos del servicio </SidebarGroupLabel>
                    <div className="flex pt-3">
                        <SidebarGroupLabel> CLIENTE: </SidebarGroupLabel>
                        <Avatar className="h-8 w-8 overflow-hidden rounded-full ms-3 ">
                            <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                {getInitials(service.client.name)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="ps-3 flex-col">

                            <div className="text-base font-semibold">{service.client.name}</div>
                            <div className="font-normal text-gray-500">{service.client.email}</div>
                        </div>
                    </div>

                    <div className="flex pt-3">
                        <SidebarGroupLabel> PRODUCTO: </SidebarGroupLabel>
                        <div className="ps-3 flex-col">
                            <div className="text-base font-semibold">{service.product.type}</div>
                            <div className="text-base font-semibold">{service.product.brand}</div>
                            <div className="font-normal text-gray-500">{service.product.model}</div>
                        </div>
                    </div>
                    <div className="flex" >
                        <SidebarGroupLabel > DETALLES DE INGRESO: </SidebarGroupLabel>
                        {service.reasons.map((reason) => (
                            <div className="p-1">{reason.reason_note} <br /></div>
                        ))}
                    </div>
                    <div className="flex pt-3" >
                        <SidebarGroupLabel> FECHA: </SidebarGroupLabel>
                        <div className="ps-3 mt-1 flex-col" >
                            {new Date(service.date_entry).toLocaleString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </div>
                    </div>
                </div>
            </a>
        </div>
    )
}

export { ServiceRecepcionCard }
