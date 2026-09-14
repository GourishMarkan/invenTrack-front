import { useQuery } from "@tanstack/react-query";
import { getPurchaseById} from "../api/purchase-orders.api";

export function usePurchase(id:number){
     return useQuery({
         queryFn:()=>getPurchaseById(id),
        queryKey:["purchaseById"]
     })
}