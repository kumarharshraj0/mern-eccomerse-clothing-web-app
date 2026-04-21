import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://mern-eccomerse-clothing-web-app-1.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false,
});

// Request Interceptor: Attach Access Token
API.interceptors.request.use(
    (config) => {
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

// Response Interceptor: Validate JSON
API.interceptors.response.use(
    (response) => {
        // If we get HTML instead of JSON, something is wrong with the proxy/config
        const contentType = response.headers['content-type'];
        if (contentType && contentType.includes('text/html')) {
            console.error('API Error: Received HTML instead of JSON. Check your proxy settings.');
            return Promise.reject(new Error('Received HTML instead of JSON'));
        }
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default API;


