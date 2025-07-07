import api from '@/api/AxiosIntance';
import { Client } from '@/types';
import { errorHandler } from '@/utils/errorHandler';

type ClientResponse = {
    code: number | string;
    message: string | Record<keyof Client, string>;
    success: boolean;
    client?: Client;
};

const deleteClient = async (id: number): Promise<ClientResponse> => {
    try {
        const response = await api.delete(`/delete/client/${id}`)
        return response.data
    } catch (error: unknown){
        return errorHandler(error);
    }
}

const createClient = async (data: Client): Promise<ClientResponse> => {
    try {
        const response = await api.post(`/create/client`, data ,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data;
    } catch (error: unknown) {
        return errorHandler(error)
    }
}
export { deleteClient, createClient };
