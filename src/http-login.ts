import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
    baseURL: 'http://infinite-connect.herokuapp.com',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    },
});

export default apiClient;
