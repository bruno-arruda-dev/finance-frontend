import { isAuth } from '@/utils/isAuth';
import axios from 'axios';

const baseURL = 'http://localhost:3333';

const { token } = isAuth();

const Api = axios.create({
    baseURL: baseURL,
    headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
    }
});

export default Api;