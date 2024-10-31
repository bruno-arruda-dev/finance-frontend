'use client';

import axios from 'axios';

const baseURL = process.env.BASE_URL;

const Api = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default Api;