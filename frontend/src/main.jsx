import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import App from "./App.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { OrderProvider } from "./context/OrderContext.jsx";
import { AdminProvider } from "./context/AdminContext.jsx";
import { DeliveryProvider } from "./context/DeliveryBoyContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";

/* ------------------------------------
   React Query Client (Global Cache)
------------------------------------ */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
            <WishlistProvider>
          <ProductProvider>
            <CartProvider>
              <OrderProvider>
                <AdminProvider>
                  <DeliveryProvider>
                    <App />
                  </DeliveryProvider>
                </AdminProvider>
              </OrderProvider>
            </CartProvider>
          </ProductProvider>
          </WishlistProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);


