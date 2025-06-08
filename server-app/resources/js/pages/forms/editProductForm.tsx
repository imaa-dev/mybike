import type { BreadcrumbItem, ProductData } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import toast, { Toaster } from 'react-hot-toast';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Producto',
        href: '/product',
    },
    {
        title: 'Actualizar ',
        href: '/product',
    },

];

interface ProductDataProps {
    id: number;
    name: string,
    description: string,
    brand: string,
    model: string,
    price: number,
    file: File[] | null
}
const appUrl = import.meta.env.VITE_APP_URL;
interface Product {
    product: ProductData
}
export default function EditProducForm ({product}: Product) {

    const { data, setData, post, errors } = useForm<Required<ProductDataProps>>({
        id: product.id,
        name: product.name,
        description: product.description,
        brand: product.brand,
        model: product.model,
        price: product.price,
        file: null
    })
    console.log(product)
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/update/product', {
            onSuccess: ((page) => {
                const message = (page.props as { flash?: { message?: string } }).flash?.message;
                if(message){
                    toast.success(message);
                }
            })
        })
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs} >
            <Head title="Productos" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <form
                        className="flex w-full flex-col justify-center gap-6 rounded-lg bg-white p-6 shadow-md md:p-10 dark:bg-gray-800"
                        onSubmit={submit}
                    >
                        <div className="grou relative z-0 mb-5 w-full">
                            {product.file[0] ? (
                                <div className="group relative flex justify-center items-center">
                                    <img
                                        className="w-60"
                                        src={`${appUrl}/storage/${product.file[0].path}`}
                                    />
                                </div>
                            ) :
                            <div className="group relative flex justify-center items-center">
                                <img
                                    className="w-60"
                                    src={`${appUrl}/carousel.png`}
                                />
                            </div>

                            }
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
                                    const file = e.target.files;
                                    if (file) {
                                        const files = Array.from(file);
                                        setData('file', files);
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
                        <div className="group relative z-0 mb-5 w-full">
                            <input
                                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                                type="text"
                                name="price_product"
                                id="price_product"
                                placeholder="Precio"
                                required
                                tabIndex={3}
                                autoComplete="price"
                                value={data.price}
                                onChange={(e) => setData('price', parseFloat(e.target.value))}
                            />
                            <InputError message={errors.price} />
                        </div>
                        <Button type="submit" className="mt-4 w-full" tabIndex={4}>
                            Actualizar Producto
                        </Button>
                    </form>
                </div>
            </div>
            <Toaster />
        </AppLayout>
    )
}
