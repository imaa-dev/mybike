import React from 'react';
import { useToast } from '@/context/ToastContext';
import { useModal } from '@/context/ModalContextForm';
import { useForm } from '@inertiajs/react';

export default function ToSparePartsForm ({ serviceId }: { serviceId: number }){

    const { success, error } = useToast();
    const { closeModal } = useModal();

    return (
        <React.Fragment>
            <div>
                <h1> Repuestos del producto </h1>
            </div>
        </React.Fragment>
    )
}
