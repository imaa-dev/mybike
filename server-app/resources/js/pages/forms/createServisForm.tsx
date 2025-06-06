import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { FormEventHandler, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Servicio',
        href: '/forms/create-servis',
    },
    {
        title: 'Listar',
        href: '/',
    },

];

export interface ServiData {
    name: string;
    master_note: string;
    file: File[] | null;
}
export default function CreateServisForm() {
    const [uploadImage, setUploadImage] = useState<string | null>(null);
    const handleImageChange = (file: File) => {
        const imageURL = URL.createObjectURL(file)
        setUploadImage(imageURL);
    }
    const { post, data, setData, errors } = useForm<Required<ServiData>>({
        name: '',
        master_note: '',
        file: null,
    })
    const submit:FormEventHandler = (e) => {
        e.preventDefault();
        post('create/service', {
            onSuccess: (page) => {
                const message = (page.props as { flash?: { message?: string } }).flash?.message;
                if (message) {
                    toast.success(message);
                }
            }
        })
    }
     return(
        <AppLayout breadcrumbs={breadcrumbs} >
            <Head title="Servicio" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl">
                <div className="relative m-5 overflow-x-auto shadow-md sm:rounded-lg">
                    <form
                        className="flex w-full flex-col justify-center gap-6 rounded-lg bg-white p-6 shadow-md md:p-10 dark:bg-gray-800"
                        onSubmit={submit}
                    >
                        {uploadImage ?
                            <div className="group relative flex justify-center items-center">
                                <img className="w-60" src={uploadImage} alt="Upload Image" />
                            </div>
                            :
                            <div className="group relative flex justify-center items-center">
                                <img className="w-60" src="http://localhost:8000/logo-img.png" alt="Upload Image" />
                            </div>
                        }
                        <div className="grou relative z-0 mb-5 w-full">
                            <input
                                type="file"
                                name="file_servi[]"
                                id="file_servi"
                                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                                autoFocus
                                multiple
                                tabIndex={1}
                                autoComplete="file"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        handleImageChange(file)
                                        setData('file', file);

                                    }
                                }}
                            />
                            <InputError message={errors.file} />
                        </div>
                        <div className="w-11111full group relative z-0 mb-5">
                            <input
                                type="text"
                                name="name_client"
                                id="name_client"
                                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                                placeholder="Nombre Servicio"
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <InputError message={errors.name} />
                        </div>
                        <div className="group relative z-0 mb-5 w-full">
                            <input
                                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                                type="text"
                                name="servi_note"
                                id="servi_note"
                                placeholder="Maestro Nota"
                                tabIndex={3}
                                autoComplete="master_note"
                                value={data.master_note}
                                onChange={(e) => setData('master_note', e.target.value)}
                            />
                            <InputError message={errors.master_note} />
                        </div>

                        <Button type="submit" className="mt-4 w-full" tabIndex={4}>
                            Crear Cliente
                        </Button>
                    </form>
                    <Toaster />
                </div>
            </div>
        </AppLayout>
    )
}
