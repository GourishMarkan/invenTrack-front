import {api} from "@/lib/axios"

export const getAllSupplier=async()=>{
    const res= await api.get("/supplier")
    return res.data
}

export const getSupplier=async(id:number)=>{
    const res=await api.get(`/supplier/${id}`)
    return res.data

}

export const createSupplier=async(data:any)=>{
    const res=await api.post("/supplier",data)
    return res.data
}

export const updateSupplier=async(id:number,data:any)=>{
    const res=await api.patch(`/supplier/${id}`,data)
    return res.data

}

export const deleteSupplier=async (id:number)=>{
    const res=await api.delete(`/supplier/${id}`)
    return res.data
}
