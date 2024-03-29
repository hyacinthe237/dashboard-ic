import axios, { AxiosInstance } from 'axios';
import env from '../env';
import AuthService from './middleware/auth';
import Swal from 'sweetalert2';

const apiClient: AxiosInstance = axios.create();
apiClient.defaults.baseURL = env.BASE_URL
apiClient.defaults.headers.common['Content-Type'] = 'application/json;charset=utf-8'
apiClient.defaults.headers.common['Accept'] = 'application/json;multipart/form-data;'

const token: any = localStorage.getItem(`${env.TOKEN}`)
if (token !== null) {
    apiClient.defaults.headers.common['Authorization'] = 'Token ' + token
}

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
