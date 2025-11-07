import { type NavItemDrop, ServiData } from '@/types';
import { router } from '@inertiajs/react';
import { useModal } from '@/context/ModalContextForm';
import { CreateDiagnosisForm } from '@/components/forms/service/CreateDiagnosisForm';

export function NavDropDown({ items = [], service, handleDelete }: { items: NavItemDrop[] } & { service: ServiData } & {handleDelete: (id: number) => void}  ) {
    const { openModal } = useModal();
    console.log(service.status_id)
    return (
        <>
            {items.map((item) => {
                if (service.status_id !== 2 && item.title === 'Diagnosticar') return null;
                if (service.status_id === 2 && item.title === 'Reparar') return null;

                if (service.status_id === 1 && item.title === 'Regresar') return null;

                if (service.status_id !== 4 && item.title === 'Reparar') return null;

                if (service.status_id !== 1 && item.title === 'A Taller') return null;

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
                                if(item.title === 'Reparar'){
                                    console.log("create a form")
                                }
                                if(item.title === 'Diagnosticar'){
                                    openModal( <CreateDiagnosisForm serviceId={service.id} /> )
                                }
                                if(item.title === 'Regresar'){
                                    console.log('AGREGAR MODAL PARA CONSULTAR SI REALMENTE EL CLIENTE VOLVER ATRAS EL SERVICIO DE ESTADO')
                                }
                                if(item.title === 'A Taller'){
                                    console.log('GENERATE FORM AND SHIT')
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
