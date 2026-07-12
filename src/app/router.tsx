import { createBrowserRouter } from "react-router-dom";

import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import PurchaseOrdersPage from "@/features/purchase-orders/pages/PurchaseOrdersPage";
import PurchasesPage from "@/features/purchases/pages/PurchasesPage";
import ProductsPage from "@/features/products/pages/ProductsPage";
import SettingsPage from "@/features/settings/pages/SettingsPage";
import SuppliersPage from "@/features/suppliers/pages/SuppliersPage";
import LoginPage from "@/features/auth/pages/LoginPage";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },

  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },

      {
        path: "products",
        element: <ProductsPage />,
      },

      {
        path: "suppliers",
        element: <SuppliersPage />,
      },

      {
        path: "purchase-orders",
        element: <PurchaseOrdersPage />,
      },

      {
        path: "purchases",
        element: <PurchasesPage />,
      },

      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
]);
