import React from 'react';
import { SparePartsData } from '@/types';
import { SidebarGroupLabel } from '@/components/ui/sidebar';

type Props = {
    setSpareParts?: React.Dispatch<React.SetStateAction<SparePartsData[]>>
}
export const CreateSparePartsForm: React.FC<Props> = ({ setSpareParts })=> {
    const addSpareParts = () => {

    }
    return (
        <React.Fragment>
            <form
                className="flex w-full flex-col justify-center gap-6 rounded-lg bg-white p-6 shadow-md md:p-10 dark:bg-gray-800"
            >
                <SidebarGroupLabel> Agregar Pieza de repuesto</SidebarGroupLabel>
                <div className="group relative z-0 mb-5" >
                    <input
                        type="text"
                        name="brand"
                    />

                    <label
                        htmlFor="floating_brand"
                        className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
                    >
                        Marca <span className="text-red-500" ></span>
                    </label>
                </div>
            </form>
        </React.Fragment>
    )
}
