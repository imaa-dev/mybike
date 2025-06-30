import api from '@/api/AxiosIntance';
import { ProductData } from '@/types';

const deleteProduct = async (id: number): Promise <{ code: number; message: string; success: boolean }> => {
    try {
        const response = await api.delete(`/delete/product/${id}`)
        return response.data
    } catch (error) {
        console.log(error, 'AXIOS ERROR')
        return {
            code: 500,
            message: 'Error desconocido',
            success: false
        }
    }
}
const createProduct = async (data: ProductData): Promise <{ code: number; message: string, success: boolean, product: ProductData }> => {
    try {
        const response = await api.post("create/product", data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    } catch (error) {
        console.log(error, 'AXIOS ERROR')
        return {
            code: 500,
            message: 'Error desconocido',
            success: false,
            product: {} as ProductData
        }
    }
}
export { deleteProduct, createProduct }
