import api from "./api";
// import { ApiResponse } from "../types";
// import { Stats } from "../types/stats";
import type { ApiResponse } from "../types";
import type { Stats } from "../types/stats";

export const getStats = async () => (await api.get<ApiResponse<Stats>>("/stats")).data.data;
export const sendContact = async (body: { name: string; email: string; message: string }) =>
  (await api.post<ApiResponse<unknown>>("/contact", body)).data;
export const donate = async (amount: number) =>
  (await api.post<ApiResponse<unknown>>("/donations", { amount })).data;
