import { toastError } from '@/app/utils/toast-utils';
import axios, { AxiosError } from 'axios';

const p = 'http://localhost:3333'

class LoginService {
    static async Register(data: any) {
        try {
            const res = await axios.post(p + '/users', data)
            return res
        } catch (error: any) {
            if (error.response.status === 409) toastError(error.response.data.message)
            throw error;
        }
    }

    static async Login(data: any) {
        try {
            const res = await axios.post(p + '/login', data)
            return res
        } catch (error: any) {
            if (error.response.status === 401) toastError('Email ou senha incorretos')
            if (error.response.status === 404) toastError('Email ou senha incorretos')
            throw error
        }
    }
}

export { LoginService }