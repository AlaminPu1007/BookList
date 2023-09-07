/**
 * create of instance of axios,
 * we can call our route at any where with token
 */
import axios from 'axios';
//@ts-ignore
import {API_URL} from '@env';

const instance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(
    config => {
        const token = null;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

export default instance;
