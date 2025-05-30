import { Button } from '@/components/ui/button';
import { FormEventHandler } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import ButtonTop from '@/components/button-top';

type UpdateOrganizationForm = {
    organization_id: string;
    file: File,
    name: string,
    description: string
}
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Organización',
        href: '/organization',
    },
    {
        title: 'Actualizar',
        href: '/organization/listar',
    }
];

export default function OrganizationEditForm({organization}) {

    const { data, setData, post, errors, reset } = useForm<Required<UpdateOrganizationForm>>({
        organization_id: organization.id,
        file: organization.file,
        name: organization.name,
        description: organization.description,
    })
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/organization/edit', {
            onSuccess: (page) => {
                console.log('UPDATED',page)
                toast.success(page.props.flash?.message)
                reset()
            },
            onError: (error) => {
                console.log('ERROR', error)
            }
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs} >
            <Head title="Organizacion" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <ButtonTop />
                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                    <div className="inline-flex rounded-md shadow-xs">
                        <form
                            className="flex w-full  flex-col justify-center gap-6 rounded-lg bg-white p-6 shadow-md md:p-10 dark:bg-gray-800"
                            onSubmit={submit}
                        >
                            <div className="group relative z-0 mb-12 w-full">
                                <img className="m-5 p-2 w-30" src={`http://localhost:8000/storage/${organization.file.path}`} alt={"Organization Edit"} />
                                <input
                                    type="file"
                                    name="file_organization"
                                    id="file_organization"
                                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="file"
                                    onChange={(e) => setData('file', e.target.files)}
                                    required
                                />
                                <label
                                    htmlFor="floating_email"
                                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
                                >
                                    Icono Marca Organizacion
                                </label>
                                <a>{errors.file && errors.file}</a>
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

                            <Button type="submit" className="mt-4 w-full">
                                Actualizar Organizacion
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>

    )
}


