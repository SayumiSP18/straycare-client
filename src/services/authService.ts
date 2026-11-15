import api from "./api";
// import { ApiResponse, AuthPayload } from "../types";
import type { ApiResponse, AuthPayload } from "../types";


export const loginApi = async (email: string, password: string) =>
  (await api.post<ApiResponse<AuthPayload>>("/auth/login", { email, password })).data.data;

export const registerApi = async (body: { name: string; email: string; password: string; role: "CITIZEN" | "RESCUER" }) =>
  (await api.post<ApiResponse<AuthPayload | null>>("/auth/register", body)).data;
