import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect
} from 'react';
import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
    id: string;
    user_id: string;
    email: string;
    name: string;
    driver_license: string;
    avatar: string;
    token: string;
}

interface SignInCredentials {
    document: string;
    password: string;
}

interface AuthContextData {
    user: User;
    signIn: (credentials: SignInCredentials) => Promise<void>;
    signOut: () => Promise<void>;
    userStorageLoading: boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [userStorageLoading, setUserStorageLoading] = useState(true);
    const userStorageKey = '@horus:user';
    const [data, setData] = useState<User>({} as User);

    async function signIn({ document, password }: SignInCredentials) {
        try {
            const response = await api.post('/auth/login', {
                document,
                password
            });

            const { token, user } = response.data;

            const userLogged = {
                id: user.id,
                email: user.email,
                name: user.name,
                token,
            };

            await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
            setData({ ...user, token });

        } catch (error) {
            throw new Error(error);
        }
    }

    async function signOut() {
        try {
            setData({} as User);
            await AsyncStorage.removeItem(userStorageKey);
        } catch (error) {
            throw new Error(error);
        }
    }

    useEffect(() => {
        async function loadUserStorageDate() {
            const userStorage = await AsyncStorage.getItem(userStorageKey);

            if (userStorage) {
                const userLogged = JSON.parse(userStorage) as User;
                setData(userLogged);
            }

            setUserStorageLoading(false);
        }

        loadUserStorageDate();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user: data,
                signIn,
                signOut,
                userStorageLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };