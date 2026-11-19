import api from "./api";
import type { ApiResponse, StrayReport } from "../types";

export const createReport = async (form: FormData) =>
  (
    await api.post<ApiResponse<StrayReport>>("/reports", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  ).data;

export const getReports = async () =>
  (await api.get<ApiResponse<StrayReport[]>>("/reports")).data.data;