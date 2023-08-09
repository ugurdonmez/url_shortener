import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080',
});

// Global error handling
api.interceptors.response.use(
    response => response,
    error => {

        if (!navigator.onLine) {
            return Promise.reject('You are currently offline. Please check your connection.');
        }

        if (error.response && error.response.status === 503) {
            return Promise.reject('Server is currently unavailable. Please try again later.');
        }

        if (error.response && error.response.data) {
            return Promise.reject(error.response.data.message);
        }

        if (!error.response) {
            return Promise.reject('Server is offline or not reachable. Please check back later.');
        }

        return Promise.reject('An error occurred. Please try again.');
    }
);

export const shortenUrl = (originalUrl) => {
    return api.post('/shorten', { originalUrl });
};

export const getLongUrl = (shortUrl) => {
    return api.get(`/${shortUrl}`);
};
