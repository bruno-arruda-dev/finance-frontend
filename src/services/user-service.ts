import { toastError } from '@/utils/toast-utils';
import axios from 'axios';
import Api from './api';
import { TUserDataFormSchema } from '@/forms/UserDataForm/UserDataFormController';

const p = 'http://localhost:3333'

class UserService {
    static async GetUser() {
        try {
            const res = await Api.get(p + '/users')

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

    static async UpdateUser(data: TUserDataFormSchema) {
        try {
            const res = await Api.put(p + '/users', data);

            return res;
        } catch (error) {
            throw error
        }
    }
}

export { UserService };