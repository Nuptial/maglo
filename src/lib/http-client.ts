import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";
import { API_BASE_URL } from "@/config/env";

type ConfigureHttpClientOptions = {
  getAccessToken: () => string | null;
  refreshSession: () => Promise<string | null>;
  clearAuth: () => void;
};

type RetriableConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

const httpClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

let hasConfiguredInterceptors = false;
let refreshAttempt: Promise<string | null> | null = null;

const configureHttpClient = ({
  getAccessToken,
  refreshSession,
  clearAuth,
}: ConfigureHttpClientOptions) => {
  if (hasConfiguredInterceptors) {
    return;
  }

  httpClient.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  const requestRefresh = async () => {
    if (!refreshAttempt) {
      refreshAttempt = refreshSession().finally(() => {
        refreshAttempt = null;
      });
    }
    return refreshAttempt;
  };

  httpClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const status = error.response?.status;
      const config = error.config as RetriableConfig | undefined;

      if (status !== 401 || !config || config._retry) {
        return Promise.reject(error);
      }

      config._retry = true;
      const nextToken = await requestRefresh();

      if (!nextToken) {
        clearAuth();
        return Promise.reject(error);
      }

      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${nextToken}`;

      return httpClient(config);
    }
  );

  hasConfiguredInterceptors = true;
};

export { httpClient, configureHttpClient };

