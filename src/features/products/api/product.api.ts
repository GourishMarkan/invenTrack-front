import { api } from "@/lib/axios";

export const getProducts = () => api.get("/products");

export const createProduct = (data:any) =>
  api.post("/products", data);

export const updateProduct = (id:any, data:any) =>
  api.patch(`/products/${id}`, data);

export const deleteProduct = (id:any) =>
  api.delete(`/products/${id}`);