import {
  Eye,
  MoreHorizontal,
  PencilLine,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { Purchase } from "@/features/purchases/types/purchase";

import PurchaseCard from "./PurchaseCard";

type PurchaseTableProps = {
  purchases: Purchase[];
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
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

function PurchaseTableSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton
          key={index}
          className="h-14 w-full rounded-md"
        />
      ))}
    </div>
  );
}

export default function PurchaseTable({
  purchases,
  isLoading = false,
  isError = false,
  onRetry,
  onView,
  onEdit,
  onDelete,
}: PurchaseTableProps) {
  if (isLoading) {
    return <PurchaseTableSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex min-h-48 flex-col items-center justify-center gap-3 rounded-xl border p-6 text-center">
        <p className="text-sm font-medium">
          Failed to load purchases.
        </p>

        <p className="text-sm text-muted-foreground">
          Something went wrong while fetching purchases.
        </p>

        {onRetry && (
          <Button
            type="button"
            variant="outline"
            onClick={onRetry}
          >
            Try Again
          </Button>
        )}
      </div>
    );
  }

  if (purchases.length === 0) {
    return (
      <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border p-6 text-center">
        <p className="text-sm font-medium">
          No purchases found
        </p>

        <p className="mt-1 text-sm text-muted-foreground">
          Create a purchase to see it here.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-xl border md:block">
        <div className="max-h-[600px] overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-background">
              <TableRow>
                <TableHead>Purchase ID</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Payment Type</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Purchase Date</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead className="text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {purchases.map((purchase) => (
                <TableRow key={purchase.id}>
                  <TableCell className="font-medium">
                    #{purchase.id}
                  </TableCell>

                  <TableCell>
                    {purchase.supplier?.name ??
                      `Supplier #${purchase.supplierId}`}
                  </TableCell>

                  <TableCell className="font-medium">
                    {formatCurrency(purchase.total)}
                  </TableCell>

                  <TableCell>
                    {purchase.paymentType}
                  </TableCell>

                  <TableCell>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getPaymentStatusClass(
                        purchase.paymentStatus
                      )}`}
                    >
                      {purchase.paymentStatus}
                    </span>
                  </TableCell>

                  <TableCell>
                    {formatDate(purchase.purchaseDate)}
                  </TableCell>

                  <TableCell>
                    {purchase.createdBy?.name ??
                      purchase.createdById ??
                      "-"}
                  </TableCell>

                  <TableCell>
                    <div className="flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring"
                          aria-label={`Open actions for purchase ${purchase.id}`}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => onView(purchase)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() => onEdit(purchase)}
                          >
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="grid gap-4 md:hidden">
        {purchases.map((purchase) => (
       <PurchaseCard
      key={purchase.id}
      purchase={purchase}
      onView={onView}
      onEdit={onEdit}
      onDelete={onDelete}
    />
        ))}
      </div>
    </>
  );
}