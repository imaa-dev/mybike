import React from 'react';
import { SparePartsData } from '@/types';
import { SidebarGroupLabel } from '@/components/ui/sidebar';
import { router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { createSparePart } from '@/api/product/sparePartsService';
import { useLoading } from '@/context/LoadingContext';
import { useToast } from '@/context/ToastContext';
import { useModal } from '@/context/ModalContextForm';
import InputError from '@/components/input-error';

type Props = {
    setSpareParts?: React.Dispatch<React.SetStateAction<SparePartsData[]>>
    serviceId: number
}
export const CreateSparePartsForm: React.FC<Props> = ({ setSpareParts, serviceId })=> {

    const { success, error } = useToast();
    const { closeModal } = useModal();
    const { showLoading, hideLoading } = useLoading();
    const { data, setData, errors, processing, setError } = useForm<Required<SparePartsData>>({
        service_id: serviceId,
        model: "",
        brand: "",
        price: 0,
        note: "",
    })

    const addSpareParts = async () => {
        showLoading();
        const response = await createSparePart(data);
        hideLoading();
        console.log(response);
        if(response.message === 'Pieza de repuesto creada satisfactoriamente' && typeof setSpareParts !== 'undefined' && response.code === 200){
            closeModal();
            setSpareParts()?.(prevState =>
                response.spare_parts !== undefined ? [...prevState, response.spare_parts] : prevState
            );
            success(response.message)
        }
        if(response.code === 200 && setSpareParts === undefined && typeof response.message === 'string'){
            success(response.message);
        }
        if(response.code === 422 && typeof response.message === 'object'){
            error('Error de validación de datos')
        }
        if(response.code === 'ERR_NETWORK'){
            error('Error de conexión')
        }
        if(response.code === 'ERR_BAD_RESPONSE' && typeof response.message === 'string'){
            error('Error en el servidor')
        }
        if(response.code === 500 && typeof response.message === 'string'){
            error(response.message)
        }
    }
    return (
        <React.Fragment>
            <form
                className="flex w-full flex-col justify-center gap-6 rounded-lg bg-white p-6 shadow-md md:p-10 dark:bg-gray-800"
            >
                <SidebarGroupLabel> Agregar Pieza de repuesto</SidebarGroupLabel>
                <div className="group relative z-0 mb-5" >
                    <input
                        className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                        type="text"
                        name="model"
                        id="model"
                        required
                        tabIndex={1}
                        autoComplete="model"
                        value={data.model}
                        onChange={(e) => setData('model', e.target.value)}
                    />

                    <label
                        htmlFor="floating_model"
                        className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
                    >
                        Model <span className="text-red-500" ></span>
                    </label>
                    <InputError message={errors.model} />
                </div>
                <div className="group relative z-0 mb-5" >
                    <input
                        className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                        type="text"
                        name="brand"
                        id="brand"
                        required
                        tabIndex={2}
                        autoComplete="brand"
                        value={data.brand}
                        onChange={(e) => setData('brand', e.target.value)}
                    />

                    <label
                        htmlFor="floating_brand"
                        className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
                    >
                        Marca <span className="text-red-500" ></span>
                    </label>
                    <InputError message={errors.brand} />
                </div>
                <div className="group relative z-0 mb-5" >
                    <input
                        className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                        type="text"
                        name="note"
                        id="note"
                        required
                        tabIndex={3}
                        autoComplete="note"
                        value={data.note}
                        onChange={(e) => setData('note', e.target.value)}
                    />

                    <label
                        htmlFor="floating_brand"
                        className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
                    >
                        Nota Maestro <span className="text-red-500" ></span>
                    </label>
                    <InputError message={errors.note} />
                </div>
                <div className="group relative z-0 mb-5" >
                    <input
                        className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                        type="text"
                        name="price"
                        id="price"
                        required
                        tabIndex={4}
                        autoComplete="price"
                        value={data.price}
                        onChange={(e) => setData('price', Number(e.target.value))}
                    />

                    <label
                        htmlFor="floating_brand"
                        className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
                    >
                        Precio <span className="text-red-500" ></span>
                    </label>
                    <InputError message={errors.price} />
                </div>
                <Button
                    type="button"
                    className="mt-4 w-full"
                    tabIndex={5}
                    disabled={processing}
                    onClick={() => addSpareParts()}
                >
                    Crear pieza de repuesto
                </Button>
            </form>
        </React.Fragment>
    )
}
