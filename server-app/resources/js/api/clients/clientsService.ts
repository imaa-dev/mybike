import api from '@/api/AxiosIntance';

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

export { deleteClient }
