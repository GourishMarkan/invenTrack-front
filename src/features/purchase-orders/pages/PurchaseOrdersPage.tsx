import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import PurchaseTable from "@/features/purchase-orders/components/PurchaseTable";
import PurchaseDialog from "@/features/purchase-orders/components/PurchaseDialog";
import DeletePurchaseDialog from "@/features/purchase-orders/components/DeletePurchaseDialog";

import { usePurchases } from "@/features/purchase-orders/hooks/usePurchases";
import { useCreatePurchase } from "@/features/purchase-orders/hooks/useCreatePurchase";
import { useUpdatePurchase } from "@/features/purchase-orders/hooks/useUpdatePurchase";
import { useDeletePurchase } from "@/features/purchase-orders/hooks/useDeletePurchase";

import type { Purchase } from "@/features/purchase-orders/types/purchase";

export default function PurchasesPage() {
  const [search, setSearch] = useState("");

  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [selectedPurchase, setSelectedPurchase] =
    useState<Purchase | undefined>();

  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");

  const { data: purchases = [], isLoading, isError, refetch } =
    usePurchases();

  const createPurchaseMutation = useCreatePurchase();
  const updatePurchaseMutation = useUpdatePurchase();
  const deletePurchaseMutation = useDeletePurchase();

  const filteredPurchases = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return purchases;
    }

    return purchases.filter((purchase) => {
      const supplierName =
        purchase.supplier?.name ??
        `Supplier ${purchase.supplierId}`;

      return (
        String(purchase.id).includes(query) ||
        supplierName.toLowerCase().includes(query) ||
        purchase.paymentType.toLowerCase().includes(query) ||
        purchase.paymentStatus.toLowerCase().includes(query)
      );
    });
  }, [purchases, search]);

  const handleCreate = () => {
    setSelectedPurchase(undefined);
    setDialogMode("create");
    setPurchaseDialogOpen(true);
  };

  const handleEdit = (purchase: Purchase) => {
    setSelectedPurchase(purchase);
    setDialogMode("edit");
    setPurchaseDialogOpen(true);
  };

  const handleView = (purchase: Purchase) => {
    // For now, open the purchase in edit mode.
    // A separate view dialog/page can be added later.
    setSelectedPurchase(purchase);
    setDialogMode("edit");
    setPurchaseDialogOpen(true);
  };

  const handleDelete = (purchase: Purchase) => {
    setSelectedPurchase(purchase);
    setDeleteDialogOpen(true);
  };

  const handlePurchaseSubmit = (data: any) => {
    if (dialogMode === "create") {
      createPurchaseMutation.mutate(data, {
        onSuccess: () => {
          setPurchaseDialogOpen(false);
        },
      });

      return;
    }

    if (!selectedPurchase) {
      return;
    }

    updatePurchaseMutation.mutate(
      {
        id: selectedPurchase.id,
        data,
      },
      {
        onSuccess: () => {
          setPurchaseDialogOpen(false);
        },
      }
    );
  };

  const handleDeleteConfirm = () => {
    if (!selectedPurchase) {
      return;
    }

    deletePurchaseMutation.mutate(selectedPurchase.id, {
      onSuccess: () => {
        setDeleteDialogOpen(false);
        setSelectedPurchase(undefined);
      },
    });
  };

  const isSubmitting =
    createPurchaseMutation.isPending ||
    updatePurchaseMutation.isPending;

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Purchases
          </h1>

          <p className="text-sm text-muted-foreground">
            Manage your purchases and supplier transactions.
          </p>
        </div>

        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Add Purchase
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search purchases..."
          className="pl-9"
        />
      </div>

      {/* Purchase Table */}
      <PurchaseTable
        purchases={filteredPurchases}
        isLoading={isLoading}
        isError={isError}
        onRetry={refetch}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Create / Edit Dialog */}
      <PurchaseDialog
        open={purchaseDialogOpen}
        onOpenChange={setPurchaseDialogOpen}
        mode={dialogMode}
        purchase={selectedPurchase}
        suppliers={[]}
        products={[]}
        loading={isSubmitting}
        onSubmit={handlePurchaseSubmit}
      />

      {/* Delete Dialog */}
      <DeletePurchaseDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        purchaseId={selectedPurchase?.id}
        onConfirm={handleDeleteConfirm}
        loading={deletePurchaseMutation.isPending}
      />
    </div>
  );
}