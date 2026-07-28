import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Product, Supplier } from "@/features/products/types/product";

type ProductFormValues = {
  name: string;
  sku: string;
  costPrice: number;
  sellingPrice: number;
  stock: number;
  supplierName: string;
  minStock: number;
};

type ProductFormProps = {
  initialValues?: Product;
  supplier?: Supplier[];
  onSubmit: (values: ProductFormValues) => void;
  onCancel: () => void;
};

const defaultValues: ProductFormValues = {
  name: "",
  sku: "",
  supplierName: "",
  costPrice: 0,
  sellingPrice: 0,
  stock: 0,
  minStock: 0,
};

export default function ProductForm({ initialValues, supplier, onSubmit, onCancel }: ProductFormProps) {
  const form = useForm<ProductFormValues>({
    defaultValues,
  });

  const { register, handleSubmit, reset, control,watch} = form;
  // console.log("watch", watch());
  console.log("Stock:", watch("stock"));

  useEffect(() => {
    if (!initialValues) {
      reset(defaultValues);
      return;
    }

    reset({
      name: initialValues.name,
      sku: initialValues.sku,
      supplierName: initialValues.supplier.name,
      costPrice: initialValues.costPrice,
      sellingPrice: initialValues.sellingPrice,
      stock: initialValues.stock,
      minStock: initialValues.minStock,
    });
  }, [initialValues?.id, reset]);
  const submit = (data: ProductFormValues) => {
  console.log("submit", data);
  onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="name">Product Name</Label>
        <Input id="name" {...register("name", { required: true })} placeholder="Wireless Mouse" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="sku">SKU</Label>
        <Input id="sku" {...register("sku", { required: true })} placeholder="MSE-001" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="supplierName">Supplier</Label>
        <Controller
          name="supplierName"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a supplier" />
              </SelectTrigger>
              <SelectContent>
                {supplier?.map((item) => (
                  <SelectItem key={item.id} value={item.name}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="stock">Stock</Label>
        <Input id="stock" type="number" min={0} {...register("stock", { valueAsNumber: true })} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="costPrice">Cost Price</Label>
        <Input id="costPrice" type="number" min={0} step="0.01" {...register("costPrice", { valueAsNumber: true })} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="sellingPrice">Selling Price</Label>
        <Input id="sellingPrice" type="number" min={0} step="0.01" {...register("sellingPrice", { valueAsNumber: true })} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="minStock">Low Stock Threshold</Label>
        <Input id="minStock" type="number" min={0} {...register("minStock", { valueAsNumber: true })} />
      </div>

      <div className="md:col-span-2 flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">  {initialValues ? "Update Product" : "Save Product"}</Button>
      </div>
    </form>
  );
}