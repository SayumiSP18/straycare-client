// export const Role = {
//   CITIZEN: "CITIZEN",
//   ADMIN: "ADMIN",
// } as const;

// export type Role = (typeof Role)[keyof typeof Role];

// export interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: Role;
// }

// export interface ApiResponse<T> {
//   success: boolean;
//   data: T;
//   message?: string;
// }



export type Role = "ADMIN" | "RESCUER" | "CITIZEN";
export type Species = "DOG" | "CAT";
export type Condition = "HEALTHY" | "INJURED" | "URGENT";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: Role;
  isApproved?: boolean;
}

export interface Animal {
  _id: string;
  name: string;
  species: Species;
  breed?: string;
  ageMonths: number;
  gender: "MALE" | "FEMALE";
  status: "IN_CARE" | "AVAILABLE" | "ADOPTED";
  vaccinated: boolean;
  neutered: boolean;
  story?: string;
  location?: string;
  photos: string[];
}

export interface StrayReport {
  _id: string;
  species: Species;
  condition: Condition;
  description: string;
  location: string;
  photo?: string;
  status: "REPORTED" | "ASSIGNED" | "RESCUED" | "CLOSED";
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface AuthPayload {
  user: User;
  accessToken: string;
  refreshToken: string;
}
