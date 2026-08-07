import { useMemo, useState } from "react";
import { Plus, Search, ChevronRight } from "lucide-react";

import SupplierCard from "../components/SupplierCard";
import SupplierDialog from "../components/SupplierDialog";
import DeleteSupplierDialog from "../components/DeleteSupplierDialog";
import SupplierTable from "../components/SupplierTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useSuppliers } from "../hooks/useSuppliers";
import type { Supplier } from "@/features/suppliers/types/supplier";

export default function SuppliersPage() {
  const { data, isLoading, isError, refetch } = useSuppliers();

  const suppliers = useMemo(() => data ?? [], [data]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | undefined>(undefined);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [viewSupplier, setViewSupplier] = useState<Supplier | undefined>(undefined);

  const filteredSuppliers = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return suppliers;

    return suppliers.filter(
      (supplier) =>
        supplier.name.toLowerCase().includes(query) ||
        supplier.mobileNumber.toLowerCase().includes(query),
    );
  }, [searchTerm, suppliers]);

  const openCreateDialog = () => {
    setDialogMode("create");
    setSelectedSupplier(undefined);
    setDialogOpen(true);
  };

  const openEditDialog = (supplier: Supplier) => {
    setDialogMode("edit");
    setSelectedSupplier(supplier);
    setDialogOpen(true);
  };

  const openDeleteDialog = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setDeleteOpen(true);
  };

  const openViewSupplier = (supplier: Supplier) => {
    setViewSupplier(supplier);
  };

  const hasSuppliers = filteredSuppliers.length > 0;
  const useCards = filteredSuppliers.length > 0;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Suppliers</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">Supplier Management</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage supplier contacts and keep your purchasing workflow organized.
            </p>
          </div>

          <Button onClick={openCreateDialog} className="sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add Supplier
          </Button>
        </div>
      </div>

      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-4">
          <div className="relative max-w-xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search suppliers by name or phone"
              className="pl-9"
              aria-label="Search suppliers"
            />
          </div>
        </CardContent>
      </Card>

      {useCards ? (
        <div className="grid gap-4 md:hidden">
          {filteredSuppliers.map((supplier) => (
            <SupplierCard
              key={supplier.id}
              supplier={supplier}
              onView={openViewSupplier}
              onEdit={openEditDialog}
              onDelete={openDeleteDialog}
            />
          ))}
        </div>
      ) : null}

      <div className="hidden md:block">
        <SupplierTable
          suppliers={filteredSuppliers}
          isLoading={isLoading}
          isError={isError}
          onRetry={refetch}
          onView={openViewSupplier}
          onEdit={openEditDialog}
          onDelete={openDeleteDialog}
        />
      </div>

      {!isLoading && !isError && filteredSuppliers.length === 0 && (
        <Card className="rounded-2xl border-dashed bg-card shadow-sm">
          <CardContent className="flex flex-col items-center justify-center px-6 py-14 text-center">
            <p className="text-base font-medium text-foreground">No suppliers found.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Add a new supplier to start building your list.
            </p>
            <Button className="mt-5" onClick={openCreateDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Add Supplier
            </Button>
          </CardContent>
        </Card>
      )}

      <SupplierDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        mode={dialogMode}
        supplier={selectedSupplier}
      />

      <DeleteSupplierDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        supplier={selectedSupplier}
      />

      {viewSupplier && (
        <SupplierDialog
          open={Boolean(viewSupplier)}
          onOpenChange={(open) => {
            if (!open) setViewSupplier(undefined);
          }}
          mode="edit"
          supplier={viewSupplier}
        />
      )}
    </div>
  );
}