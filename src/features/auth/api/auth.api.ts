import { api } from "@/lib/axios";

export interface LoginDto {
  email: string;
  password: string;
}

export const login = async (data: LoginDto) => {

    
    const response = await api.post("/auth/login", data);
    return response.data;

};

export const logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};