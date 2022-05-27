import axios, { AxiosInstance } from 'axios';

const token: any = localStorage.getItem('infinitec_api_token')
const apiClient: AxiosInstance = axios.create({
    baseURL: 'https://infinite-connect.herokuapp.com',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Token ' + token
    },
});

export default apiClient;
