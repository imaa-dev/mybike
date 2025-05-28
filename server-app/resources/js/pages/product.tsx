import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Productos',
        href: '/produc',
    },
];

type CreateProductForm = {
    name: string,
    description: string,
    brand: string,
    model: string,
    file?: File[],
};
export default function Product(){
    const { data, setData, post, processing, errors, reset } = useForm<Required<CreateProductForm>>({
        name: '',
        description: '',
        brand: '',
        model: '',
        file: null
    })

    const submit:FormEventHandler = (e) => {
        e.preventDefault();
        post('create/product')
    }
    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Productos" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <form className="max-w-md mx-auto" onSubmit={submit}>
                        <img src='engran.png' />
                        <div className="relative z-0 w-full mb-5 grou">
                            <input type="file"
                                   name="file_product[]"
                                   id="file_product"
                                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                   autoFocus
                                   multiple
                                   tabIndex={1}
                                   autoComplete="file"
                                   onChange={(e) => setData('file', e.target.files ? Array.from(e.target.files) : [])}
                                   required
                            />
                        </div>
                        <div className="relative z-0 w-11111full mb-5 group">
                            <input type="text"
                                   name="name_product"
                                   id="name_product"
                                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                   placeholder="Nombre Producto"
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
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
                        <Button type="submit" className="mt-4 w-full" tabIndex={4}>
                            Crear Producto
                        </Button>

                    </form>
                </div>
            </div>
        </AppLayout>
    )
}
