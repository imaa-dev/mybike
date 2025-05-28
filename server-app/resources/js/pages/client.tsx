import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cliente',
        href: '/client'
    },
];

type CreateClientForm = {
    name: string;
    email: string;
    phone: string;
};

interface CreateClientProps {
    status?: string;
}


export default function Client(){
    const { data, setData, post, processing, errors, reset } = useForm<Required<CreateClientForm>>({
        name: '',
        email: '',
        phone: ''
    })
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('create/client', {
            onFinish: (res) => {
                console.log('READY', res)
            }
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cliente" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <form className="max-w-md mx-auto" onSubmit={submit}>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text"
                                   name="name_client"
                                   id="name_client"
                                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                   placeholder="Nombre Cliente"
                                   autoFocus
                                   tabIndex={1}
                                   autoComplete="name"
                                   value={data.name}
                                   onChange={(e) => setData('name', e.target.value)}
                                   required />
                            <InputError message={errors.name} />
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="email"
                                name="email_client"
                                id="email_client"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder="Email (opcional)"

                                tabIndex={2}
                                autoFocus
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} />
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                type="text"
                                name="cel_client"
                                id="cel_client"
                                placeholder="Celular"
                                required
                                tabIndex={3}
                                autoComplete="celular"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                            />
                            <InputError message={errors.phone} />
                        </div>

                        <Button type="submit" className="mt-4 w-full" tabIndex={4}>
                            Crear
                        </Button>

                    </form>
                </div>
            </div>
        </AppLayout>
    )
}
