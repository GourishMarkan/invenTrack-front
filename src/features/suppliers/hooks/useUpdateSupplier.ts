import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSupplier } from "../api/suppliers.api";
// import type { UpdateSupplierDto } from "@/types/supplier";

export function useUpdateSupplier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
    //   data: UpdateSupplierDto;
      data: any;
    }) => updateSupplier(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["suppliers"],
      });
    },
  });
}