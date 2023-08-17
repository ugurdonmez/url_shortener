import axios, { AxiosResponse, AxiosError } from 'axios';

export interface ErrorResponse {
    status: string;
    timestamp: string;
    message: string;
    debugMessage: string | null;
    subErrors: string[] | null;
}

export interface ShortenResponse {
    originalUrl: string;
    shortUrl: string;
    creationDate: string;
}

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080',
});

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        if (!navigator.onLine) {
            return Promise.reject('You are currently offline. Please check your connection.');
        }

        if (error.response && error.response.status === 503) {
            return Promise.reject('Server is currently unavailable. Please try again later.');
        }

        if (error.response && error.response.data) {
            const errData = error.response.data as ErrorResponse;
            return Promise.reject(errData.message);
        }

        if (!error.response) {
            return Promise.reject('Server is offline or not reachable. Please check back later.');
        }

        return Promise.reject('An error occurred. Please try again.');
    }
);

export const shortenUrl = (originalUrl: string): Promise<AxiosResponse<ShortenResponse>> => {
    return api.post<ShortenResponse>('/shorten', { originalUrl });
};

export const getLongUrl = (shortUrl: string): Promise<AxiosResponse<ShortenResponse>> => {
    return api.get<ShortenResponse>(`/${shortUrl}`);
};
