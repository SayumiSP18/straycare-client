// import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";

const baseURL = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";
const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let refreshing: Promise<string> | null = null;

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;
    const refreshToken = localStorage.getItem("refreshToken");

    if (error.response?.status === 401 && original && !original._retry && refreshToken) {
      original._retry = true;
      refreshing ??= axios
        .post(`${baseURL}/auth/refresh`, { refreshToken })
        .then((res) => {
          const token: string = res.data.data.accessToken;
          localStorage.setItem("accessToken", token);
          return token;
        })
        .finally(() => (refreshing = null));
      try {
        const token = await refreshing;
        original.headers.Authorization = `Bearer ${token}`;
        return api(original);
      } catch {
        localStorage.clear();
        window.location.href = "/auth";
      }
    }
    return Promise.reject(error);
  }
);

export const errorMessage = (err: unknown): string =>
  axios.isAxiosError(err) ? err.response?.data?.message ?? err.message : "Something went wrong";

export default api;
