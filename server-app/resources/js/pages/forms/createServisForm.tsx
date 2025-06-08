import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { BreadcrumbItem, ProductData, User } from '@/types';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { FormEventHandler, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Servicio',
        href: '/service',
    },
    {
        title: 'Crear',
        href: '/',
    },

];

export interface ServiData {
    organization_id: string;
    product_id: string;
    user_id: string;
    name: string;
    master_note: string;
    file: File[] | null;
}
interface ClientDataProp {
    clients: User[]
}

interface ProducDataProp {
    products: ProductData[]
}
const appUrl = import.meta.env.VITE_APP_URL;
export default function CreateServisForm({clients, products} : ClientDataProp & ProducDataProp) {
    const [uploadImage, setUploadImage] = useState<string | null>(null);
    const handleImageChange = (file: File[]) => {
        const imageURL = URL.createObjectURL(file[0])
        setUploadImage(imageURL);
    }
    const page = usePage();
    const { post, data, setData, errors } = useForm<Required<ServiData>>({
        organization_id: page.props.organization.id,
        product_id: '',
        user_id: '',
        name: '',
        master_note: '',
        file: null,
    })
    const submit:FormEventHandler = (e) => {
        e.preventDefault();
        post('/create/service', {
            onSuccess: (page) => {
                const message = (page.props as { flash?: { message?: string } }).flash?.message;
                if (message) {
                    toast.success(message);
                }
            },
            onError: (error) => {
                console.log(error,'ERROR POST')
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
                                <img className="w-60" src={`${appUrl}/logo-img.png`} alt="Upload Image" />
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
                                    const file = e.target.files;
                                    if (file) {
                                        const files = Array.from(file);
                                        handleImageChange(files)
                                        setData('file', files);
                                    }
                                }}
                            />
                            <InputError message={errors.file} />
                        </div>
                        <div className="w-full group relative z-0 mb-5">
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
                        <div className="group relative z-0 mb-5 w-full">
                            <label htmlFor="products" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Productos
                            </label>
                            <select
                                id="product"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={(e) => setData('product_id', e.target.value)}
                                value={data.product_id}
                            >
                                <option value="">Selecciona un producto</option>
                                {products.map((product, index) => (
                                    <option key={index} value={product.id}>{product.name}{''}{product.model}</option>
                                ))}
                            </select>
                        </div>
                        <div className="group relative z-0 mb-5 w-full">
                            <label htmlFor="clients" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Clientes
                            </label>
                            <select
                                id="client"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={(e) => setData('user_id', e.target.value)}
                                value={data.user_id}
                            >
                                <option value="">Selecciona un cliente</option>
                                {clients.map((client, index) => (
                                    <option key={index} value={client.id}>{client.name}</option>
                                ))}
                            </select>

                        </div>
                        <Button type="submit" className="mt-4 w-full" tabIndex={4}>
                            Crear Servicio
                        </Button>
                    </form>
                    <Toaster />
                </div>
            </div>
        </AppLayout>
     )
}
