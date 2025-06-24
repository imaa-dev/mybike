import api from '@/api/AxiosIntance';

const deleteService = async (id: number): Promise<{ code: number; message: string; success: boolean,  }> => {
    try {
        const response = await api.delete(`/delete/service/${id}`)
        return response.data
    } catch (error) {
        console.log(error, 'AXIOS ERROR')
        return {
            code: 500,
            message: 'Error desconocido',
            success: false
        };
    }
}
export {deleteService}
