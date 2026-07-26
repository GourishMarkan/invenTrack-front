import { getAllSupplier } from "../api/suppliers.api";
import { useQuery } from "@tanstack/react-query";

export function useSupplier(){
    return useQuery({
        queryKey:["allSupplier"],
        queryFn:getAllSupplier
    })
}