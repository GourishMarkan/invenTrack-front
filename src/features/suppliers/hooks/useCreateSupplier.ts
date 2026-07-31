import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSupplier } from "../api/suppliers.api";
// import type { CreateSupplierDto } from "../types/supplier"

export function useCreateSupplier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => createSupplier(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["suppliers"],
      });
    },
  });
}