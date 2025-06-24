import api from '@/api/AxiosIntance';

const deleteProduct = async (id: number): Promise <{ code: number, message: string; success: boolean }> => {
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

export { deleteProduct }
