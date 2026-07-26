
import { useMutation } from "@tanstack/react-query";
import { createProduct } from "../api/product.api";
export function useCreateProduct(){
   return useMutation({
    mutationFn:createProduct
   })
}