import { Button } from '@/components/ui/button';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import {useState} from "react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Organización',
        href: '/list/organization',
    },
    {
        title: 'Listar',
        href: '/list/organization',
    },
    {
        title: 'Crear',
        href: '/list/organization',
    }
];

type CreateOrganizationForm = {
    file: File | null,
    name: string,
    description: string,
    active: boolean,
}


const OrganizationForm = () => {

    const { data, setData, post, reset } = useForm<Required<CreateOrganizationForm>>({
        file: null,
        name: '',
        description: '',
        active: false,
    })

    const [uploadImage, setUploadImage] = useState<string | null>(null);

    const handleImageChange = (file: File) => {
        const imageUrl = URL.createObjectURL(file)
        setUploadImage(imageUrl)
    }
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/create/organization',{
            preserveScroll: true,
            onSuccess: (page) => {
                const message = (page.props as { flash?: { message?: string } }).flash?.message;
                if(message) {
                    toast.success(message);
                }
                reset()
            },
            onError: (res) => {
                if(res.file){
                    toast.error(res.file);
                }
                if(res.description){
                    toast.error(res.description);
                }
                if(res.active){
                    toast.error(res.active);
                }
                if(res.name){
                    toast.error(res.name);
                }
            }
        })
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs} >
            <Head title='Organization' />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="inline-flex rounded-md shadow-xs">
                    <form
                        className="flex w-full flex-col justify-center gap-6 rounded-lg bg-white p-6 shadow-md md:p-10 dark:bg-gray-800"
                        onSubmit={submit}
                    >
                        {uploadImage ?
                            <div className="group relative flex justify-center items-center">
                                <img className="w-60" src={uploadImage} alt="Imagen Logo" />
                            </div>
                            :
                            <div className="group relative flex justify-center items-center">
                                <img className="w-60" src="http://localhost:8000/storage/logo-img.png" alt="Imagen Logo" />
                            </div>
                        }
                        <div className="group relative z-0 mb-12 w-full">
                            <input
                                type="file"
                                name="file"
                                id="file"
                                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                                autoFocus
                                tabIndex={1}
                                autoComplete="file"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if(file) {
                                        setData('file', file)
                                        handleImageChange(file)
                                    }
                                }}
                                required
                            />
                            <label
                                htmlFor="floating_email"
                                className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
                            >
                                Icono Marca Organizacion
                            </label>
                        </div>
                        <div className="group relative z-0 mb-5 w-full">
                            <input
                                type="text"
                                name="organization_name"
                                id="organization_name"
                                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                                placeholder=" "
                                required
                                autoFocus
                                autoComplete="name"
                                tabIndex={1}
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            <label
                                htmlFor="floating_email"
                                className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
                            >
                                Nombre Organización
                            </label>

                        </div>
                        <div className="group relative z-0 mb-5 w-full">
                            <input
                                type="description"
                                name="organizacion_description"
                                id="organizacion_description"
                                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                                placeholder=" "
                                required
                                autoFocus
                                autoComplete="description"
                                tabIndex={1}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                            />
                            <label
                                htmlFor="floating_email"
                                className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
                            >
                                Descripción
                            </label>
                        </div>
                            <div className="group relative z-0 mb-5 w-full">
                                <label className="inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        tabIndex={5}
                                        autoComplete="active"
                                        className="sr-only peer"
                                        onChange={ (e) =>setData('active', e.target.checked) }
                                    />
                                    <div
                                        className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Dejar organizacion Activa</span>
                                </label>
                            </div>

                            <Button type="submit" className="mt-4 w-full">
                                Crear Organizacion
                            </Button>
                        </form>
                </div>
                    <Toaster />
                </div>
            </div>
        </AppLayout>

    )
}
export default OrganizationForm;
