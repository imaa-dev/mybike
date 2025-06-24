import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import {
    BreadcrumbItem,
    ClientDataProp,
    ProductDataProp,
    Page, ServiDataForm
} from '@/types';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { FormEventHandler, useState } from 'react';
import { handleImageUploadMultiple } from '@/lib/utils';
import { useLoading } from '@/context/LoadingContext';
import { Card } from '@/components/ui/card';
import { Plus, Save } from 'lucide-react';
import { SidebarGroupLabel } from '@/components/ui/sidebar';
import { useToast } from '@/context/ToastContext';

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

const appUrl = import.meta.env.VITE_APP_URL;

export default function CreateServis({clients, products} : ClientDataProp & ProductDataProp) {
    const { success, error } = useToast()
    const [reason, setReason] = useState<string>('');
    const [uploadImage, setUploadImage] = useState<string[]>([]);
    const { showLoading, hideLoading } = useLoading();
    const handleImageChange = (files: File[]) => {
        const urls = Array.from(files).map((file) => URL.createObjectURL(file));
        setUploadImage((prev) => [...prev, ...urls]);
    }
    const page: Page = usePage();
    const { post, data, setData, errors, processing } = useForm<Required<ServiDataForm>>({
            organization_id: page.props.organization.id,
            product_id: 0,
            client_id: 0,
            date_entry: '',
            reason_notes: [],
            file: null,
    })
    const submit:FormEventHandler = (e) => {
        e.preventDefault();
         post('/create/service', {
             onSuccess: (page) => {
                 const message = (page.props as { flash?: { message?: string } }).flash?.message;
                 if (message) {
                     success(message);
                 }
             },
             onError: (e) => {
                 error(e.message)
                 console.log(e,'ERROR POST')
             }
         })
    }
     return (
         <AppLayout breadcrumbs={breadcrumbs}>
             <Head title="Servicio" />
             <div className="flex h-full flex-1 flex-col items-center justify-center gap-4 rounded-xl">
                 <div className="relative m-5 overflow-x-auto shadow-md sm:rounded-lg">
                     <form onSubmit={submit}>
                         <h2
                            className="text-sidebar-foreground/70 ring-sidebar-ring flex shrink-0 items-center rounded-md pl-7 pt-7 text-base font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0"
                         >
                            Crear nuevo servicio
                         </h2>
                         <Card className="m-5 mt-10 max-w-xl p-6">
                             <SidebarGroupLabel> Datos del servicio </SidebarGroupLabel>
                             <div className="group relative z-0 mb-5 w-full">
                                 <input
                                     tabIndex={0}
                                     type="datetime-local"
                                     name="date_entry"
                                     id="date_entry"
                                     className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                                     autoComplete="off"
                                     value={data.date_entry}
                                     onChange={(e) => setData('date_entry', e.target.value)}
                                     required
                                 />
                                 <label
                                     htmlFor="floating_email"
                                     className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
                                 >
                                     Fecha Ingreso Servicio
                                 </label>
                                 <InputError message={errors.date_entry} />
                             </div>
                             <div className="group relative z-0 mb-5 w-full">
                                 <label htmlFor="products" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                     Producto
                                 </label>
                                 <select
                                     id="product"
                                     className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                     onChange={(e) => setData('product_id', Number(e.target.value))}
                                     value={data.product_id}
                                 >
                                     <option value="">Selecciona un producto</option>
                                     {products.map((product, index) => (
                                         <option key={index} value={product.id}>
                                             {product.type}{' '}{product.brand}{' '}{product.model}
                                         </option>
                                     ))}
                                 </select>
                                 <InputError message={errors.product_id} />
                             </div>

                             <div className="group relative z-0 mb-5 w-full">
                                 <label htmlFor="clients" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                     Cliente
                                 </label>
                                 <select
                                     id="client"
                                     className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                     onChange={(e) => setData('client_id', Number(e.target.value))}
                                     value={data.client_id}
                                 >
                                     <option value="">Selecciona un cliente</option>
                                     {clients.map((client, index) => (
                                         <option key={index} value={client.id}>
                                             {client.name}
                                         </option>
                                     ))}
                                 </select>
                             </div>
                         </Card>
                         <Card className="m-5 mt-10 max-w-xl p-6">
                             <SidebarGroupLabel> Detalles del ingreso </SidebarGroupLabel>
                             <div className="group relative z-0 mb-5 w-full">
                                 <input
                                     type="text"
                                     name="reason"
                                     id="reason"
                                     className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                                     tabIndex={3}
                                     value={reason}
                                     onChange={(e) => {
                                         setReason(e.target.value);
                                     }}
                                 />
                                 <label
                                     htmlFor="reason"
                                     className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
                                 >
                                     Agregar detalle ingreso de servicio
                                 </label>
                             </div>
                             <Button
                                 type="button"
                                 onClick={() => {
                                     if(reason.trim() === ''){
                                         error('El detalle de ingreso no puede ir vacio')
                                         return
                                     }
                                     setData('reason_notes', [...data.reason_notes, {reason_note: reason}])
                                     setReason('')
                                 }}
                                 className="mt-4 w-full"
                             >
                                 <Plus /> Agregar Detalle
                             </Button>
                             {data.reason_notes.length > 0 && (
                                 <div className="mt-6">
                                   <h3 className="text-sm font-semibold text-gray-700 dark:text-white mb-2">Detalles agregados:</h3>
                                   <ul className="list-disc pl-5 text-sm text-gray-800 dark:text-white space-y-1">
                                     {data.reason_notes.map((item, index) => (
                                       <li key={index} className="flex justify-between items-center">
                                         {item.reason_note}
                                         <button
                                           type="button"
                                           className="text-red-500 text-xs ml-2"
                                           onClick={() => {
                                             const updated = data.reason_notes.filter((_, i) => i !== index);
                                             setData('reason_notes', updated);
                                           }}
                                         >
                                           Eliminar
                                         </button>
                                       </li>
                                     ))}
                                   </ul>
                                 </div>
                               )}
                         </Card>
                         <Card className="m-5 mt-5 max-w-xl p-6">
                             <SidebarGroupLabel> Fotos y registros del servicio </SidebarGroupLabel>
                             {uploadImage.length > 0 ? (
                                 <div className="mt-4 grid grid-cols-3 gap-3">
                                     {uploadImage.map((src, index) => (
                                         <div key={index} className="relative">
                                             <img
                                                 src={src}
                                                 alt={`preview-${index}`}
                                                 className="w-full h-28 object-cover rounded border"
                                             />
                                         </div>
                                     ))}
                                 </div>
                             ) : (
                                 <div className="group relative flex justify-center items-center">
                                     <img className="w-50" src={`${appUrl}/images/max-img.png`} alt="Upload Image" />
                                 </div>
                             )}
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
                                         setUploadImage([])
                                         showLoading();
                                         const file = e.target.files;
                                         if (file) {
                                             handleImageUploadMultiple(file)
                                                 .then((res) => {
                                                     setData('file', res);
                                                     handleImageChange(res);
                                                     hideLoading();
                                                 })
                                                 .catch((err) => {
                                                     error('Error al comprimir la imagen');
                                                     console.log('ONCHANGE_INPUT_FILE_ERROR', err);
                                                     hideLoading();
                                                 });
                                         }
                                     }}
                                 />
                                 <label
                                     htmlFor="file"
                                     className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
                                 >
                                     Fotos
                                 </label>
                                 <InputError message={errors.file} />
                             </div>
                         </Card>
                         <div className="grou relative z-0 mt-5 w-full p-5">
                             <Button type="submit" className="w-full p-8" tabIndex={6} disabled={processing}>
                                 <Save /> Crear Servicio
                             </Button>
                         </div>
                     </form>
                 </div>
             </div>
         </AppLayout>
     );
}
