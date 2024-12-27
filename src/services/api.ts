import axios from 'axios';
import { HandleSessionStorage } from '../utils/session-storage';
import { toastError } from '../utils/toast-utils';

const baseURL = import.meta.env.VITE_BASE_URL;
const user = HandleSessionStorage.getUserData();

const Api = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user?.token}`
    }
});

Api.interceptors.response.use(
    response => response,
    error => {
        if (!error.response) {
            toastError('Ocorreu algum problema. Por favor tente denovo mais tarde');
        }

        return Promise.reject(error);
    }
);

export default Api;
