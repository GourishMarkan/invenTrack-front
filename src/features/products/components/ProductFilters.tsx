import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import type { Supplier } from "../types/product";


type ProductFiltersProps = {
  searchTerm: string;
  selectedSupplier: string;
  suppliers: Supplier[];
  onSearchChange: (value: string) => void;
  onSupplierChange: (value: string) => void;
};

export default function ProductFilters({
  searchTerm,
  selectedSupplier,
  suppliers,
  onSearchChange,
  onSupplierChange,
}: ProductFiltersProps) {
  return (
    <div className="grid gap-3 rounded-xl border border-border bg-card p-4 md:grid-cols-[1fr_220px]">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by product name or SKU"
          className="pl-9"
          aria-label="Search products"
        />
      </div>

      <select
        value={selectedSupplier}
        onChange={(event) => onSupplierChange(event.target.value)}
        className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-xs"
        aria-label="Filter by supplier"
      >
        <option value="all">All Suppliers</option>
        {suppliers.map((supplier: Supplier) => (
          <option key={supplier.id} value={supplier.name}>
            {supplier.name}
          </option>
        ))}
      </select>
    </div>
  );
}
