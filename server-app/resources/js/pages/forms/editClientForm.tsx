import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { BreadcrumbItem, User } from '@/types';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { FormEventHandler, useState } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cliente',
        href: '/client'
    },
    {
        title: 'Listar',
        href: '/client'
    },
    {
        title: 'Actualizar',
        href: '/client'
    },
];

interface ClientProp {
    client: User
}

type ClientData = {
    id: number,
    name: string,
    email: string,
    phone: string,
    file: File | null
}
export default function EditClientForm({client}: ClientProp) {
    const [uploadImage, setUploadImage] = useState<string | null>(null);
    const { patch, setData, data, reset, errors } = useForm<Required<ClientData>>({
        id: client.id,
        name: client.name,
        email: client.email,
        phone: client.phone,
        file: null
    })
    const handleUploadImage = (file: File) => {
        console.log(file, "HANDLE")
        const temporalURL = URL.createObjectURL(file)
        setUploadImage(temporalURL);
    }
    const submit: FormEventHandler = (e) => {
        e.preventDefault()
        console.log(data)
        patch(`/update/client/${data.id}`, {
            onSuccess: (page) => {
                console.log(page)
                const message = (page.props as { flash?: { message?: string } }).flash?.message;
                if(message) {
                    toast.success(message);
                }
                reset()
            }
        })
    }
    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar cliente" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <form
                        className="flex w-full flex-col justify-center gap-6 rounded-lg bg-white p-6 shadow-md md:p-10 dark:bg-gray-800"
                        onSubmit={submit}
                    >
                        <div className="grou relative z-0 mb-5 w-full">
                            {uploadImage ? (
                                    <div className="group relative flex justify-center items-center">
                                        <img
                                            className="w-60"
                                            src={uploadImage}
                                        />
                                    </div>
                                ) :
                                client.file && client.file.path ? (
                                    <div className="group relative flex justify-center items-center">
                                        <img
                                            className="w-60"
                                            src={`http://localhost:8000/storage/${client.file.path}`}
                                        />
                                    </div>
                                    ) : (
                                    <div className="group relative flex justify-center items-center">
                                        <img
                                            className="w-60"
                                            src={`http://localhost:8000/logo-img.png`}
                                        />
                                    </div>
                                )
                            }
                            <input
                                type="file"
                                name="file_client"
                                id="file_client"
                                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                                autoFocus
                                tabIndex={1}
                                autoComplete="file"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        handleUploadImage(file)
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
                                placeholder="Nombre Cliente"
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
                                name="email_client"
                                id="email_client"
                                placeholder="Email"
                                required
                                tabIndex={3}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} />
                        </div>
                        <div className="group relative z-0 mb-5 w-full">
                            <input
                                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                                type="text"
                                name="phone_client"
                                id="phone_client"
                                placeholder="Celular"
                                required
                                tabIndex={3}
                                autoComplete="phone"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                            />
                            <InputError message={errors.phone} />
                        </div>
                        <Button type="submit" className="mt-4 w-full" tabIndex={4}>
                            Actualizar Cliente
                        </Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    )
}
