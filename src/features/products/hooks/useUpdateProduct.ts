import { useMutation } from "@tanstack/react-query";
import { updateProduct } from "../api/product.api";

export function useUpdateProduct(){
    return  useMutation({
        mutationFn:updateProduct
    })
}