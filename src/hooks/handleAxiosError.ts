import { AxiosError } from 'axios';
import { isNetworkError } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

interface User {
    id: string;
    user_id: string;
    email: string;
    name: string;
    driver_license: string;
    avatar: string;
    token: string;
}

export interface IToastMessage {
    title: string;
    description?: string;
    duration?: number;
}

interface IHandleAxiosError {
    toasts: IToastMessage[];
    isSignOut: boolean;
    isReturn: boolean;
    error: AxiosError;
}

const handleAxiosError = (error: AxiosError): IHandleAxiosError => {
    const userStorageKey = '@horus:user';
   
    const [token, setToken] = useState<User>({} as User);
    const toasts: IToastMessage[] = [];

    let isSignOut = false;
    let isReturn = false;
    
    useEffect(() => {
        async function loadUserStorageDate() {
            const userStorage = await AsyncStorage.getItem(userStorageKey);
            if (userStorage) {
                const userLogged = JSON.parse(userStorage) as User;
                setToken(userLogged);
            }
        }

        loadUserStorageDate();
    }, []);
    console.log("userStorageKey ",token);
    if (isNetworkError(error)) {
        toasts.push({
            title: 'Erro na conexão',
            description: 'Você está sem acesso à internet ou o servidor está off-line.',
        });

        isReturn = true;
    }

    if (error.response?.status === 301) {
        const { data } = error.response;

        if (data.message) {
            toasts.push({
                title: data.message,
                duration: 20,
            });
        }
    }

    if (error.response?.status === 400) {
        if (error.response.data?.errors) {
            error.response.data?.errors.forEach((item: any) => {
                toasts.push({
                    title: item.message,
                });
            });
        } else if (error.response?.status === 400) {
            toasts.push({
                title: error.response.data.message,
                duration: error.response.data.time || 5,
            });
        }
    }

    if (error.response?.status === 401) {
        console.log("error.response", error.response)
        if (error.response.data.message) {
            toasts.push({
                title: error.response.data.message,
            });
        } else {
            toasts.push({
                title: 'Sessão expirada.',
                description: 'Sua sessão expirou, ou você foi desconectado. Faça login outra vez.',
            });
        }

        isSignOut = true;
    }

    if (error.response?.status === 403) {
        if (token.token) {
            toasts.push({
                title: 'Sem permissão',
                description: 'Você tentou acessar um recurso o qual não possui permissão.',
            });
        }
    }

    if (error.response?.status === 405) {
        if (error.response.data.message) {
            toasts.push({
                title: error.response.data.message,
                duration: error.response.data?.time || 5,
            });
        }

        isReturn = true;
    }

    if (error.response?.status === 429) {
        toasts.push({
            title: 'Atenção',
            description: 'Você está fazendo muitas requisições para o servidor.',
        });
    }
    if (error.response?.status === 500) {
        toasts.push({
            title: 'Erro',
            description: 'O servidor não conseguiu processar sua requisição.',
        });
    }

    return {
        toasts,
        isSignOut,
        isReturn,
        error,
    };
};

export default handleAxiosError;