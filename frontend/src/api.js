import axios from 'axios';


const API_URL = 'http://127.0.0.1:8000/api';

const apiClient = axios.create({
    baseURL: API_URL,
});

// MAGic: we use an 'interceptor' to automatically add the Authorization header to every single request sent by this client.
apiClient.interceptors.request.use(
    (config) => {
        //
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;