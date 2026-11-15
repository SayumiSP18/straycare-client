import api from "./api";
// import { ApiResponse, StrayReport } from "../types";
import type { ApiResponse, StrayReport } from "../types";

export const createReport = async (form: FormData) =>
  (await api.post<ApiResponse<StrayReport>>("/reports", form)).data;

export const getReports = async () =>
  (await api.get<ApiResponse<StrayReport[]>>("/reports")).data.data;
