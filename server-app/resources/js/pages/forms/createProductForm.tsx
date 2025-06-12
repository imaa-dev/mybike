import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { FormEventHandler, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import  { handleImageUploadMultiple } from '@/lib/utils';
import { useLoading } from '@/context/LoadingContext';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Producto',
        href: '/product',
    },
    {
        title: 'Listar',
        href: '/product',
    },
    {
        title: 'Crear',
        href: '/',
    }
];
const appUrl = import.meta.env.VITE_APP_URL;
interface ProductDataProps {
    name: string,
    description: string,
    brand: string,
    model: string,
    file: File[] | null
}
export default function CreateProductForm() {
    const [uploadImage, setUploadImage] = useState<string | null>(null);
    const { showLoading, hideLoading } = useLoading();
    const { data, setData, post, errors, processing } = useForm<Required<ProductDataProps>>({
        name: '',
        description: '',
        brand: '',
        model: '',
        file: null
    })

    const handleImageChange = (file: FileList) => {
        const uploadURL = URL.createObjectURL(file[0]);
        setUploadImage(uploadURL);
    }
    const submit:FormEventHandler = (e) => {
        e.preventDefault();
        post('/create/product',{
            onSuccess: (page) => {
                const message = (page.props as { flash?: { message?: string } }).flash?.message;
                if (message) {
                    toast.success(message);
                }
            },
            onError: (error) => {
                console.log("ERROR", error);
            }

        })
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Productos" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-5">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <form
                        className="flex w-full flex-col justify-center gap-6 rounded-lg bg-white p-6 shadow-md md:p-10 dark:bg-gray-800"
                        onSubmit={submit}
                    >
                        {
                            uploadImage ?
                            <div className="group relative flex justify-center items-center">
                                <img className="w-60" src={uploadImage} alt="Imagen Logo" />
                            </div>
                            :
                            <div className="group relative flex justify-center items-center">
                                <img className="w-60" src={`${appUrl}/carousel.png`} alt="Imagen Logo" />
                            </div>
                        }
                        <div className="grou relative z-0 mb-5 w-full">
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
                                            handleImageChange(res)
                                            hideLoading()
                                        }).catch((err) => {
                                            console.log("ONCHANGE_INPUT_FILE_ERROR",err);
                                            toast.error("Error al comprimir la imagen");
                                            hideLoading()
                                        })
                                    }
                                }}
                            />
                        </div>
                        <div className="w-11111full group relative z-0 mb-5">
                            <input
                                type="text"
                                name="name_product"
                                id="name_product"
                                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                                placeholder="Nombre Producto"
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
                                name="description_product"
                                id="description_product"
                                placeholder="Descripcion"
                                required
                                tabIndex={3}
                                autoComplete="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                            />
                            <InputError message={errors.description} />
                        </div>
                        <div className="group relative z-0 mb-5 w-full">
                            <input
                                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                                type="text"
                                name="brand_product"
                                id="brand_product"
                                placeholder="Marca"
                                required
                                tabIndex={3}
                                autoComplete="marca"
                                value={data.brand}
                                onChange={(e) => setData('brand', e.target.value)}
                            />
                            <InputError message={errors.brand} />
                        </div>
                        <div className="group relative z-0 mb-5 w-full">
                            <input
                                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                                type="text"
                                name="model_product"
                                id="model_product"
                                placeholder="Modelo"
                                required
                                tabIndex={3}
                                autoComplete="model"
                                value={data.model}
                                onChange={(e) => setData('model', e.target.value)}
                            />
                            <InputError message={errors.model} />
                        </div>

                        <Button
                            type="submit"
                            className="mt-4 w-full"
                            tabIndex={4}
                            disabled={processing}
                        >
                            Crear Producto
                        </Button>
                    </form>
                </div>
            </div>
            <Toaster />
        </AppLayout>
    );
}
