import api from '@/api/AxiosIntance';

const deleteOrganization = async (id: number): Promise<{ code: number; message:string; success: boolean }> => {
    try{
        const response = await api.delete(`/organization/delete/${id}`)
        return response.data
    }catch(error){
        console.log(error, "AXIOS ERROR")
        return {
            code: 500,
            message: 'Error',
            success: false,
        }
    }
}
export { deleteOrganization }
