import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";

const purchaseItemSchema = z.object({
  productId: z.coerce.number().min(1, "Product required"),
  quantity: z.coerce.number().min(1, "Quantity must be greater than 0"),
  costPrice: z.coerce.number().min(0.01, "Cost price must be greater than 0"),
});

export const purchaseSchema = z.object({
  supplierId: z.coerce.number().min(1, "Supplier required"),
  purchaseDate: z.string().min(1, "Purchase date required"),
  paymentType: z.enum(["Cash", "Upi", "CreditCard", "DebitCard"], {
    required_error: "Payment type required",
  }),
  paymentStatus: z.enum(["Done", "Pending", "Failed"], {
    required_error: "Payment status required",
  }),
  purchaseItems: z.array(purchaseItemSchema).min(1, "At least one purchase item required"),
});

export type PurchaseFormValues = z.infer<typeof purchaseSchema>;