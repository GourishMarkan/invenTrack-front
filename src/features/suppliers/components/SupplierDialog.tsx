import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SupplierForm from "@/components/suppliers/SupplierForm";
import { useCreateSupplier } from "@/features/suppliers/hooks/useCreateSupplier";
import { useUpdateSupplier } from "@/features/suppliers/hooks/useUpdateSupplier";
import type { SupplierFormValues } from "@/features/suppliers/schemas/supplier.schema";
import type { Supplier } from "@/features/suppliers/types/supplier";

type SupplierDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  supplier?: Supplier;
};

export default function SupplierDialog({
  open,
  onOpenChange,
  mode,
  supplier,
}: SupplierDialogProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const createMutation = useCreateSupplier();
  const updateMutation = useUpdateSupplier();

  const isLoading = createMutation.isPending || updateMutation.isPending;

  const defaultValues: SupplierFormValues = {
    name: supplier?.name ?? "",
    mobileNumber: supplier?.phone ?? "",
  };

  useEffect(() => {
    if (!open) {
      setSubmitError(null);
    }
  }, [open]);

  const handleSubmit = async (values: SupplierFormValues) => {
    setSubmitError(null);

    try {
      if (mode === "create") {
        await createMutation.mutateAsync(values as never);
      } else if (supplier) {
        await updateMutation.mutateAsync({
          id: supplier.id,
          data: values,
        } as never);
      }

      onOpenChange(false);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Failed to save supplier");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Add Supplier" : "Edit Supplier"}</DialogTitle>
        </DialogHeader>

        {submitError && (
          <p className="rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive">
            {submitError}
          </p>
        )}

        <SupplierForm
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}