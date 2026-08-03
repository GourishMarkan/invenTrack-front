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
import { useDeleteSupplier } from "@/features/suppliers/hooks/useDeleteSupplier";
import type { Supplier } from "@/features/suppliers/types/supplier";

type DeleteSupplierDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  supplier?: Supplier;
};

export default function DeleteSupplierDialog({
  open,
  onOpenChange,
  supplier,
}: DeleteSupplierDialogProps) {
  const deleteMutation = useDeleteSupplier();

  const handleDelete = async () => {
    if (!supplier) return;

    await deleteMutation.mutateAsync(supplier.id as never);
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Supplier</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this supplier? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteMutation.isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}