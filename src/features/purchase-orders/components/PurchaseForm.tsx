import { useEffect, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  purchaseSchema,
  type PurchaseFormValues,
} from "@/features/purchase-orders/schema/purchase.schema";

type SupplierOption = {
  id: number;
  name: string;
};

type ProductOption = {
  id: number;
  name: string;
};

type PurchasePayload = {
  total: number;
  totalQuantity: number;
  supplierId: number;
  paymentType: string;
  paymentStatus: string;
  purchaseDate: string;
  purchaseItems: Array<{
    productId: number;
    costPrice: number;
    quantity: number;
  }>;
};

type PurchaseFormProps = {
  defaultValues?: Partial<PurchaseFormValues>;
  suppliers: SupplierOption[];
  products: ProductOption[];
  loading?: boolean;
  onSubmit: (payload: PurchasePayload) => void | Promise<void>;
  onCancel?: () => void;
};

const paymentTypeOptions = ["Cash", "Upi", "CreditCard", "DebitCard"] as const;
const paymentStatusOptions = ["Done", "Pending", "Failed"] as const;

const fallbackValues: PurchaseFormValues = {
  supplierId: 0,
  purchaseDate: "",
  paymentType: "Cash",
  paymentStatus: "Pending",
  purchaseItems: [{ productId: 0, quantity: 1, costPrice: 0 }],
};

function FormMessage({ message, id }: { message?: string; id?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="text-sm text-destructive">
      {message}
    </p>
  );
}

function toDateTimeLocal(isoOrDate: string): string {
  if (!isoOrDate) return "";
  const date = new Date(isoOrDate);
  if (Number.isNaN(date.getTime())) return "";
  const tzOffsetMs = date.getTimezoneOffset() * 60 * 1000;
  return new Date(date.getTime() - tzOffsetMs).toISOString().slice(0, 16);
}

export default function PurchaseForm({
  defaultValues,
  suppliers,
  products,
  loading = false,
  onSubmit,
  onCancel,
}: PurchaseFormProps) {
  const form = useForm<PurchaseFormValues>({
    resolver: zodResolver(purchaseSchema),
    defaultValues: {
      ...fallbackValues,
      ...defaultValues,
      purchaseDate: defaultValues?.purchaseDate
        ? toDateTimeLocal(defaultValues.purchaseDate)
        : fallbackValues.purchaseDate,
      purchaseItems:
        defaultValues?.purchaseItems?.length && defaultValues.purchaseItems.length > 0
          ? defaultValues.purchaseItems
          : fallbackValues.purchaseItems,
    },
    mode: "onTouched",
  });

  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "purchaseItems",
  });

  useEffect(() => {
    reset({
      ...fallbackValues,
      ...defaultValues,
      purchaseDate: defaultValues?.purchaseDate
        ? toDateTimeLocal(defaultValues.purchaseDate)
        : fallbackValues.purchaseDate,
      purchaseItems:
        defaultValues?.purchaseItems?.length && defaultValues.purchaseItems.length > 0
          ? defaultValues.purchaseItems
          : fallbackValues.purchaseItems,
    });
  }, [defaultValues, reset]);

  const purchaseItems = watch("purchaseItems");

  const totalQuantity = useMemo(
    () =>
      (purchaseItems ?? []).reduce(
        (sum:any, item:any) => sum + (Number.isFinite(item.quantity) ? item.quantity : 0),
        0
      ),
    [purchaseItems]
  );

  const grandTotal = useMemo(
    () =>
      (purchaseItems ?? []).reduce(
        (sum:any, item:any) =>
          sum +
          (Number.isFinite(item.quantity) ? item.quantity : 0) *
            (Number.isFinite(item.costPrice) ? item.costPrice : 0),
        0
      ),
    [purchaseItems]
  );

  const submitHandler = async (values: PurchaseFormValues) => {
    const payload: PurchasePayload = {
      supplierId: values.supplierId,
      paymentType: values.paymentType,
      paymentStatus: values.paymentStatus,
      purchaseDate: new Date(values.purchaseDate).toISOString(),
      totalQuantity,
      total: grandTotal,
      purchaseItems: values.purchaseItems.map((item:any) => ({
        productId: item.productId,
        quantity: item.quantity,
        costPrice: item.costPrice,
      })),
    };

    await onSubmit(payload);
  };

  const purchaseItemsError =
    typeof errors.purchaseItems?.message === "string" ? errors.purchaseItems.message : undefined;

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6" noValidate>
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Purchase Details</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="supplierId">Supplier</Label>
            <Controller
              name="supplierId"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value > 0 ? String(field.value) : ""}
                  onValueChange={(value):any => field.onChange(Number.parseInt(value, 10))}
                  disabled={loading}
                >
                  <SelectTrigger
                    id="supplierId"
                    aria-invalid={errors.supplierId ? "true" : "false"}
                    className="w-full"
                  >
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map((supplier) => (
                      <SelectItem key={supplier.id} value={String(supplier.id)}>
                        {supplier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FormMessage message={errors.supplierId?.message} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="purchaseDate">Purchase Date</Label>
            <Input
              id="purchaseDate"
              type="datetime-local"
              disabled={loading}
              aria-invalid={errors.purchaseDate ? "true" : "false"}
              {...register("purchaseDate")}
            />
            <FormMessage message={errors.purchaseDate?.message} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentType">Payment Type</Label>
            <Controller
              name="paymentType"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange} disabled={loading}>
                  <SelectTrigger
                    id="paymentType"
                    aria-invalid={errors.paymentType ? "true" : "false"}
                    className="w-full"
                  >
                    <SelectValue placeholder="Select payment type" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentTypeOptions.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FormMessage message={errors.paymentType?.message} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentStatus">Payment Status</Label>
            <Controller
              name="paymentStatus"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange} disabled={loading}>
                  <SelectTrigger
                    id="paymentStatus"
                    aria-invalid={errors.paymentStatus ? "true" : "false"}
                    className="w-full"
                  >
                    <SelectValue placeholder="Select payment status" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentStatusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FormMessage message={errors.paymentStatus?.message} />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Purchase Items</h2>

        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Cost Price</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="w-24">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((field, index) => {
                const rowQuantity = Number(purchaseItems?.[index]?.quantity ?? 0);
                const rowCostPrice = Number(purchaseItems?.[index]?.costPrice ?? 0);
                const rowTotal = rowQuantity * rowCostPrice;

                return (
                  <TableRow key={field.id}>
                    <TableCell>
                      <Controller
                        name={`purchaseItems.${index}.productId`}
                        control={control}
                        render={({ field: itemField }) => (
                          <Select
                            value={itemField.value > 0 ? String(itemField.value) : ""}
                            onValueChange={(value) =>
                              itemField.onChange(Number.parseInt(value, 10))
                            }
                            disabled={loading}
                          >
                            <SelectTrigger
                              aria-invalid={errors.purchaseItems?.[index]?.productId ? "true" : "false"}
                              className="w-full min-w-[180px]"
                            >
                              <SelectValue placeholder="Select product" />
                            </SelectTrigger>
                            <SelectContent>
                              {products.map((product) => (
                                <SelectItem key={product.id} value={String(product.id)}>
                                  {product.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      <FormMessage message={errors.purchaseItems?.[index]?.productId?.message} />
                    </TableCell>

                    <TableCell>
                      <Input
                        type="number"
                        min={1}
                        step={1}
                        disabled={loading}
                        aria-invalid={errors.purchaseItems?.[index]?.quantity ? "true" : "false"}
                        {...register(`purchaseItems.${index}.quantity`, {
                          valueAsNumber: true,
                        })}
                      />
                      <FormMessage message={errors.purchaseItems?.[index]?.quantity?.message} />
                    </TableCell>

                    <TableCell>
                      <Input
                        type="number"
                        min={0.01}
                        step="0.01"
                        disabled={loading}
                        aria-invalid={errors.purchaseItems?.[index]?.costPrice ? "true" : "false"}
                        {...register(`purchaseItems.${index}.costPrice`, {
                          valueAsNumber: true,
                        })}
                      />
                      <FormMessage message={errors.purchaseItems?.[index]?.costPrice?.message} />
                    </TableCell>

                    <TableCell>
                      <Input
                        value={Number.isFinite(rowTotal) ? rowTotal.toFixed(2) : "0.00"}
                        readOnly
                        tabIndex={-1}
                        aria-label={`Row ${index + 1} total`}
                      />
                    </TableCell>

                    <TableCell>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        onClick={() => remove(index)}
                        disabled={loading}
                        aria-label={`Remove item ${index + 1}`}
                      >
                        <Trash2 />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        <div className="space-y-3 md:hidden">
          {fields.map((field, index) => {
            const rowQuantity = Number(purchaseItems?.[index]?.quantity ?? 0);
            const rowCostPrice = Number(purchaseItems?.[index]?.costPrice ?? 0);
            const rowTotal = rowQuantity * rowCostPrice;

            return (
              <Card key={field.id}>
                <CardHeader>
                  <CardTitle className="text-sm">Item {index + 1}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <Label>Product</Label>
                    <Controller
                      name={`purchaseItems.${index}.productId`}
                      control={control}
                      render={({ field: itemField }) => (
                        <Select
                          value={itemField.value > 0 ? String(itemField.value) : ""}
                          onValueChange={(value) =>
                            itemField.onChange(Number.parseInt(value, 10))
                          }
                          disabled={loading}
                        >
                          <SelectTrigger
                            aria-invalid={errors.purchaseItems?.[index]?.productId ? "true" : "false"}
                            className="w-full"
                          >
                            <SelectValue placeholder="Select product" />
                          </SelectTrigger>
                          <SelectContent>
                            {products.map((product) => (
                              <SelectItem key={product.id} value={String(product.id)}>
                                {product.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <FormMessage message={errors.purchaseItems?.[index]?.productId?.message} />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Quantity</Label>
                      <Input
                        type="number"
                        min={1}
                        step={1}
                        disabled={loading}
                        aria-invalid={errors.purchaseItems?.[index]?.quantity ? "true" : "false"}
                        {...register(`purchaseItems.${index}.quantity`, {
                          valueAsNumber: true,
                        })}
                      />
                      <FormMessage message={errors.purchaseItems?.[index]?.quantity?.message} />
                    </div>

                    <div className="space-y-2">
                      <Label>Cost Price</Label>
                      <Input
                        type="number"
                        min={0.01}
                        step="0.01"
                        disabled={loading}
                        aria-invalid={errors.purchaseItems?.[index]?.costPrice ? "true" : "false"}
                        {...register(`purchaseItems.${index}.costPrice`, {
                          valueAsNumber: true,
                        })}
                      />
                      <FormMessage message={errors.purchaseItems?.[index]?.costPrice?.message} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Total</Label>
                    <Input
                      value={Number.isFinite(rowTotal) ? rowTotal.toFixed(2) : "0.00"}
                      readOnly
                      tabIndex={-1}
                    />
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => remove(index)}
                    disabled={loading}
                    className="w-full"
                  >
                    <Trash2 />
                    Remove
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <FormMessage message={purchaseItemsError} />

        <Button
          type="button"
          variant="outline"
          onClick={() => append({ productId: 0, quantity: 1, costPrice: 0 })}
          disabled={loading}
          className="w-full sm:w-auto"
        >
          <Plus />
          Add Product
        </Button>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-md border p-3">
              <p className="text-sm text-muted-foreground">Total Quantity</p>
              <p className="text-xl font-semibold">{totalQuantity}</p>
            </div>
            <div className="rounded-md border p-3">
              <p className="text-sm text-muted-foreground">Grand Total</p>
              <p className="text-xl font-semibold">{grandTotal.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        {onCancel ? (
          <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
        ) : null}
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Purchase"}
        </Button>
      </div>
    </form>
  );
}