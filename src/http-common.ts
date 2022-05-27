import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
    baseURL: 'https://infinite-connect.herokuapp.com',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('infinitec_api_token')
    },
});

export default apiClient;
