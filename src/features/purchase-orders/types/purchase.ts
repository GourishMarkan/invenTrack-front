export type PaymentType =
  | "Cash"
  | "Upi"
  | "CreditCard"
  | "DebitCard";

export type PaymentStatus = "Done" | "Pending" | "Failed";

export type PurchaseItem = {
  id?: number;
  productId: number;
  purchaseId?: number;
  costPrice: number;
  quantity: number;
  product?: {
    id: number;
    name: string;
  };
};

export type Purchase = {
  id: number;
  createdAt?: string | Date;
  total: number;
  totalQuantity: number;
  supplierId: number;
  supplier?: {
    id: number;
    name: string;
  };
  purchaseDate: string | Date;
  paymentType: PaymentType;
  paymentStatus: PaymentStatus;
  purchaseItems?: PurchaseItem[];
  purchaseItem?: PurchaseItem[];
  createdById?: number;
  createdBy?: {
    id: number;
    name: string;
  };
  isDeleted?: boolean;
};