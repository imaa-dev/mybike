import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, ButtonItem } from '@/types';
import ButtonTop from '@/components/button-top';
import { FormEventHandler } from 'react';

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

const buttonItems : ButtonItem[] = [
    {
        title: 'Crear',
        href: '/create/product',
    },
    {
        title: 'Listar',
        href: '/product',
    }
]
type CreateProductForm = {
    name: string,
    description: string,
    brand: string,
    model: string,
    file: File
}
export default function CreateProductForm() {

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
    return (
        <AppLayout breadcrumbs={breadcrumbs} >
            <Head title="Productos" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-5">
                <ButtonTop items={buttonItems} />
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">

                    <form
                        className="flex w-full flex-col justify-center gap-6 rounded-lg bg-white p-6 shadow-md md:p-10 dark:bg-gray-800"
                        onSubmit={submit}
                    >
                        <div id="create-product-carousel" className="relative w-full" data-carousel="slide">
                            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                                    <img src="http://localhost:8000/storage/carousel.png"
                                         className="absolute block w-100 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                                         alt="..." />
                                </div>
                                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                                    <img src="http://localhost:8000/storage/carousel.png"
                                         className="absolute block w-100 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                                         alt="..." />
                                </div>
                            </div>

                            <button type="button"
                                    className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                                    data-carousel-prev>
                                <span
                                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                    <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path
                                            d="M5 1 1 5l4 4" />
                                    </svg>
                                    <span className="sr-only">Previous</span>
                                </span>
                            </button>
                            <button type="button"
                                    className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                                    data-carousel-next>
                                <span
                                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                    <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path
                                            d="m1 9 4-4-4-4" />
                                    </svg>
                                    <span className="sr-only">Next</span>
                                </span>
                            </button>
                        </div>


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
