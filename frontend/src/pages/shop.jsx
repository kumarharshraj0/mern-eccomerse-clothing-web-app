import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Filter, ChevronDown, SlidersHorizontal, Search } from "lucide-react";
import { useProducts } from "@/context/ProductContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import useDebounce from "@/hooks/useDebounce";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProductCard from "@/components/ProductCard";

/* ---------------- CONSTANTS ---------------- */
const sortOptions = [
  "Most Popular",
  "Best Rating",
  "Newest",
  "Price: Low to High",
  "Price: High to Low",
];

const categoriesData = ["Mens", "Womens", "Footwear", "Kids", "Grocery", "Fashion"];
const brandsData = ["Zara", "Nike", "Adidas", "Puma", "H&M", "Gucci", "Prada"];
const colorsData = ["White", "Black", "Gray", "Red", "Blue"];
const sizesData = ["XS", "S", "M", "L", "XL"];

export default function ProductsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { products, getProducts, loading, pagination } = useProducts();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  /* ---------------- STATE ---------------- */
  const [sort, setSort] = useState(sortOptions[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    location.state?.filterType === "category" ? [location.state.filterValue] : []
  );
  const [selectedBrand, setSelectedBrand] = useState(
    location.state?.filterType === "brand" ? [location.state.filterValue] : []
  );
  const [selectedColor, setSelectedColor] = useState([]);
  const [selectedSize, setSelectedSize] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(searchQuery);
  const isFirstLoad = useRef(true);

  /* ---------------- NAV STATE ---------------- */
  useEffect(() => {
    if (location.state?.filterType) {
      const { filterType, filterValue } = location.state;
      if (filterType === "category") {
        setSelectedCategory([filterValue]);
        setSelectedBrand([]);
      }
      if (filterType === "brand") {
        setSelectedBrand([filterValue]);
        setSelectedCategory([]);
      }
      setPage(1);
    }
  }, [location.state]);

  /* ---------------- FETCH PRODUCTS ---------------- */
  const fetchProducts = useCallback(
    async (reset) => {
      const params = {
        q: debouncedSearch || undefined,
        category: selectedCategory.join(",") || undefined,
        brand: selectedBrand.join(",") || undefined,
        color: selectedColor.join(",") || undefined,
        size: selectedSize.join(",") || undefined,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        sort:
          sort === "Price: Low to High"
            ? "price_asc"
            : sort === "Price: High to Low"
              ? "price_desc"
              : sort === "Newest"
                ? "newest"
                : sort === "Most Popular"
                  ? "popularity"
                  : "rating",
        page,
        limit: 8,
      };
      await getProducts(params, { reset });
    },
    [debouncedSearch, selectedCategory, selectedBrand, selectedColor, selectedSize, priceRange, sort, page, getProducts]
  );

  useEffect(() => {
    if (!isFirstLoad.current) setPage(1);
    isFirstLoad.current = false;
    fetchProducts(true);
  }, [debouncedSearch, selectedCategory, selectedBrand, selectedColor, selectedSize, priceRange, sort]);

  useEffect(() => {
    if (page > 1) fetchProducts(false);
  }, [page]);

  /* ---------------- HANDLERS ---------------- */
  const handleNavigate = useCallback((id) => navigate(`/products/${id}`), [navigate]);
  const handleAddToCart = useCallback((id) => addToCart(id, 1), [addToCart]);

  const toggleSelection = useCallback((value, selected, setSelected) => {
    setSelected(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value]
    );
  }, []);

  const clearFilters = () => {
    setSelectedCategory([]);
    setSelectedBrand([]);
    setSelectedColor([]);
    setSelectedSize([]);
    setPriceRange([0, 50000]);
    setSearchQuery("");
  };

  const removeFilter = (val, type) => {
    if (type === "category") setSelectedCategory(prev => prev.filter(item => item !== val));
    if (type === "brand") setSelectedBrand(prev => prev.filter(item => item !== val));
    if (type === "color") setSelectedColor(prev => prev.filter(item => item !== val));
    if (type === "size") setSelectedSize(prev => prev.filter(item => item !== val));
  };

  const activeFilters = [
    ...selectedCategory.map(v => ({ val: v, type: 'category' })),
    ...selectedBrand.map(v => ({ val: v, type: 'brand' })),
    ...selectedColor.map(v => ({ val: v, type: 'color' })),
    ...selectedSize.map(v => ({ val: v, type: 'size' })),
  ];

  /* ---------------- UI HELPERS ---------------- */
  const renderMultiFilter = (options, selected, setSelected, title) => (
    <div className="py-6 border-b border-slate-100 last:border-0">
      <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4 flex items-center justify-between">
        {title}
        <ChevronDown size={14} className="text-slate-400" />
      </h4>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isActive = selected.includes(opt);
          return (
            <button
              key={opt}
              onClick={() => toggleSelection(opt, selected, setSelected)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 border ${isActive
                ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "bg-white border-slate-200 text-slate-600 hover:border-primary hover:text-primary"
                }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="max-w-[1440px] mx-auto px-6 py-12">

        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase text-center w-full mb-12">SwiftMart Collection</h1>
            <p className="text-slate-500 font-medium font-serif italic">Displaying luxury essentials & modern classics</p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-sm"
                placeholder="Search collection..."
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-12 rounded-2xl border-slate-200 font-bold gap-2 hover:bg-white shadow-sm">
                  <SlidersHorizontal size={16} />
                  {sort}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-xl border-slate-200 p-2">
                <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                  {sortOptions.map((opt) => (
                    <DropdownMenuRadioItem key={opt} value={opt} className="rounded-lg font-medium py-2">
                      {opt}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 items-start">

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-32 space-y-2">
            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-black tracking-tight flex items-center gap-2">
                  <Filter size={18} className="text-primary" />
                  FILTERS
                </h3>
                {activeFilters.length > 0 && (
                  <button onClick={clearFilters} className="text-xs font-bold text-primary hover:underline">Reset All</button>
                )}
              </div>

              <div className="divide-y divide-slate-100">
                {renderMultiFilter(categoriesData, selectedCategory, setSelectedCategory, "Categories")}
                {renderMultiFilter(brandsData, selectedBrand, setSelectedBrand, "Top Brands")}

                {/* Price Slider Refined */}
                <div className="py-8">
                  <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6 flex items-center justify-between">
                    Price Range
                    <span className="text-primary font-bold">₹{priceRange[1]}</span>
                  </h4>
                  <Slider value={priceRange} max={50000} step={500} onValueChange={setPriceRange} className="mb-4" />
                  <div className="flex justify-between text-[10px] font-black text-slate-400 tracking-tighter uppercase">
                    <span>min ₹0</span>
                    <span>max ₹50,000</span>
                  </div>
                </div>

                {renderMultiFilter(colorsData, selectedColor, setSelectedColor, "Palettes")}
                {renderMultiFilter(sizesData, selectedSize, setSelectedSize, "Available Size")}
              </div>
            </div>
          </aside>

          {/* Main Grid Area */}
          <main className="space-y-8">
            {/* Active Chips */}
            <AnimatePresence>
              {activeFilters.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-wrap gap-2"
                >
                  {activeFilters.map((f, i) => (
                    <span key={i} className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/5 border border-primary/20 rounded-full text-[11px] font-black uppercase text-primary tracking-wide">
                      {f.val}
                      <button onClick={() => removeFilter(f.val, f.type)} className="hover:text-slate-900 transition-colors">
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {products.length > 0 ? (
                  products.map((product, idx) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                    >
                      <ProductCard
                        product={product}
                        onNavigate={handleNavigate}
                        onAddToCart={() => handleAddToCart(product._id)}
                        onToggleWishlist={() =>
                          isInWishlist(product._id)
                            ? removeFromWishlist(product._id)
                            : addToWishlist(product._id)
                        }
                        isWishlisted={isInWishlist(product._id)}
                      />
                    </motion.div>
                  ))
                ) : (
                  !loading && (
                    <div className="col-span-full py-32 text-center space-y-4">
                      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                        <Search size={32} />
                      </div>
                      <h3 className="text-xl font-bold">No items found</h3>
                      <p className="text-slate-500 max-w-xs mx-auto text-sm font-medium">Try adjusting your filters or search term to find what you're looking for.</p>
                      <Button variant="link" onClick={clearFilters} className="font-bold">Clear all filters</Button>
                    </div>
                  )
                )}
              </AnimatePresence>
            </div>

            {/* Pagination / Loading */}
            <div className="flex flex-col items-center pt-12">
              {loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 w-full">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-[400px] w-full bg-slate-200/50 rounded-2xl animate-pulse" />
                  ))}
                </div>
              )}

              {!loading && pagination?.hasNextPage && (
                <Button
                  onClick={() => setPage((p) => p + 1)}
                  size="xl"
                  className="rounded-full px-16 py-8 font-black text-lg bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-none shadow-2xl shadow-slate-200/50 hover:shadow-primary/20 hover:-translate-y-1 active:scale-95 transition-all duration-300 group overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 transition-transform duration-1000 translate-x-[-100%] group-hover:translate-x-[100%]" />
                  <span className="relative flex items-center gap-3">
                    Discover More
                    <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform duration-300" />
                  </span>
                </Button>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}



