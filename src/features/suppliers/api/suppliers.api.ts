import {api} from "@/lib/axios"

export const getAllSupplier=async()=>{
    const res= await api.get("/supplier")
    return res.data
}