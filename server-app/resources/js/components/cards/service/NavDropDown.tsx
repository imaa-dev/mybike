import { type NavItemDrop, ServiData } from '@/types';
import { router } from '@inertiajs/react';
import { useModal } from '@/context/ModalContextForm';
import { ToRepairForm } from '@/components/forms/service/ToRepairForm';
import { CreateDiagnosisForm } from '@/components/forms/service/CreateDiagnosisForm';


export function NavDropDown({ items = [], service, handleDelete }: { items: NavItemDrop[] } & { service: ServiData } & {handleDelete: (id: number) => void}  ) {
    const { openModal } = useModal();
    return (
        <>
            {items.map((item) => {
                if (service.status_id !== 1 && item.title === 'A Reparar') return null;
                if (service.status_id !== 4 && item.title === 'A Diagnosticar') return null;

                return(
                    <li key={item.title}>
                        <a
                            onClick={(e) => {
                                e.preventDefault();
                                if(item.title === 'Eliminar'){
                                    handleDelete(service.id)
                                }
                                if(item.title === 'Editar') {
                                    router.visit(`/edit/${service.id}/service`)
                                }
                                if(item.title === 'A Reparar'){
                                    openModal( <ToRepairForm serviceId={service.id} /> )
                                }
                                if(item.title === 'A Diagnosticar'){
                                    openModal( <CreateDiagnosisForm  /> )
                                }

                            }}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                        >
                            <item.icon className="h-4 w-4" />
                            {item.title}
                        </a>
                    </li>
                )
            })}
        </>
    );
}
