import { type NavItemDrop } from '@/types';
import { router } from '@inertiajs/react';
import { useModal } from '@/context/ModalContextForm';
import { CreateDiagnosisForm } from '@/components/forms/service/CreateDiagnosisForm';

export function NavDropDown({ items = [], serviceId, handleDelete }: { items: NavItemDrop[] } & { serviceId: number } & {handleDelete: (id: number) => void}) {

    const { openModal } = useModal();

    return (
        <>
            {items.map((item) => (
                <li key={item.title}>
                    <a
                        onClick={(e) => {
                            e.preventDefault();
                            if(item.title === 'Eliminar'){
                                handleDelete(serviceId)
                            }
                            if(item.title === 'Editar') {
                                router.visit(`/edit/${serviceId}/service`)
                            }
                            if(item.title === 'Diagnosticar'){
                                openModal( <CreateDiagnosisForm /> )
                            }
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                        <item.icon className="h-4 w-4" />
                        {item.title}
                    </a>
                </li>
            ))}
        </>
    );
}
