import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { BreadcrumbItem, ServiData } from '@/types';
import InputError from '@/components/input-error';
import toast, { Toaster } from 'react-hot-toast';
import { FormEventHandler, useState } from 'react';
import { Button } from '@/components/ui/button';
import { handleImageUploadMultiple } from '@/lib/utils';
import { useLoading } from '@/context/LoadingContext';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Servicios',
        href: '/service'
    },
    {
        title: 'Listar',
        href: '/service'
    },
    {
        title: 'Gestionar',
        href: '/service'
    },
]

interface ServiProp {
    servi: ServiData
}
interface Page {
    props: {
        organization: {
            id: number,
        }
    };
}
const appUrl = import.meta.env.VITE_APP_URL;
interface Servi {
    client_id: number;
    product_id: number;
    organization_id: number;
    name: string;
    master_note: string;
    note_exit: string;
    price: number | undefined;
    send: boolean;
    file: File[] | null;
}
export default function ManageServiceForm({ servi }: ServiProp) {
    const [uploadImage, setUploadImage] = useState<string | null>(null);
    const page: Page = usePage();
    const [entregar, setEntregar] = useState<boolean>(false);
    const { showLoading, hideLoading } = useLoading();
    const { data, setData, post, errors, processing } = useForm<Required<Servi>>({
        organization_id: page.props.organization.id,
        product_id: servi.product_id,
        client_id: servi.client_id,
        name: servi.name,
        note_exit: '',
        send: entregar,
        master_note: servi.master_note,
        file: null,
        price: undefined,
    });
    const handleUploadImage = (file: File) => {
        const temporalURL = URL.createObjectURL(file)
        setUploadImage(temporalURL);
    }
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/manage/service', {
            onSuccess: (page) => {
                const message = (page.props as { flash?: { message?: string } }).flash?.message;
                if (message) {
                    toast.success(message);
                }
            },
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestionar" />
            <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <form
                        className="flex w-full flex-col justify-center gap-6 rounded-lg bg-white p-6 shadow-md md:p-10 dark:bg-gray-800"
                        onSubmit={submit}
                    >
                        {uploadImage ? (
                                <div className="group relative flex justify-center items-center">
                                    <img
                                        className="w-60"
                                        src={uploadImage}
                                    />
                                </div>
                            ) :
                            servi.file && servi.file[0]?.path ? (
                                <div className="group relative flex justify-center items-center">
                                    <img
                                        className="w-60"
                                        src={`http://localhost:8000/storage/${servi.file[0]?.path}`}
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
                        <div className="group relative z-0 mb-5 w-full">
                            <input
                                type="file"
                                name="file_product[]"
                                id="file_product"
                                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                                autoFocus
                                multiple
                                tabIndex={1}
                                autoComplete="file"
                                onChange={(e) => {
                                    showLoading()
                                    const file = e.target.files;
                                    if (file) {
                                        handleImageUploadMultiple(file).then((res) => {
                                            setData('file', res)
                                            handleUploadImage(res[0])
                                            hideLoading()
                                        }).catch((err) => {
                                            console.log("ONCHANGE_INPUT_FILE_ERROR",err);
                                            toast.error("Error al comprimir la imagen");
                                            hideLoading()
                                        })
                                    }
                                }}
                            />
                            <label
                                htmlFor="floating_email"
                                className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
                            >
                                Actualizar Imagenes Servicio
                            </label>
                        </div>
                        <div className="group relative z-0 mb-5 w-full">
                            <input
                                type="text"
                                name="name_service"
                                id="name_service"
                                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                                placeholder="Nombre Servicio"
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <label
                                htmlFor="floating_email"
                                className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
                            >
                                Nombre Servicio
                            </label>
                            <InputError message={errors.name} />
                        </div>
                        <div className="group relative z-0 mb-5 w-full">
                            <input
                                type="text"
                                name="master_note_service"
                                id="master_note_service"
                                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                                placeholder=" "
                                autoFocus
                                tabIndex={1}
                                autoComplete="master_note"
                                value={data.master_note}
                                onChange={(e) => setData('master_note', e.target.value)}
                                required
                            />
                            <label
                                htmlFor="floating_email"
                                className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
                            >
                                Master Nota
                            </label>
                            <InputError message={errors.master_note} />
                        </div>
                        <div className="group relative z-0 mb-5 w-full">
                            <label htmlFor="products" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                Producto en Reparación
                            </label>
                            <p>
                                {servi.product.name} {servi.product.model} {servi.product.brand}{' '}
                            </p>
                        </div>
                        <div className="group relative z-0 mb-5 w-full">
                            <label htmlFor="clients" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                Cliente
                            </label>
                            <p>
                                {servi.client.name} {servi.client.phone}
                            </p>
                        </div>
                        <div className="group relative z-0 mb-5 w-full">
                            <label className="inline-flex cursor-pointer items-center">
                                <input
                                    type="checkbox"
                                    tabIndex={5}
                                    autoComplete="entrega"
                                    className="peer sr-only"
                                    onChange={(e) => setEntregar(e.target.checked)}
                                />
                                <div className="peer relative h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-checked:bg-blue-600 dark:peer-focus:ring-blue-800"></div>
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Entregar</span>
                            </label>
                        </div>
                        <div className="group relative z-0 mb-5 w-full">
                            <input
                                type="text"
                                name="note_exit_service"
                                id="note_exit_service"
                                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                                placeholder=" "
                                autoFocus
                                tabIndex={1}
                                autoComplete="note_exit"
                                value={data.note_exit}
                                onChange={(e) => setData('note_exit', e.target.value)}
                                required
                            />
                            <label
                                htmlFor="floating_email"
                                className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
                            >
                                Nota Entrega
                            </label>
                            <InputError message={errors.note_exit} />
                        </div>
                        <div className="group relative z-0 mb-5 w-full">
                            <input
                                type="number"
                                name="price_service"
                                id="price_service"
                                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                                placeholder=" "
                                autoFocus
                                tabIndex={1}
                                autoComplete="price"
                                value={data.price}
                                onChange={(e) => setData('price', Number(e.target.value))}
                                required
                            />
                            <label
                                htmlFor="floating_email"
                                className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
                            >
                                Precio
                            </label>
                            <InputError message={errors.price} />
                        </div>
                        <Button
                            type="submit"
                            className="mt-4 w-full"
                            disabled={processing}
                        >
                            Entregar Servicio
                        </Button>
                    </form>
                </div>
            </div>
            <Toaster />
        </AppLayout>
    );
}
