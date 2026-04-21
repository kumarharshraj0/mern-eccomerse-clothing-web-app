import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import useDebounce from "@/hooks/useDebounce";
import { useProducts } from "@/context/ProductContext";
import { SORT_OPTIONS } from "@/constants/shopData";

export const useShopFilters = () => {
  const location = useLocation();
  const { products, getProducts, loading, pagination } = useProducts();

  // Helper to parse query params
  const getInitialFilters = () => {
    const params = new URLSearchParams(location.search);
    const categoryFromURL = params.get("category");
    const brandFromURL = params.get("brand");
    const tagFromURL = params.get("tag");
    const queryFromURL = params.get("q") || "";

    const category = location.state?.filterType === "category" 
      ? [location.state.filterValue] 
      : (categoryFromURL ? [categoryFromURL] : []);
    
    const brand = location.state?.filterType === "brand" 
      ? [location.state.filterValue] 
      : (brandFromURL ? [brandFromURL] : []);

    return { category, brand, tag: tagFromURL, q: queryFromURL };
  };

  const initialFilters = getInitialFilters();

  const [sort, setSort] = useState(SORT_OPTIONS[0]);
  const [searchQuery, setSearchQuery] = useState(initialFilters.q);
  const [selectedCategory, setSelectedCategory] = useState(initialFilters.category);
  const [selectedBrand, setSelectedBrand] = useState(initialFilters.brand);
  const [selectedColor, setSelectedColor] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [page, setPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const debouncedSearch = useDebounce(searchQuery);
  const isFirstLoad = useRef(true);

  // Sync with navigation state and URL changes
  useEffect(() => {
    const filters = getInitialFilters();
    
    if (location.state?.filterType || location.search) {
      if (filters.category.length > 0) setSelectedCategory(filters.category);
      if (filters.brand.length > 0) setSelectedBrand(filters.brand);
      setSearchQuery(filters.q); // 🔥 Sync search query
      setPage(1);
    }
  }, [location.search, location.state]);


  const fetchProducts = useCallback(
    async (reset) => {
      const params = {
        q: debouncedSearch || undefined,
        category: selectedCategory.join(",") || undefined,
        brand: selectedBrand.join(",") || undefined,
        color: selectedColor.join(",") || undefined,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        sort:
          sort === "Price: Low to High" ? "price_asc" :
          sort === "Price: High to Low" ? "price_desc" :
          sort === "Newest" ? "newest" :
          sort === "Most Popular" ? "popularity" : "rating",
        page,
        limit: 8,
      };
      await getProducts(params, { reset });
    },
    [debouncedSearch, selectedCategory, selectedBrand, selectedColor, priceRange, sort, page, getProducts]
  );

  useEffect(() => {
    if (!isFirstLoad.current) setPage(1);
    isFirstLoad.current = false;
    fetchProducts(true);
  }, [debouncedSearch, selectedCategory, selectedBrand, selectedColor, priceRange, sort]);

  useEffect(() => {
    if (page > 1) fetchProducts(false);
  }, [page]);

  const clearFilters = () => {
    setSelectedCategory([]);
    setSelectedBrand([]);
    setSelectedColor([]);
    setPriceRange([0, 50000]);
    setSearchQuery("");
  };

  const toggleSelection = (value, selected, setSelected) => {
    setSelected(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value]
    );
  };

  return {
    products, loading, pagination,
    sort, setSort,
    searchQuery, setSearchQuery,
    selectedCategory, setSelectedCategory,
    selectedBrand, setSelectedBrand,
    selectedColor, setSelectedColor,
    priceRange, setPriceRange,
    page, setPage,
    showMobileFilters, setShowMobileFilters,
    clearFilters, toggleSelection
  };
};


