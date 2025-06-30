import React, { FormEventHandler } from 'react';
import { SidebarGroupLabel } from '@/components/ui/sidebar';
import InputError from '@/components/input-error';
import InputPhone from '@/components/input-phone';
import { Button } from '@/components/ui/button';
import { useToast } from '@/context/ToastContext';
import { useForm } from '@inertiajs/react';

type UserData = {
    name: string;
    email: string;
    phone: string;
    file: File | null;
}

const CreateClientForm = () => {
    const { success, error } = useToast()
    const { data, setData, post, errors, processing } = useForm<Required<UserData>>({
        name: '',
        email: '',
        phone: '',
        file: null
    })
    const submit:FormEventHandler = (e) => {
        e.preventDefault();

        post('/create/client',{
            onSuccess: (page) => {
                const message = (page.props as { flash?: { message?: string } }).flash?.message;
                if (message) {
                    success(message);
                }
            },
            onError:((e) => {
                error(e.message)
            })
        })
    }
    return (
        <React.Fragment>
            <form
                className="flex w-full flex-col justify-center gap-6 rounded-lg bg-white p-6 shadow-md md:p-10 dark:bg-gray-800"
                onSubmit={submit}
            >
                <SidebarGroupLabel> Crear Cliente </SidebarGroupLabel>
                <div className="w-full group relative z-0 mb-5">
                    <input
                        type="text"
                        name="name_client"
                        id="name_client"
                        className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                        autoFocus
                        tabIndex={1}
                        autoComplete="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <label
                        htmlFor="floating_name"
                        className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
                    >
                        Nombre
                    </label>
                    <InputError message={errors.name} />
                </div>
                <div className="group relative z-0 mb-5 w-full">
                    <input
                        className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                        type="text"
                        name="client_email"
                        id="client_email"
                        tabIndex={3}
                        autoComplete="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <label
                        htmlFor="floating_email"
                        className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
                    >
                        Email
                    </label>
                    <InputError message={errors.email} />
                </div>
                <div className="group relative z-0 mb-5 w-full">
                    <label
                        htmlFor="floating_cel"
                        className="absolute  origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
                    >
                        Celular
                    </label>
                    <InputPhone data={data} setData={setData} />
                    <InputError message={errors.phone} />
                </div>
                <Button
                    type="submit"
                    className="mt-4 w-full"
                    tabIndex={4}
                    disabled={processing}
                >
                    Crear Cliente
                </Button>
            </form>
        </React.Fragment>
    )
}
export default CreateClientForm;
