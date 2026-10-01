import {useMutation, useQueryClient} from "@tanstack/react-query"
import { deletePurchase } from "../api/purchase-orders.api"

export function useDeletePurchase(){
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:deletePurchase,
        onSuccess:()=>{

            queryClient.invalidateQueries({
                queryKey:["Purhcases"]
            })
        }
    })
}