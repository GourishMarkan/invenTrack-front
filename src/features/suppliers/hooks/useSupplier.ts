import { useQuery} from "@tanstack/react-query";
import { getSupplier} from "../api/suppliers.api";

export function useSupplier(){
    return useQuery({
        queryKey:["supplier",],
        queryFn:(id:any)=>getSupplier(id)
    })
}