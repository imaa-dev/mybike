import React, { FormEventHandler } from 'react';
import { SidebarGroupLabel } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import { useToast } from '@/context/ToastContext';
import { useModal } from '@/context/ModalContextForm';

interface ServiceRepair {
    service_id: number;
    toRepair: boolean;
}

export function ToRepairForm ({ serviceId } : { serviceId: number}){
    const { success, error } = useToast();
    const { closeModal } = useModal();
    const { post, setData, processing } = useForm<Required<ServiceRepair>>({
        service_id: serviceId,
        toRepair: false
    })

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/to-repair/service', {
            onSuccess: (page) => {
                const message = (page.props as { flash?: { message?: string } }).flash?.message;
                closeModal();
                if(message){
                    success(message)
                }
            },
            onError: (e) => {
                error(e.message);
                console.log(e, 'Error');
            }
        })
    }

    return (
        <React.Fragment>
            <form
                className="flex w-full flex-col justify-center gap-6 rounded-lg bg-white p-6 shadow-md md:p-10 dark:bg-gray-800"
                onSubmit={submit}
             >
                <SidebarGroupLabel> Reparación </SidebarGroupLabel>
                <div className="group relative z-0 mb-5 w-full" >
                    <input
                        type="checkbox"
                        name="check-notification"
                        id="check-notification"
                        tabIndex={1}
                        autoComplete="check-notification"
                        onChange={(e) => setData('toRepair', e.target.checked)}

                    />
                    <label
                        className="absolute text-sm text-gray-500 ml-4 mt-1"
                    >
                        Notificar Cliente
                    </label>
                </div>
                <Button
                    type="submit"
                    className="mt-4 w-full"
                    tabIndex={2}
                    disabled={processing}
                >
                    Servicio a reparación
                </Button>
            </form>
        </React.Fragment>
    );
}
