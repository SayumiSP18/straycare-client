import api from "./api";
// import { Animal, ApiResponse } from "../types";
import type { Animal, ApiResponse } from "../types";

export const getAnimals = async (params?: { species?: string; search?: string }) =>
  (await api.get<ApiResponse<Animal[]>>("/animals", { params })).data.data;

export const getAnimal = async (id: string) =>
  (await api.get<ApiResponse<Animal>>(`/animals/${id}`)).data.data;

export const requestAdoption = async (animalId: string) =>
  (await api.post<ApiResponse<unknown>>("/adoptions", { animalId })).data;
