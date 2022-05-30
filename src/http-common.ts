import axios, { AxiosInstance } from 'axios';
import env from '../env';
import AuthService from './middleware/auth';
import Swal from 'sweetalert2';

const apiClient: AxiosInstance = axios.create({
    baseURL: env.BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

apiClient.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('infinite_api_token')
// Intercept all 401
apiClient.interceptors.response.use(response => {
    return response
}, error => {
    if (error.response.status === 401) {
        AuthService.logout()
        location.reload()

        Swal.fire({ title: 'Something wrong', html: error.response.data });
    }
    return Promise.reject(error)
})

export default apiClient;
