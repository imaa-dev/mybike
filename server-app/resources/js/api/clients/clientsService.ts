import api from '@/api/AxiosIntance';
import { Client, ClientDataProp } from '@/types';

const deleteClient = async (id: number): Promise<{ code: number; message: string; success: boolean }> => {
    try {
        const response = await api.delete(`/delete/client/${id}`)
        return response.data
    } catch (error){
        console.log(error, "ERROR AXIOS")
        return {
            code: 500,
            message: 'Error desconocido',
            success: false
        };
    }
}

const createClient = async (data: Client): Promise<{ code: number; message: string, success: boolean, client: Client }> => {
    try {
        const response = await api.post(`/create/client`, data ,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data;
    } catch (error) {
        return error.response?.data?.errors;
    }
}
export { deleteClient, createClient };
