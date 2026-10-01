import { Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type DeletePurchaseDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  purchaseId?: number | string;
  purchaseLabel?: string;
  onConfirm: () => void;
  loading?: boolean;
};

export default function DeletePurchaseDialog({
  open,
  onOpenChange,
  purchaseId,
  purchaseLabel,
  onConfirm,
  loading = false,
}: DeletePurchaseDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-destructive" />
            Delete Purchase
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete this purchase? This action cannot
            be undone.
            {purchaseLabel && (
              <span className="mt-2 block font-medium text-foreground">
                {purchaseLabel}
              </span>
            )}
            {purchaseId !== undefined && !purchaseLabel && (
              <span className="mt-2 block font-medium text-foreground">
                Purchase #{purchaseId}
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={(event) => {
              event.preventDefault();
              onConfirm();
            }}
            disabled={loading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {loading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}