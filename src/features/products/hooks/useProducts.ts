import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/product.api";
export function useProduct(){
    return useQuery({
        queryKey:["getProducts"],
        queryFn:getProducts
    })

}