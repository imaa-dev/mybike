import { AxiosError } from 'axios';

export function errorHandler (error: AxiosError | unknown) {
    if(error instanceof AxiosError) {
        if(error.status === 422){
            return {
                code: error.status,
                message: error?.response?.data.errors,
                success: false
            }
        }
        if(error.code === 'ERR_NEWORK'){
            return {
                code: error.code,
                message: 'Error del servidor',
                success: false
            }
        }
        if(error.code === 'ERR_BAD_RESPONSE'){
            return {
                code: error.code,
                message: error.message,
                success: false
            }
        }
    }
    return {
        code: 500,
        message: 'ERROR',
        success: false
    }
}
