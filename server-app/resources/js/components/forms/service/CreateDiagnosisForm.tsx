import React, { useState } from 'react';
import { useModal } from '@/context/ModalContextForm';
import { useToast } from '@/context/ToastContext';
import { useLoading } from '@/context/LoadingContext';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { SidebarGroupLabel } from '@/components/ui/sidebar';
import InputError from '@/components/input-error';
import { Plus } from 'lucide-react';

interface DiagnosisData {
    diagnosis: string;
    repairTime: string;
    cost: number;
}

interface SparePartsData{
    model: string;
    brand: string;
    price: number;
    note: string;
}
export function CreateDiagnosisForm({ serviceId }: { serviceId: number }) {
    const { success, error } = useToast();
    const { closeModal } = useModal();
    const { showLoading, hideLoading } = useLoading();
    const { data, setData, errors, processing, setError } = useForm<Required<DiagnosisData>>({
        diagnosis: '',
        repairTime: '',
        cost: 0,
    })

    const addDiagnosis = async () => {
        console.log(serviceId);
        // TODO
        // Create logic
        // Agregarle
        showLoading();
        hideLoading();
        closeModal();
        success('MESSAGE');
        error("ERROR_MESSAGE");
        setError('diagnosis', 'ERROR');
    }

    return(
        <React.Fragment>
            <form
                className="flex w-full flex-col justify-center gap-6 rounded-lg bg-white p-6 shadow-md md:p-10 dark:bg-gray-800"
            >
                <SidebarGroupLabel> Diagnostico y repuestos </SidebarGroupLabel>
                <div className="group relative z-0 mb-5 w-full" >
                    <input
                        className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                        type="text"
                        name="diagnosis"
                        id="diagnosis"
                        required
                        tabIndex={1}
                        autoComplete="diagnosis"
                        value={data.diagnosis}
                        onChange={(e) => setData('diagnosis', e.target.value)}
                    />
                    <label>
                        Diagnostico <span className="text-red-500" >*</span>
                    </label>
                    <InputError message={errors.diagnosis} />
                </div>
                <div className="group relative z-0 mb-5 w-full" >
                    <input
                        className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                        type="text"
                        name="repairTime"
                        id="repairTime"
                        required
                        tabIndex={1}
                        autoComplete="repairTime"
                        value={data.repairTime}
                        onChange={(e) => setData('repairTime', e.target.value)}
                    />
                    <label>
                        Tiempo reparación <span className="text-red-500" >*</span>
                    </label>
                    <InputError message={errors.repairTime} />
                </div>
                <div className="group relative z-0 mb-5 w-full" >
                    <input
                        className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                        type="number"
                        name="cost"
                        id="cost"
                        required
                        tabIndex={1}
                        autoComplete="cost"
                        value={data.cost}
                        onChange={(e) => setData('cost', Number(e.target.value))}
                    />
                    <label>
                        Costo <span className="text-red-500" >*</span>
                    </label>
                    <InputError message={errors.cost} />
                </div>
                <div className="group relative z-0 mb-5 w-full" >
                    <label htmlFor="products"
                           className="absolute -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
                    >
                        Piezas de repuesto <span className="text-red-500">*</span>
                    </label>

                    <div className="flex" >
                        <select
                            id="product"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            value={"DATA"}
                        >
                            <option value="">Selecciona un producto</option>

                        </select>
                        <Button
                            type="button"
                            className="ml-3"
                            onClick={() => console.log("HERE")}
                        >
                            <Plus />
                        </Button>
                    </div>

                </div>
                <Button
                    type="button"
                    className="mt-4 w-full"
                    tabIndex={4}
                    disabled={processing}
                    onClick={() => addDiagnosis()}
                >
                    Enviar Diagnostico WSP
                </Button>

                <Button
                    type="button"
                    className="mt-4 w-full"
                    tabIndex={4}
                    disabled={processing}
                    onClick={() => addDiagnosis()}
                >
                    Crear Diagnostico sin confirmación
                </Button>

            </form>
        </React.Fragment>
    );
}
