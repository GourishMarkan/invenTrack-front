import { z } from "zod";

export const supplierSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Supplier name must be at least 2 characters")
    .max(100, "Supplier name cannot exceed 100 characters"),

  contactPerson: z
    .string()
    .trim()
    .max(100, "Contact person cannot exceed 100 characters")
    .optional()
    .or(z.literal("")),

  phone: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits")
    .regex(/^[0-9+\-\s()]+$/, "Invalid phone number"),

  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .optional()
    .or(z.literal("")),

  gstNumber: z
    .string()
    .trim()
    .max(20, "GST number cannot exceed 20 characters")
    .optional()
    .or(z.literal("")),

  address: z
    .string()
    .trim()
    .max(300, "Address cannot exceed 300 characters")
    .optional()
    .or(z.literal("")),

  notes: z
    .string()
    .trim()
    .max(500, "Notes cannot exceed 500 characters")
    .optional()
    .or(z.literal("")),
});

export type SupplierFormValues = z.infer<typeof supplierSchema>;