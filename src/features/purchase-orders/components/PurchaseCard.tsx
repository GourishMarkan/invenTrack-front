import {
  Eye,
  MoreHorizontal,
  PencilLine,
  Trash2,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { Purchase } from "@/features/purchases/types/purchase";

type PurchaseCardProps = {
  purchase: Purchase;
  onView: (purchase: Purchase) => void;
  onEdit: (purchase: Purchase) => void;
  onDelete: (purchase: Purchase) => void;
};

function formatDate(value: string | Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

function getPaymentStatusClass(status: string) {
  switch (status) {
    case "Done":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";

    case "Pending":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";

    case "Failed":
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";

    default:
      return "bg-muted text-muted-foreground";
  }
}

export default function PurchaseCard({
  purchase,
  onView,
  onEdit,
  onDelete,
}: PurchaseCardProps) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          {/* Purchase Information */}
          <div className="min-w-0 space-y-1">
            <h3 className="truncate text-base font-semibold text-foreground">
              Purchase #{purchase.id}
            </h3>

            <p className="text-sm text-muted-foreground">
              {purchase.supplier?.name ?? `Supplier #${purchase.supplierId}`}
            </p>

            <p className="text-xs text-muted-foreground">
              {formatDate(purchase.purchaseDate)}
            </p>
          </div>

          {/* Actions */}
          <DropdownMenu>
            <DropdownMenuTrigger
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`Open actions for purchase ${purchase.id}`}
            >
              <MoreHorizontal className="h-4 w-4" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onView(purchase)}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => onEdit(purchase)}>
                <PencilLine className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => onDelete(purchase)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Purchase Summary */}
        <div className="mt-4 grid grid-cols-2 gap-3 border-t pt-4">
          <div>
            <p className="text-xs text-muted-foreground">
              Total Quantity
            </p>

            <p className="mt-1 text-sm font-medium">
              {purchase.totalQuantity}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">
              Total Amount
            </p>

            <p className="mt-1 text-sm font-semibold">
              {formatCurrency(purchase.total)}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">
              Payment Type
            </p>

            <p className="mt-1 text-sm font-medium">
              {purchase.paymentType}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">
              Payment Status
            </p>

            <span
              className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getPaymentStatusClass(
                purchase.paymentStatus
              )}`}
            >
              {purchase.paymentStatus}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
