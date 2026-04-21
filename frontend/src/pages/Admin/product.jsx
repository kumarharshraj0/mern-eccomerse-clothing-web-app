import { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/context/ProductContext";
import { debounce } from "lodash";
import { motion, AnimatePresence } from "framer-motion";
import { useProductForm } from "@/hooks/useProductForm";
import ProductCard from "@/components/Admin/products/ProductCard";
import ProductConfigSheet from "@/components/Admin/products/ProductConfigSheet";
import ProductRegistryHeader from "@/components/Admin/products/ProductRegistryHeader";

export default function Product() {
  const location = useLocation();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const { products, getProducts, createProduct, updateProduct, deleteProduct } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const perPage = 8;

  const form = useProductForm(editingProduct, products, getProducts, updateProduct, createProduct, setSheetOpen);

  useEffect(() => { getProducts(); }, []);

  useEffect(() => {
    if (location.state?.editId && products?.length > 0) {
      const p = products.find(i => i._id === location.state.editId);
      if (p) { setEditingProduct(p); form.setEditData(p); setSheetOpen(true); window.history.replaceState({}, document.title); }
    }
  }, [location.state, products]);

  const handleEdit = (p) => { setEditingProduct(p); form.setEditData(p); setSheetOpen(true); };
  const handleDelete = async (id) => { if (confirm("Confirm asset termination?")) { await deleteProduct(id); getProducts(); } };
  const debouncedSearch = useMemo(() => debounce((v) => { setSearch(v); setCurrentPage(1); }, 300), []);

  const filtered = products.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.category?.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div className="space-y-12">
      <ProductRegistryHeader onSearch={debouncedSearch} onInitialize={() => { setEditingProduct(null); form.resetForm(); setSheetOpen(true); }} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <AnimatePresence mode="popLayout">
          {paginated.length === 0 ? (
            <div className="col-span-full py-32 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-200"><Filter size={40} /></div>
              <p className="text-xl font-semibold text-slate-900 uppercase tracking-tight">No match found</p>
            </div>
          ) : paginated.map((p, i) => <ProductCard key={p._id} p={p} i={i} onEdit={handleEdit} onDelete={handleDelete} />)}
        </AnimatePresence>
      </div>
      {totalPages > 1 && (
        <footer className="flex justify-center gap-4 pt-8">
          <Button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} variant="outline" className="rounded-xl h-12 w-12 p-0 border-slate-200"><ChevronLeft size={20} /></Button>
          <div className="flex items-center bg-white px-6 rounded-xl border border-slate-200 font-semibold text-xs uppercase tracking-widest">Page {currentPage} / {totalPages}</div>
          <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} variant="outline" className="rounded-xl h-12 w-12 p-0 border-slate-200"><ChevronRight size={20} /></Button>
        </footer>
      )}
      <ProductConfigSheet sheetOpen={sheetOpen} setSheetOpen={setSheetOpen} editingProduct={editingProduct} formData={form.formData} imagePreviews={form.imagePreviews} handleChange={form.handleChange} handleImageUpload={form.handleImageUpload} handleSubmit={form.handleSubmit} />
    </div>
  );
}



