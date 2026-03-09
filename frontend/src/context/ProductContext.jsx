import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import API from "../lib/api";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

const ProductContext = createContext(null);


/* ================= PROVIDER ================= */
export const ProductProvider = ({ children }) => {
  const { apiRequest } = useAuth();

  /* ---------- STATE ---------- */
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 8,
    total: 0,
    totalPages: 1,
    hasNextPage: false,
  });

  const [latestProducts, setLatestProducts] = useState([]);
  const [loadingLatest, setLoadingLatest] = useState(false);

  /* ================= GET PRODUCTS ================= */
  const getProducts = useCallback(
    async (params = {}, options = { reset: false }) => {
      try {
        setLoading(true);

        const { data } = await API.get("/products", {
          params,
        });

        setProducts((prev) =>
          options.reset ? data.products || [] : [...prev, ...(data.products || [])]
        );

        if (data.pagination) {
          setPagination(data.pagination);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /* ================= GET PRODUCT BY ID ================= */
  const getProductById = useCallback(async (id) => {
    try {
      const { data } = await API.get(`/products/${id}`);
      return data;
    } catch (error) {
      toast.error("Failed to load product");
      throw error;
    }
  }, []);

  /* ================= LATEST PRODUCTS ================= */
  const getLatestProducts = useCallback(async () => {
    try {
      setLoadingLatest(true);
      const { data } = await API.get("/products/latest");
      setLatestProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Failed to load latest products");
    } finally {
      setLoadingLatest(false);
    }
  }, []);

  /* ================= ADMIN ACTIONS ================= */
  const createProduct = useCallback(
    async (data) => {
      const res = await apiRequest(() => API.post("/products", data));
      toast.success("Product created");
      return res.data;
    },
    [apiRequest]
  );

  const updateProduct = useCallback(
    async (id, data) => {
      const res = await apiRequest(() => API.put(`/products/${id}`, data));
      toast.success("Product updated");
      return res.data;
    },
    [apiRequest]
  );

  const deleteProduct = useCallback(
    async (id) => {
      const res = await apiRequest(() => API.delete(`/products/${id}`));
      toast.success("Product deleted");
      return res.data;
    },
    [apiRequest]
  );

  /* ================= REVIEWS ================= */
  const createReview = useCallback(
    (productId, data) => {
      return apiRequest(() => API.post(`/products/${productId}/reviews`, data));
    },
    [apiRequest]
  );

  const updateReview = useCallback(
    (productId, data) => {
      return apiRequest(() => API.put(`/products/${productId}/reviews`, data));
    },
    [apiRequest]
  );

  const deleteReview = useCallback(
    (productId) => {
      return apiRequest(() => API.delete(`/products/${productId}/reviews`));
    },
    [apiRequest]
  );

  /* ================= CONTEXT VALUE (🔥 MOST IMPORTANT) ================= */
  const value = useMemo(
    () => ({
      products,
      loading,
      pagination,
      latestProducts,
      loadingLatest,
      getProducts,
      getProductById,
      getLatestProducts,
      createProduct,
      updateProduct,
      deleteProduct,
      createReview,
      updateReview,
      deleteReview,
    }),
    [
      products,
      loading,
      pagination,
      latestProducts,
      loadingLatest,
      getProducts,
      getProductById,
      getLatestProducts,
      createProduct,
      updateProduct,
      deleteProduct,
      createReview,
      updateReview,
      deleteReview,
    ]
  );

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

/* ================= CUSTOM HOOK ================= */
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within ProductProvider");
  }
  return context;
};













