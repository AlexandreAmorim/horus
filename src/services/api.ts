import axios, {
    AxiosError,
    AxiosRequestConfig as IAxiosRequestConfig,
} from 'axios';

export type AxiosRequestConfig = IAxiosRequestConfig;

const api = axios.create({
    baseURL: 'https://dev.segurancapresente.com.br',
    headers: {
        accessControlAllowOrigin: '*',
        accessControlAllowHeader: 'Origin, X-Requested-With, Content-Type, Accept',
    },
    timeout: 200000,
});

export const isNetworkError = (err: AxiosError): boolean => !!err.isAxiosError && !err.response;

api.defaults.headers.Accept = 'application/json';

export { api };