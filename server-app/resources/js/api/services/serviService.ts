import api from '@/api/AxiosIntance';

const deleteService = async (id: number): Promise<{ code: number; message: string; success: boolean;  }> => {
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

const toGoBackService = async (service_id: number, status_service_id: number): Promise<{ code: number; message: string; success: boolean;  }> => {
    try {
        const formData = new FormData();
        formData.append('service_id', service_id.toString());
        formData.append('status_service_id', status_service_id.toString())
        const response = await api.post('/to-go-back/service', formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    } catch (e) {
        console.log(e, 'AXIOS ERROR')
        return {
            code: 500,
            message: 'Error',
            success: false
        }
    }
}
export {deleteService, toGoBackService}
