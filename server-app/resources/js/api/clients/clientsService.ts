import api from '@/api/AxiosIntance';
import { Client } from '@/types';
import { AxiosError } from 'axios';
import { errorHandler } from '@/utils/errorHandler';

const deleteClient = async (id: number): Promise<{ code: number; message: string; success: boolean }> => {
    try {
        const response = await api.delete(`/delete/client/${id}`)
        return response.data
    } catch (error){
        console.log(error, "ERROR")
        return {
            code: 500,
            message: 'Error',
            success: false
        };
    }
}
type CreateClientSuccess = {
    code: number | string;
    message: string | Record<keyof Client, string>;
    success: boolean;
    client?: Client;
};

const createClient = async (data: Client): Promise<CreateClientSuccess> => {
    try {
        const response = await api.post(`/create/client`, data ,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data;
    } catch (error: AxiosError | unknown) {
        return errorHandler(error)
    }
}
export { deleteClient, createClient };
