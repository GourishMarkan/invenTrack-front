import { api } from "@/lib/axios";

export const getProducts =async  () => {
  const res=await api.get("/products");
  return res.data;
};

export const createProduct = async(data:any) =>{

const res=await  api.post("/products", data);
return res.data;
}

export const updateProduct = async(id:any, data:any) =>{

 const res=await  api.patch(`/products/${id}`, data);
 return res.data;
}

export const deleteProduct = async (id:any) =>{

  const res=await api.delete(`/products/${id}`);
}