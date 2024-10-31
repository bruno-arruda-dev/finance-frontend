import { isAuth } from '@/utils/isAuth';
import axios from 'axios';

const baseURL = process.env.BASE_URL;

const { token } = isAuth();

const Api = axios.create({
    baseURL: baseURL,
    headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
    }
});

export default Api;