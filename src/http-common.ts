import axios, { AxiosInstance } from 'axios';
import env from '../env';

const apiClient: AxiosInstance = axios.create({
    baseURL: env.BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Token ' + localStorage.getItem(env.TOKEN)
    },
});

export default apiClient;
