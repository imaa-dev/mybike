import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, ProductData, ProductTypeData } from '@/types';
import { FormEventHandler, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import  { handleImageUploadMultiple } from '@/lib/utils';
import { useLoading } from '@/context/LoadingContext';
import { SidebarGroupLabel } from '@/components/ui/sidebar';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Producto',
        href: '/product',
    },
    {
        title: 'Crear',
        href: '/',
    }
];
interface ProductDataProps {
    product_type_id: string;
    brand: string,
    model: string,
    file: File[] | null
}

interface ProductTypeDataProps {
    product_types: ProductTypeData[];
}

export default function CreateProductForm({product_types}: ProductTypeDataProps) {
    const { data, setData, post, errors, processing } = useForm<Required<ProductDataProps>>({
        product_type_id: '',
        brand: '',
        model: '',
        file: null
    })

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
                toast.error(error.message);
            }
        })
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Productos" />
            <div className="flex h-full flex-1 flex-col items-center justify-center gap-4 rounded-xl">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <form
                        className="flex w-full flex-col justify-center gap-6 rounded-lg bg-white p-6 shadow-md md:p-10 dark:bg-gray-800"
                        onSubmit={submit}
                    >
                        <SidebarGroupLabel> Crear Producto </SidebarGroupLabel>

                        <div className="group relative z-0 mb-5 w-full">
                            <label htmlFor="product_type_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Tipos de productos
                            </label>
                            <select
                                id="product_type_id"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={(e) => setData('product_type_id', e.target.value)}
                                value={data.product_type_id}
                            >
                                <option value="">Selecciona un tipo de producto</option>
                                {product_types.map((product: ProductTypeData, index: number) => (
                                    <option key={index} value={product.id}>{product.name}</option>
                                ))}
                            </select>
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
