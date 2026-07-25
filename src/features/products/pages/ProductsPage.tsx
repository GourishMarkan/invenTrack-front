import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProductFilters from "@/features/products/components/ProductFilters";
import ProductForm from "@/features/products/components/ProductForm";
import ProductTable from "@/features/products/components/ProductTable";
import type { Product } from "@/features/products/types/product";
import { useProduct } from "../hooks/useProducts";


type ProductFormValues = {
  name: string;
  sku: string;
  supplier: string;
  costPrice: number;
  sellingPrice: number;
  stock: number;
  minStock: number;
};

export default function ProductsPage() {
  const {data}=useProduct();
  const [products, setProducts] = useState<Product[]>([] );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
useEffect(() => {
  if (data) setProducts(data);
}, [data]);
  // Prepared flags for future TanStack Query integration.
  const isLoading = false;
  const isError = false;

  

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) 

      const matchesSupplier =
        selectedSupplier === "all" || product.supplier === selectedSupplier;

      return matchesSearch && matchesSupplier;
    });
  }, [products, searchTerm, selectedSupplier]);

  const openCreateForm = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = (product: Product) => {
    setProducts((current) => current.filter((item) => item.id !== product.id));
  };

  const handleSave = (values: ProductFormValues) => {
    if (editingProduct) {
      setProducts((current) =>
        current.map((item) =>
          item.id === editingProduct.id ? { ...item, ...values } : item,
        ),
      );
    } else {
      setProducts((current) => {
        const nextId = current.length > 0 ? Math.max(...current.map((item) => item.id)) + 1 : 1;
        return [...current, { id: nextId, ...values }];
      });
    }

    setEditingProduct(null);
    setIsFormOpen(false);
  };

  const closeForm = () => {
    setEditingProduct(null);
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-5">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Products</h1>
          <p className="text-sm text-muted-foreground">
            Track product pricing, supplier assignments, and stock health.
          </p>
        </div>

        <Button type="button" className="w-full sm:w-auto" onClick={openCreateForm}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </header>

      {/* <ProductFilters
        searchTerm={searchTerm}
        selectedSupplier={selectedSupplier}
        suppliers={suppliers}
        onSearchChange={setSearchTerm}
        onSupplierChange={setSelectedSupplier}
      /> */}

      {isFormOpen && (
        <Card className="border-border">
          <CardHeader>
            <CardTitle>{editingProduct ? "Edit Product" : "Add Product"}</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductForm
              initialValues={editingProduct ?? undefined}
              onSubmit={handleSave}
              onCancel={closeForm}
            />
          </CardContent>
        </Card>
      )}

      {isLoading && (
        <Card className="border-border">
          <CardContent className="py-14 text-center text-sm text-muted-foreground">
            Loading products...
          </CardContent>
        </Card>
      )}

      {!isLoading && isError && (
        <Card className="border-border">
          <CardContent className="flex flex-col items-center gap-2 py-14 text-center">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <p className="text-sm font-medium text-foreground">Unable to load products.</p>
            <p className="text-sm text-muted-foreground">Please try again in a moment.</p>
          </CardContent>
        </Card>
      )}

      {!isLoading && !isError && filteredProducts.length === 0 && (
        <Card className="border-border">
          <CardContent className="py-14 text-center">
            <p className="text-sm font-medium text-foreground">No products found.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your search or supplier filter.
            </p>
          </CardContent>
        </Card>
      )}

      {!isLoading && !isError && filteredProducts.length > 0 && (
        <ProductTable
          products={filteredProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}