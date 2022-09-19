import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from "react";
import { useAuth } from "./auth";
import handleAxiosError, { IToastMessage } from "./handleAxiosError";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosResponse, AxiosError } from "axios";
import { api } from "../services/api";
import { useToast } from "native-base";

interface User {
  id: string;
  user_id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
  token: string;
}

interface HttpContextData {
  httpGet(
    url: string,
    params?: object,
    loading?: boolean,
    header?: object
  ): Promise<AxiosResponse>;

  httpPost(
    url: string,
    data: object,
    contentType?: string,
    loading?: boolean
  ): Promise<AxiosResponse>;

  httpPut(
    url: string,
    data: object,
    contentType?: string
  ): Promise<AxiosResponse>;

  httpDelete(url: string, params?: object): Promise<AxiosResponse>;

  loading: boolean;
  unLoading(): void;
}

const HttpContext = createContext<HttpContextData>({} as HttpContextData);

const HttpProvider: React.FC = ({ children }) => {
  const userStorageKey = "@horus:user";
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<User>({} as User);
  const toast = useToast();
  const { signOut } = useAuth();

  async function loadUserStorageDate() {
    const userStorage = await AsyncStorage.getItem(userStorageKey);

    if (userStorage) {
      const userLogged = JSON.parse(userStorage) as User;
      setData(userLogged);
    }
  }

  useEffect(() => {
    loadUserStorageDate();
  }, []);

  api.defaults.headers.authorization = `Bearer ${data?.token}`;

  const handleErro = useCallback(
    (error: AxiosError) => {
      const handle = handleAxiosError(error);
      if (handle.toasts.length) {
        console.log("handler  ", handle);
        handle.toasts.forEach((toastM: IToastMessage) => {
          toast.show(toastM);
        });
      }

      if (handle.isReturn) {
        return error;
      }

      if (handle.isSignOut) {
        signOut();
      }

      return undefined;
    },
    [toast, signOut]
  );

  const httpGet = useCallback(
    async (url: string, params?: object, loading = true, header?: any) => {
      loadUserStorageDate();
      try {
        setLoading(loading);
        api.defaults.headers.contentType = "application/json";

        if (header) {
          const [[key, value]] = Object.entries(header);
          api.defaults.headers[key] = value;
        }
        const response = await api.get(url, params).finally(() => {
          setLoading(false);
        });

        return response;
      } catch (err) {
        console.log("httpGet erro ", err);
        handleErro(err);
        return err;
      }
    },
    [handleErro]
  );

  const httpPost = useCallback(
    async (url: string, data: object, contentType = "json") => {
      loadUserStorageDate();
      try {
        setLoading(true);
        api.defaults.headers.contentType =
          contentType === "json" ? "application/json" : "multipart/form-data";
        const response = await api.post(url, data).finally(() => {
          setLoading(false);
        });

        return response;
      } catch (err) {
        handleErro(err);
        return err;
      }
    },
    [handleErro]
  );

  const httpPut = useCallback(
    async (url: string, data: object, contentType = "json") => {
      try {
        setLoading(true);
        api.defaults.headers.contentType =
          contentType === "json" ? "application/json" : "multipart/form-data";
        const response = await api.put(url, data).finally(() => {
          setLoading(false);
        });
        return response;
      } catch (err) {
        handleErro(err);
        return err;
      }
    },
    [handleErro]
  );

  const httpDelete = useCallback(
    async (url: string, params?: object) => {
      try {
        setLoading(true);
        api.defaults.headers.contentType = "application/json";
        const response = await api.delete(url, params).finally(() => {
          setLoading(false);
        });
        return response;
      } catch (err) {
        handleErro(err);
        return err;
      }
    },
    [handleErro]
  );

  const unLoading = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <HttpContext.Provider
      value={{
        httpGet,
        httpPost,
        httpPut,
        httpDelete,
        loading,
        unLoading,
      }}
    >
      {children}
    </HttpContext.Provider>
  );
};

function useHttp(): HttpContextData {
  const context = useContext(HttpContext);

  if (!context) {
    throw new Error("useHttp must be used within an HttpProvider");
  }

  return context;
}

export { HttpProvider, useHttp };
