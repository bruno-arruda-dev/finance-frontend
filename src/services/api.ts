import axios from 'axios';
import { HandleSessionStorage } from '../utils/session-storage';

const baseURL = import.meta.env.VITE_BASE_URL;
const user = HandleSessionStorage.getUserData();

const Api = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
    }
});

export default Api;