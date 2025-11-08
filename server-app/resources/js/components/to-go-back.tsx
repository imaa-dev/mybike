import React, { useState } from 'react';
import { ServiData } from '@/types';
import { SidebarGroupLabel } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useModal } from '@/context/ModalContextForm';
import { useToast } from '@/context/ToastContext';
import { toGoBackService } from '@/api/services/serviService';

export default function ToGoBack ({ service } : { service: ServiData }) {
    const { closeModal } = useModal()
    const { success, error } = useToast()
    const [ serviceId ] = useState(service.id);
    const [ statusServiceId ] = useState(service.status_id);

    const goBackService = async () => {
        const response = await toGoBackService(serviceId, statusServiceId)

        if(response.code === 200){
            success(response.message)
        }
        if(response.code === 500){
            error(response.message)
        }
        closeModal()
    }

    return(
        <React.Fragment>
            <form
                className="flex w-full flex-col justify-center gap-6 rounded-lg bg-white p-6 shadow-md md:p-10 dark:bg-gray-800"
            >
                <SidebarGroupLabel> Regresar servicio a estado anterior </SidebarGroupLabel>
                <div className="group relative z-0 mb-5 w-full">
                    <Button
                        type="submit"
                        className="mt-4 w-full"
                        tabIndex={1}
                        onClick={() => goBackService()}
                    >
                        Regresar
                    </Button>
                </div>
            </form>
        </React.Fragment>
    )
}
