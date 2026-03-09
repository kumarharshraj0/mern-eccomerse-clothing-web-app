import React, { Suspense, lazy } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { Toaster } from "sonner";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import { useAuth } from "./context/AuthContext";
import PageSkeleton from "./components/PageSkeleton";
import AdminLayout from "./pages/AdminLayout";

/* ===================== LAZY LOADED PAGES ===================== */

// Public
const Home = lazy(() => import("./pages/Home"));
const CartPage = lazy(() => import("./pages/Cart"));
const WishlistPage = lazy(() => import("./pages/Wishlist"));
const ProductsPage = lazy(() => import("./pages/shop"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Signin = lazy(() => import("./pages/Signin"));
const Signup = lazy(() => import("./pages/Signup"));
const ForgotPassword = lazy(() => import("./pages/forgetPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const ChangePassword = lazy(() => import("./pages/ChangePassword"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Account = lazy(() => import("./pages/Account"));
const MyOrders = lazy(() => import("./pages/MyOrders"));
const OrderPage = lazy(() => import("./pages/OrderPage"));
const OrderSuccess = lazy(() => import("./pages/OrderSuccess"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));

// Admin
const Dashboard = lazy(() => import("./pages/Admin/Dashboard"));
const AdminProducts = lazy(() => import("./pages/Admin/product"));
const Orders = lazy(() => import("./pages/Admin/Orders"));
const Delivery = lazy(() => import("./pages/Admin/Delivery"));
const AdminCoupons = lazy(() => import("./pages/Admin/AdminCoupons"));

// Delivery Boy
const DeliveryDashboard = lazy(() =>
  import("./pages/DeliveryBoy/DeliveryDashboard")
);
const DeliveryBoyAssignedOrders = lazy(() =>
  import("./pages/DeliveryBoyAssignedOrders")
);

/* ===================== LAYOUTS ===================== */

const PublicLayout = () => (
  <>
    <Navbar />
    <Suspense fallback={<PageSkeleton />}>
      <PageTransition>
        <Outlet />
      </PageTransition>
    </Suspense>
    <Footer />
  </>
);

const DeliveryLayout = () => (
  <Suspense fallback={<PageSkeleton />}>
    <Outlet />
  </Suspense>
);

function App() {
  const { user } = useAuth();

  return (
    <>
      <Routes>
        {/* Public Routes with Navbar */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account" element={<Account />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/orders/:id" element={<OrderPage />} />
          <Route path="/order-success/:id" element={<OrderSuccess />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Route>

        {/* Admin Routes (No Navbar) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<Orders />} />
          <Route path="delivery-boys" element={<Delivery />} />
          <Route path="coupons" element={<AdminCoupons />} />
          <Route path="*" element={<h1>404 Admin Resource Not Found</h1>} />
        </Route>

        {/* Delivery Boy Routes (No Navbar) */}
        <Route path="/delivery" element={<DeliveryLayout />}>
          <Route path="dashboard" element={<DeliveryDashboard />} />
          <Route path="delivery-boy" element={<DeliveryBoyAssignedOrders />} />
        </Route>

        {/* Global 404 */}
        <Route path="*" element={<h1 className="text-center py-20 text-2xl font-black uppercase tracking-widest text-slate-300">404 Page Not Found</h1>} />
      </Routes>

      <Toaster position="top-right" richColors closeButton expand={false} />
    </>
  );
}

export default App;





