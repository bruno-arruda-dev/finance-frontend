import { toastError } from '@/utils/toast-utils';
import Api from './api';
import { TUserDataFormSchema } from '@/forms/UserDataForm/UserDataFormController';

const p = process.env.NEXT_PUBLIC_BASE_URL;

class UserService {
    static async GetUser(token?: string) {
        try {
            const res = await Api.get(p + '/users', {
                headers: {
                    "Authorization": token ? `Bearer ${token}` : ''
                }
            })

            return res
        } catch (error) {
            throw error;
        }
    }

    static async Register(data: any) {
        try {
            const res = await Api.post(p + '/users', data)
            return res
        } catch (error: any) {
            if (error.response.status === 409) toastError(error.response.data.message)
            throw error;
        }
    }


    static async UpdateUser(data: TUserDataFormSchema, token?: string) {
        try {
            const res = await Api.put(p + '/users', data, {
                headers: {
                    "Authorization": token ? `Bearer ${token}` : ''
                }
            });

            return res;
        } catch (error) {
            throw error
        }
    }

    static async Login(data: any) {
        try {
            const res = await Api.post(p + '/login', data);
            return res;
        } catch (error: any) {
            if (error.response.status === 401) toastError('Email ou senha incorretos')
            if (error.response.status === 404) toastError('Email ou senha incorretos')
            throw error;
        }
    }
}


export { UserService };
