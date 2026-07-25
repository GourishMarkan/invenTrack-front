type StockBadgeProps = {
  stock: number;
  minStock: number;
};

function getStatus(stock: number, minStock: number) {
  if (stock <= 0) {
    return {
      label: "Out of Stock",
      className: "bg-red-100 text-red-700 border-red-200",
    };
  }

  if (stock <= minStock) {
    return {
      label: "Low Stock",
      className: "bg-yellow-100 text-yellow-700 border-yellow-200",
    };
  }

  return {
    label: "In Stock",
    className: "bg-emerald-100 text-emerald-700 border-emerald-200",
  };
}

export default function StockBadge({ stock, minStock }: StockBadgeProps) {
  const status = getStatus(stock, minStock);

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${status.className}`}
    >
      {status.label}
    </span>
  );
}
