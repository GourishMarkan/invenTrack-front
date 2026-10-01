import { useMutation, useQueryClient } from "@tanstack/react-query";

// import { updatePurchase } from "@/features/purchases/api/purchase.api";

export function useUpdatePurchase() {
  const queryClient = useQueryClient();

  return useMutation({
    // mutationFn: updatePurchase,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["purchases"],
      });

    //   queryClient.invalidateQueries({
    //     queryKey: ["purchase", variables.id],
    //   });
    },
  });
}