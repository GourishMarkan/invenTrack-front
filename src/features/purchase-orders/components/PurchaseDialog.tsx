import { useMemo, useRef } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PurchaseForm from "@/features/purchase-orders/components/PurchaseForm";

type PurchaseFormProps = React.ComponentProps<typeof PurchaseForm>;

type PurchaseDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  defaultValues?: PurchaseFormProps["defaultValues"];
  suppliers: PurchaseFormProps["suppliers"];
  products: PurchaseFormProps["products"];
  loading?: boolean;
  onSubmit: PurchaseFormProps["onSubmit"];
};

export default function PurchaseDialog({
  open,
  onOpenChange,
  mode,
  defaultValues,
  suppliers,
  products,
  loading = false,
  onSubmit,
}: PurchaseDialogProps) {
  const formContainerRef = useRef<HTMLDivElement | null>(null);

  const title = mode === "create" ? "Create Purchase" : "Edit Purchase";
  const description =
    mode === "create" ? "Create a new purchase." : "Update purchase details.";
  const submitLabel = mode === "create" ? "Save Purchase" : "Update Purchase";

  const loadingLabel = useMemo(
    () => (mode === "create" ? "Saving..." : "Updating..."),
    [mode]
  );

  const handleCancel = () => {
    onOpenChange(false);
  };

  const handleFooterSubmit = () => {
    const formElement = formContainerRef.current?.querySelector("form");
    if (formElement instanceof HTMLFormElement) {
      formElement.requestSubmit();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl p-0">
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="max-h-[70vh] overflow-y-auto px-6 py-4" ref={formContainerRef}>
          <PurchaseForm
            defaultValues={defaultValues}
            suppliers={suppliers}
            products={products}
            loading={loading}
            onSubmit={onSubmit}
            onCancel={handleCancel}
          />
        </div>

        <DialogFooter className="sticky bottom-0 rounded-none border-t bg-background px-6 py-4 sm:justify-end">
          <Button type="button" variant="outline" onClick={handleCancel} disabled={loading}>
            Cancel
          </Button>
          <Button type="button" onClick={handleFooterSubmit} disabled={loading}>
            {loading ? loadingLabel : submitLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}