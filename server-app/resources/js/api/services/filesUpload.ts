import axios from 'axios';
import { FileResponse } from '@/types';
const appUrl = import.meta.env.VITE_APP_URL;

const deleteImage = async (id: number): Promise<{ code: number; message: string; success: string }> => {
    try {
        const response = await axios.delete(`${appUrl}/delete-image-service/${id}`,{
            withCredentials: true,
        })
        return response.data
    } catch (error: unknown) {
        if(axios.isAxiosError(error)){
            return {
                code: error?.response?.status || 500,
                message: error?.response?.data?.message || 'Error inesperado al eliminar la imagen',
                success: 'true'
            }
        }
        return {
            code: 500,
            message: 'Error desconocido',
            success: 'false'
        };
    }
}
 const uploadImages = async (file: File[], id: number): Promise<FileResponse> => {
    const formData = new FormData();
    file.forEach(file => formData.append('file[]', file));
    formData.append('service_id', id.toString())
    try {
        const response = await axios.post(`${appUrl}/upload-image-service`,formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    } catch (error) {
        if(axios.isAxiosError(error)){
            return {
                code: error?.response?.status || 500,
                message: error?.response?.data?.message || 'Error inesperado al subir imagen',
                success: true,
                file: []
            }
        }
        return {
            code: 500,
            message: 'Error',
            success: false,
            file: []
        }
    }
}

export { uploadImages, deleteImage }
