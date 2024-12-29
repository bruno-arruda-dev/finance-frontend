import axios from 'axios';
import { HandleSessionStorage } from '../utils/session-storage';
import { toastError } from '../utils/toast-utils';

const baseURL = import.meta.env.VITE_BASE_URL;

const Api = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    }
});

Api.interceptors.request.use(config => {
    const user = HandleSessionStorage.getUserData();
    if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
});

Api.interceptors.response.use(
    response => response,
    error => {
        if (!error.response) {
            toastError('Ocorreu algum problema. Por favor tente novamente mais tarde');
        }
        return Promise.reject(error);
    }
);

export default Api;