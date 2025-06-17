import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { BreadcrumbItem, ProductData, User } from '@/types';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { FormEventHandler, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { handleImageUploadMultiple } from '@/lib/utils';
import { useLoading } from '@/context/LoadingContext';
import { Card } from '@/components/ui/card';
import { Plus, Save } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Servicio',
        href: '/service',
    },
    {
        title: 'Crear Servicio',
        href: '/',
    },

];

export interface ServiData {
    organization_id: number;
    product_id: string;
    client_id: string;
    date_enty: string;
    date_exit: string;
    reason: Reason;
    file: File[] | null;
}
export interface Reason {
    reason_note: string;
}
interface ClientDataProp {
    clients: User[]
}

interface ProducDataProp {
    products: ProductData[]
}
interface Page {
    props: {
        organization: {
            id: number,
        }
    };
}
const appUrl = import.meta.env.VITE_APP_URL;
export default function CreateServisForm({clients, products} : ClientDataProp & ProducDataProp) {
    const [uploadImage, setUploadImage] = useState<string | null>(null);
    const { showLoading, hideLoading } = useLoading();
    const handleImageChange = (file: File[]) => {
        const imageURL = URL.createObjectURL(file[0])
        setUploadImage(imageURL);
    }
    const page: Page = usePage();
    const { post, data, setData, errors, processing } = useForm<Required<ServiData>>({
        organization_id: page.props.organization.id,
        product_id: '',
        client_id: '',
        date_enty: '',
        file: null,
    })
    const submit:FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data)
        // post('/create/service', {
        //     onSuccess: (page) => {
        //         const message = (page.props as { flash?: { message?: string } }).flash?.message;
        //         if (message) {
        //             console.log(message)
        //             toast.success(message);
        //         }
        //     },
        //     onError: (error) => {
        //         console.log(error,'ERROR POST')
        //     }
        // })
    }
     return(
        <AppLayout breadcrumbs={breadcrumbs} >
            <Head title="Servicio" />
            <div className="flex h-full flex-1 flex-col items-center justify-center gap-4 rounded-xl">
                <div className="relative m-5 overflow-x-auto shadow-md sm:rounded-lg">
                    <form
                        onSubmit={submit}
                    >
                        <h2 className="text-xl font-bold leading-none text-gray-900 dark:text-white m-5" > Crear Nuevo Servicio </h2>
                        <Card className="max-w-xl p-6 mt-10 m-5" >
                            <h2> Datos del servicio </h2>
                                <div className="group relative z-0 mb-5 w-full" >
                                    <input
                                        tabIndex={0}
                                        type="datetime-local"
                                        name="date_entry"
                                        id="date_entry"
                                        className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                                        autoComplete="off"
                                        value={data.date_enty}
                                        onChange={(e) => setData('date_enty', e.target.value)}
                                        required
                                    />
                                    <label
                                        htmlFor="floating_email"
                                        className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
                                    >
                                        Fecha Ingreso Servicio
                                    </label>
                                </div>
                                <div className="group relative z-0 mb-5 w-full">
                                    <label htmlFor="products" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Producto
                                    </label>
                                    <select
                                        id="product"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={(e) => setData('product_id', e.target.value)}
                                        value={data.product_id}
                                    >
                                        <option value="">Selecciona un producto</option>
                                        {products.map((product, index) => (
                                            <option key={index} value={product.id}>{product.name}{' '}{product.model}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="group relative z-0 mb-5 w-full">
                                    <label htmlFor="clients" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Cliente
                                    </label>
                                    <select
                                        id="client"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={(e) => setData('client_id', e.target.value)}
                                        value={data.client_id}
                                    >
                                        <option value="">Selecciona un cliente</option>
                                        {clients.map((client, index) => (
                                            <option key={index} value={client.id}>{client.name}</option>
                                        ))}
                                    </select>

                                </div>

                        </Card>
                        <Card className="max-w-xl p-6 mt-10 m-5" >
                            <h2> Detalles del Ingreso</h2>

                                <div className="group relative z-0 mb-5 w-full">
                                    <input
                                        type="text"
                                        name="reason"
                                        id="reason"
                                        className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                                        tabIndex={3}
                                        value={data.reason}
                                        onChange={(e) => { setData('reason', e.target.value) }}
                                        required
                                    />
                                    <label
                                        htmlFor="floating_email"
                                        className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
                                    >
                                        Agregar detalle ingreso de servicio
                                    </label>
                                    <InputError message={errors.reason} />
                                </div>
                                <Button
                                    type="submit"
                                    className="mt-4 w-full"
                                    tabIndex={4}
                                    disabled={processing}
                                >
                                    <Plus />  Agregar Detalle
                                </Button>

                        </Card>
                    <Card className="max-w-xl p-6 mt-5 m-5" >
                        <h2> Fotos y registros servicio </h2>
                        {uploadImage ?
                            <div className="group relative flex justify-center items-center">
                                <img className="w-30" src={uploadImage} alt="Upload Image" />
                            </div>
                            :
                            <div className="group relative flex justify-center items-center">
                                <img className="w-30" src={`${appUrl}/logo-img.png`} alt="Upload Image" />
                            </div>
                        }

                        <div className="grou relative z-0 mb-5 w-full">
                            <input
                                type="file"
                                name="file_servi[]"
                                id="file_servi"
                                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                                multiple
                                tabIndex={5}
                                autoComplete="file"
                                onChange={(e) => {
                                    showLoading();
                                    const file = e.target.files;
                                    if (file) {
                                        handleImageUploadMultiple(file).then((res) => {
                                            setData('file', res)
                                            handleImageChange(res)
                                            hideLoading()
                                        }).catch((err) => {
                                            toast.error('Error al comprimir la imagen')
                                            console.log('ONCHANGE_INPUT_FILE_ERROR', err)
                                            hideLoading()
                                        })
                                    }
                                }}
                            />
                            <label
                                htmlFor="floating_email"
                                className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
                            >
                                Fotos
                            </label>
                            <InputError message={errors.file} />

                        </div>
                    </Card>
                        <div className="grou relative z-0 p-5 mt-5 w-full">
                            <Button
                                type="submit"
                                className="p-8 w-full"
                                tabIndex={6}
                                disabled={processing}
                            >
                                <Save /> Crear Servicio
                            </Button>
                        </div>

                    <Toaster />
                    </form>
                </div>
            </div>

        </AppLayout>
     )
}
