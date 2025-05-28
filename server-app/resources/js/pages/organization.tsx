import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import { FormEventHandler, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Organizacion',
        href: '/organization'
    },
];

type CreateOrganizationForm = {
    file: File,
    name: string,
    description: string
}

export default function Organization(){
    const { data, setData, post, errors, reset } = useForm<Required<CreateOrganizationForm>>({
        file: null,
        name: '',
        description: ''
    })
    const { props } = usePage();
    useEffect(() => {
        if (props.flash?.message) {
            toast.success(props.flash.message);
        }
        if (props.flash?.error) {
            toast.error(props.flash.error);
        }
    }, [props.flash]);
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('create/organization')

    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Organizacion" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">

                    <form className="mx-auto max-w-md" onSubmit={submit}>
                        <div className="group relative z-0 mb-5 w-full">
                            <input
                                type="file"
                                name="file_organization"
                                id="file_organization"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                autoFocus
                                tabIndex={1}
                                autoComplete="file"
                                onChange={(e) => setData('file', e.target.files )}
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

                        <Button
                            type="submit"
                            className="mt-4 w-full"
                        >
                            Crear Organizacion
                        </Button>
                    </form>
                    <Toaster />
                </div>
            </div>
        </AppLayout>
    );
}
