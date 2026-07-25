import { PencilLine, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import StockBadge from "@/features/products/components/StockBadge";
import type { Product } from "@/features/products/types/product";

type ProductTableProps = {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
};

export default function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Product Name</th>
              {/* <th className="px-4 py-3">SKU</th> */}
              <th className="px-4 py-3">Supplier</th>
              <th className="px-4 py-3">Cost Price</th>
              <th className="px-4 py-3">Selling Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-muted/30">
                <td className="px-4 py-3 font-medium text-foreground">{product.name}</td>
                {/* <td className="px-4 py-3 text-muted-foreground">{product.sku}</td> */}
                <td className="px-4 py-3 text-muted-foreground">{product.supplier.name}</td>
                <td className="px-4 py-3 text-muted-foreground">Rs {product.costPrice.toFixed(2)}</td>
                <td className="px-4 py-3 text-muted-foreground">Rs {product.sellingPrice.toFixed(2)}</td>
                <td className="px-4 py-3 text-foreground">{product.stock}</td>
                <td className="px-4 py-3">
                  <StockBadge stock={product.stock} minStock={product.minStock} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-8"
                      onClick={() => onEdit(product)}
                    >
                      <PencilLine className="mr-1 h-3.5 w-3.5" />
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-8 border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
                      onClick={() => onDelete(product)}
                    >
                      <Trash2 className="mr-1 h-3.5 w-3.5" />
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
