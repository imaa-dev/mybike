import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, ProductData } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import ButtonAdd from '@/components/button-add';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Productos',
        href: '/product',
    }
];
interface ProductDataProp {
    products: ProductData[];
}
export default function Product({products}: ProductDataProp){
    const { post } = useForm({});
    const [modal, setModal] = useState(false);
    const [productDelete, setProductDelete] = useState(0);
    const deleteProduct = (id: number) => {
        post(`/delete/product/${id}`, {
            onSuccess: (page) => {
                const message = (page.props as { flash?: { message?: string } }).flash?.message;
                if (message) {
                    toast.success(message);
                }
            },
            onError: (error) => {
                console.log('ERROR', error)
            },
        })
    }
    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Productos" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <ButtonAdd route="/create/product" />
                <div className="flex h-full flex-1 flex-col items-center  gap-4 rounded-xl">
                    <div className="w-full overflow-x-auto">
                        <div className="min-w-[600px] relative shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead
                                className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>

                                <th scope="col" className="px-6 py-3">
                                    Tipo
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Modelo
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Marca
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.map((product: ProductData, index) => (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {product.type}
                                    </td>
                                    <td className="px-6 py-4">
                                        {product.model}
                                    </td>
                                    <td className="px-6 py-4">
                                        {product.brand}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                router.visit(`/update/${product.id}/product`)
                                            }}
                                            className="me-2 mb-2 rounded-lg border border-blue-700 px-5 py-2.5 text-center text-sm font-medium text-blue-700 hover:bg-blue-800 hover:text-white focus:ring-4 focus:ring-blue-300 focus:outline-none dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
                                        >
                                            Actualizar
                                        </button>

                                        <button
                                            className="me-2 mb-2 rounded-lg border border-red-700 px-5 py-2.5 text-center text-sm font-medium text-red-700 hover:bg-red-800 hover:text-white focus:ring-4 focus:ring-red-300 focus:outline-none dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900"
                                            type="button"
                                            onClick={() => {
                                                setModal(true);
                                                setProductDelete(product.id)
                                            }}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    </div>
                </div>
            </div>
            {modal && (
                <div
                    className="fixed top-0 right-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50">
                    <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-700">
                        <h3 className="mb-4 text-lg text-gray-800 dark:text-gray-200">¿Realmente quieres eliminar el producto?</h3>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => {
                                    if (productDelete !== null) deleteProduct(productDelete);
                                    setModal(false);
                                }}
                                className="me-2 mb-2 rounded-lg border border-red-700 px-5 py-2.5 text-center text-sm font-medium text-red-700 hover:bg-red-800 hover:text-white focus:ring-4 focus:ring-red-300 focus:outline-none dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900"
                            >
                                Sí, eliminar
                            </button>
                            <button
                                onClick={() => setModal(false)}
                                type="button"
                                className="me-2 mb-2 rounded-lg border border-gray-800 px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white focus:ring-4 focus:ring-gray-300 focus:outline-none dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-800"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Toaster />
        </AppLayout>
    )
}
