import { useQuery } from "@tanstack/react-query";
import { getAllPurchases } from "../api/purchase-orders.api";

export function usePurchases(){
    return useQuery({
        queryFn:getAllPurchases,
        queryKey:["AllPurchases"]
    })
}