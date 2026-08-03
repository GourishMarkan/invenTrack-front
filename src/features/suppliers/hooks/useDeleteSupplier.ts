import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSupplier } from "../api/suppliers.api";

export function useDeleteSupplier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteSupplier(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["suppliers"],
      });
    },
  });
}