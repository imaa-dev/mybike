import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import {
    BreadcrumbItem,
    ClientDataProp,
    ProductDataProp, Reasons,
    ServiData
} from '@/types';
import InputError from '@/components/input-error';
import toast, { Toaster } from 'react-hot-toast';
import { FormEventHandler, useState } from 'react';
import { Button } from '@/components/ui/button';
import { handleImageUploadMultiple } from '@/lib/utils';
import { useLoading } from '@/context/LoadingContext';
import { Card } from '@/components/ui/card';
import { SidebarGroupLabel } from '@/components/ui/sidebar';
import { Plus, Save, X } from 'lucide-react';
import { uploadImages, deleteImage } from '@/api/services/filesUpload';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Servicios',
        href: '/service'
    },
    {
        title: 'Actualizar',
        href: '/service'
    },
]

interface ServiProp {
    servi: ServiData
}
export interface ServiForm {
    organization_id: number;
    product_id: number;
    client_id: number;
    date_entry: string;
}
const appUrl = import.meta.env.VITE_APP_URL;
export default function ManageServiceForm({ servi, clients, products }: ServiProp & ProductDataProp & ClientDataProp) {
    const { showLoading, hideLoading } = useLoading();
    const [fileToDelete, setFileToDelete] = useState<number>(0);

    const [show, setShow] = useState<boolean>(false);
    const [reason, setReason] = useState<string>('');
    const [reasons, setReasons] = useState<Reasons[]>(servi.reasons)
    const [files, setFiles] = useState(servi.file ?? []);
    const { data, setData, post, errors, processing } = useForm<Required<ServiForm>>({
        organization_id: servi.organization_id,
        product_id: servi.product_id,
        client_id: servi.client_id,
        date_entry: servi.date_entry,
    });

    const removeImage = async (id: number) => {
        const response = await deleteImage(id)
        if(response.code === 200){
            toast.success(response.message)
            setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
        }
        if(response.code === 500){
            toast.error('Error en el servidor')
        }
    }
    const uploadImage = async (file: File[], id: number) => {
        const response = await uploadImages(file, id)
        if(response.code === 200){
            toast.success(response.message)
            setFiles(response.file);
        }
    }
    const uploadReason = async (reason: string, id: number) => {
        const response = await uploadReason(reason, id)
        if(response.code === 200 && response.success === true){
            toast.success(response.message)
            setReasons(response.reasons)
        }
    }
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data);return
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
            <div className="flex h-full flex-1 flex-col items-center justify-center gap-4 rounded-xl">
                <div className="relative m-5 overflow-x-auto shadow-md sm:rounded-lg">
                    <form onSubmit={submit} >
                        <h2
                            className="text-sidebar-foreground/70 ring-sidebar-ring flex shrink-0 items-center rounded-md pl-7 pt-7 text-base font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0"
                         >
                            Actualizar servicio
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
                              <div className="grou relative z-0 mt-5 w-full">
                                  <Button type="submit" className="mt-4 w-full" tabIndex={6} disabled={processing}>
                                      <Save /> Actualizar Datos
                                  </Button>
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
                                      htmlFor="floating_email"
                                      className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
                                  >
                                      Agregar detalle ingreso de servicio
                                  </label>
                              </div>
                              <Button
                                  type="button"
                                  onClick={() => {
                                      if(reason.trim() === ''){
                                          toast.error('El detalle de ingreso no puede ir vacio')
                                          return
                                      }
                                      uploadReason(reason, servi.id)
                                      setReason('')
                                  }}
                                  className="mt-4 w-full"
                              >
                                  <Plus /> Agregar Detalle
                              </Button>
                              {reasons.length > 0 && (
                                  <div className="mt-6">
                                    <h3 className="text-sm font-semibold text-gray-700 dark:text-white mb-2">Detalles agregados:</h3>
                                    <ul className="list-disc pl-5 text-sm text-gray-800 dark:text-white space-y-1">
                                      {reasons.map((item, index) => (
                                        <li key={index} className="flex justify-between items-center">
                                          {item.reason_note}
                                          <button
                                            type="button"
                                            className="text-red-500 text-xs ml-2"
                                            onClick={() => {
                                              //const updated = data.reason_notes.filter((_, i) => i !== index);

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
                              <SidebarGroupLabel>Fotos y registros del servicio </SidebarGroupLabel>
                              {files.length > 0 ? (
                                   <div className="mt-4 grid grid-cols-3 gap-3">
                                       {files.map((item, index) => (
                                           <div key={index} className="relative">
                                               <img
                                                   src={`${appUrl}/storage/${item.path}`}
                                                   alt={`preview-${index}`}
                                                   className="w-full h-28 object-cover rounded border"
                                               />
                                               <button
                                                   type="button"
                                                   onClick={() => {
                                                       setShow(true)
                                                       setFileToDelete(item.id)
                                                   }}
                                                   className="absolute top-1 right-1 p-1 m-1 rounded-full bg-red-600 text-white text-xs opacity-80 hover:opacity-100"
                                                   title="Eliminar imagen"
                                               >
                                                   <X width={13} />
                                               </button>
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
                                          showLoading();
                                          const file = e.target.files;

                                          if (file) {
                                              handleImageUploadMultiple(file)
                                              .then( (res) => {
                                                uploadImage(res, servi.id)
                                                hideLoading();
                                              })
                                              .catch((err) => {
                                                  toast.error('Error al comprimir la imagen');
                                                  console.log('ONCHANGE_INPUT_FILE_ERROR', err);
                                                  hideLoading();
                                              });
                                          }
                                      }}
                                  />
                                  <label
                                      htmlFor="floating_email"
                                      className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
                                  >
                                      Fotos
                                  </label>
                              </div>
                          </Card>

                          <Toaster />
                    </form>
                </div>
            </div>
            <Toaster />
            {show && (
                <div className="fixed top-0 right-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50">
                    <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-700">
                        <h3 className="mb-4 text-lg text-gray-800 dark:text-gray-200">
                            ¿Deseas eliminar la imagen?
                        </h3>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => {
                                    removeImage(fileToDelete)
                                    setShow(false);
                                }}
                                className="me-2 mb-2 rounded-lg border border-red-700 px-5 py-2.5 text-center text-sm font-medium text-red-700 hover:bg-red-800 hover:text-white focus:ring-4 focus:ring-red-300 focus:outline-none dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900"
                            >
                                Si, Eliminar
                            </button>
                            <button
                                onClick={() => {
                                    setShow(false)
                                }}
                                type="button"
                                className="me-2 mb-2 rounded-lg border border-gray-800 px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white focus:ring-4 focus:ring-gray-300 focus:outline-none dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-800"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
