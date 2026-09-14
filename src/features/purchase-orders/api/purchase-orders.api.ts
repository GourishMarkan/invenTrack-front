import { api } from "@/lib/axios"
export const getAllPurchases=async()=>{
   const res=await api.get(`/purchases`);
   return res.data;
}

export const getPurchaseById=async(id:number)=>{
    const res=await api.get(`/purchases/${id}`)
    return res.data;
}

export const createPurchase=async(data:any)=>{
    const res=await api.post(`/purchases`,data)
    return res.data;
}

export const deletePurchase=async(id:number)=>{
    const res=await api.delete(`/purchases/${id}`)
    return res.data
}