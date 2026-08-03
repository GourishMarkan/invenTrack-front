import { z } from "zod";

export const supplierSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Supplier name must be at least 2 characters")
    .max(100, "Supplier name cannot exceed 100 characters"),

  

  mobileNumber: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits")
    .regex(/^[0-9+\-\s()]+$/, "Invalid phone number"),

 
});

export type SupplierFormValues = z.infer<typeof supplierSchema>;