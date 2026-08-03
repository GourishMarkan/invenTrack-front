import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supplierSchema, type SupplierFormValues } from "@/features/suppliers/schemas/supplier.schema";

type SupplierFormProps = {
  defaultValues?: SupplierFormValues;
  onSubmit: (values: SupplierFormValues) => void | Promise<void>;
  isLoading?: boolean;
  onCancel: () => void;
};

const fallbackValues: SupplierFormValues = {
  name: "",
  mobileNumber: "",
};

export default function SupplierForm({
  defaultValues,
  onSubmit,
  isLoading = false,
  onCancel,
}: SupplierFormProps) {
  const form = useForm<SupplierFormValues>({
    resolver: zodResolver(supplierSchema),
    defaultValues: defaultValues ?? fallbackValues,
    mode: "onTouched",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  useEffect(() => {
    reset(defaultValues ?? fallbackValues);
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
      <div className="grid gap-2">
        <Label htmlFor="name">Supplier Name</Label>
        <Input
          id="name"
          placeholder="Apex Traders"
          aria-invalid={errors.name ? "true" : "false"}
          {...register("name")}
        />
        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="mobileNumber">Phone Number</Label>
        <Input
          id="mobileNumber"
          placeholder="7011928985"
          aria-invalid={errors.mobileNumber ? "true" : "false"}
          {...register("mobileNumber")}
        />
        {errors.mobileNumber && (
          <p className="text-sm text-destructive">{errors.mobileNumber.message}</p>
        )}
      </div>

      <div className="flex items-center justify-end gap-2 pt-1">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Supplier"}
        </Button>
      </div>
    </form>
  );
}