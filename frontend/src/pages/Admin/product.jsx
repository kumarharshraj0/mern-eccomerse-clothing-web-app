import { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import {
  Plus,
  Edit,
  Trash2,
  ImagePlus,
  Search,
  Package,
  ChevronLeft,
  ChevronRight,
  Filter,
  ArrowUpDown,
  MoreVertical,
  X,
  Zap
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useProducts } from "@/context/ProductContext";
import { toast } from "react-hot-toast";
import { debounce } from "lodash";
import { motion, AnimatePresence } from "framer-motion";

export default function Product() {
  const location = useLocation();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    brand: "",
    sizes: "",
    colors: "",
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const { products, getProducts, createProduct, updateProduct, deleteProduct } = useProducts();

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;
  const [search, setSearch] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  // Handle deep-linked edit from other pages
  useEffect(() => {
    if (location.state?.editId && products?.length > 0) {
      const p = products.find(item => item._id === location.state.editId);
      if (p) {
        setEditingProduct(p);
        setFormData({
          title: p.title,
          description: p.description,
          price: p.price,
          stock: p.stock,
          category: p.category,
          brand: p.brand,
          sizes: p.sizes?.join(",") || "",
          colors: p.colors?.join(",") || "",
        });
        setImageFiles([]);
        setImagePreviews(p.images?.map(img => img.url) || []);
        setSheetOpen(true);
        // Clear state to avoid opening on every render/refresh
        window.history.replaceState({}, document.title);
      }
    }
  }, [location.state, products]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setImageFiles(files);
    setImagePreviews(files.map(f => URL.createObjectURL(f)));
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", price: "", stock: "", category: "", brand: "", sizes: "", colors: "" });
    setImageFiles([]);
    setImagePreviews([]);
    setEditingProduct(null);
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.price || !formData.stock) {
      toast.error("Critical fields missing: Title, Price, Stock");
      return;
    }

    try {
      const productData = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        sizes: formData.sizes.split(",").map(s => s.trim()).filter(Boolean),
        colors: formData.colors.split(",").map(c => c.trim()).filter(Boolean),
      };

      if (imageFiles.length > 0) {
        const toBase64 = (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (err) => reject(err);
          });
        productData.images = await Promise.all(imageFiles.map(f => toBase64(f)));
      }

      if (editingProduct) {
        await updateProduct(editingProduct._id, productData);
        toast.success("Asset configuration synchronized");
      } else {
        await createProduct(productData);
        toast.success("New asset initialized in registry");
      }

      await getProducts();
      resetForm();
      setSheetOpen(false);
    } catch (err) {
      toast.error("Synchronization failure");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Confirm asset termination? This action is irreversible.")) return;
    try {
      await deleteProduct(id);
      await getProducts();
      toast.success("Asset purged from registry");
    } catch (err) {
      toast.error("Decommissioning failed");
    }
  };

  const debouncedSearch = useMemo(
    () => debounce((val) => { setSearch(val); setCurrentPage(1); }, 300),
    []
  );

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase()) ||
      p.brand?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / perPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div className="space-y-12">
      {/* Dynamic Inventory Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-1">
          <div className="flex items-center gap-3 text-primary mb-2">
            <Package size={24} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Module 02: Inventory</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">Asset Registry</h1>
          <p className="text-slate-500 font-medium font-serif italic text-lg">Managing high-performance stock levels</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
            <Input
              placeholder="Query registry..."
              className="pl-12 h-14 rounded-2xl border-slate-100 bg-white shadow-sm focus:ring-4 focus:ring-primary/5 transition-all font-bold"
              onChange={(e) => debouncedSearch(e.target.value)}
            />
          </div>
          <Button
            size="xl"
            onClick={() => { resetForm(); setSheetOpen(true); }}
            className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest bg-primary shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all gap-3"
          >
            <Plus size={20} />
            Initialize Asset
          </Button>
        </div>
      </header>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <AnimatePresence mode="popLayout">
          {paginatedProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-32 flex flex-col items-center justify-center text-center space-y-4"
            >
              <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-200">
                <Filter size={40} />
              </div>
              <div>
                <p className="text-xl font-black text-slate-900 uppercase tracking-tight">No match found</p>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Adjust your query parameters</p>
              </div>
            </motion.div>
          ) : (
            paginatedProducts.map((p, i) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-primary/5 transition-all overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/5] bg-slate-50 relative overflow-hidden">
                  <img
                    src={p.images?.[0]?.url || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop"}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex items-end justify-between">
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-xl w-10 h-10 bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white hover:text-primary transition-all"
                        onClick={() => {
                          setEditingProduct(p);
                          setFormData({
                            title: p.title,
                            description: p.description,
                            price: p.price,
                            stock: p.stock,
                            category: p.category,
                            brand: p.brand,
                            sizes: p.sizes?.join(",") || "",
                            colors: p.colors?.join(",") || "",
                          });
                          setImageFiles([]);
                          setImagePreviews(p.images?.map(img => img.url) || []);
                          setSheetOpen(true);
                        }}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        className="rounded-xl w-10 h-10"
                        onClick={() => handleDelete(p._id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                    <Badge className="bg-primary text-white font-black uppercase tracking-widest text-[9px] px-3 py-1 rounded-full shadow-lg">Live</Badge>
                  </div>
                </div>

                <div className="p-8 space-y-4 flex-1 flex flex-col">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{p.category || "General"}</p>
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1"><Zap size={10} /> {p.brand}</p>
                    </div>
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight truncate">{p.title}</h3>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Unit Valuation</p>
                      <p className="text-xl font-black text-slate-900 tracking-tighter">₹{p.price.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Inventory</p>
                      <p className={`text-sm font-black uppercase tracking-widest ${p.stock < 10 ? 'text-rose-500' : 'text-slate-900'}`}>{p.stock} Units</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Registry Navigation */}
      {totalPages > 1 && (
        <footer className="flex justify-center gap-4 pt-8">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            variant="outline"
            className="rounded-xl h-12 w-12 p-0 border-slate-200"
          >
            <ChevronLeft size={20} />
          </Button>
          <div className="flex items-center bg-white px-6 rounded-xl border border-slate-200 font-black text-xs uppercase tracking-widest">
            Page {currentPage} / {totalPages}
          </div>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            variant="outline"
            className="rounded-xl h-12 w-12 p-0 border-slate-200"
          >
            <ChevronRight size={20} />
          </Button>
        </footer>
      )}

      {/* Asset Configuration Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="max-w-2xl sm:max-w-xl w-full border-none shadow-2xl p-0">
          <div className="h-full flex flex-col bg-white">
            <SheetHeader className="p-10 border-b border-slate-50">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Configuration Tool</span>
                  <SheetTitle className="text-3xl font-black tracking-tighter text-slate-900 uppercase">
                    {editingProduct ? "Synchronize Asset" : "Initialize Asset"}
                  </SheetTitle>
                </div>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-xl bg-slate-50">
                    <X size={20} />
                  </Button>
                </SheetTrigger>
              </div>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto p-10 space-y-8 scrollbar-hide">
              {/* Asset Documentation */}
              <section className="space-y-6">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white text-xs font-black">01</div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">Registry Documentation</h4>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Asset Identity (Title)</Label>
                  <Input name="title" value={formData.title} onChange={handleChange} className="h-14 rounded-xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-bold" placeholder="e.g. Quantum X Series" />
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Strategic Narrative (Description)</Label>
                  <Textarea name="description" value={formData.description} onChange={handleChange} className="min-h-[120px] rounded-xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-medium py-4" placeholder="Detail the asset's competitive advantages..." />
                </div>
              </section>

              {/* Economic & Volume Meta */}
              <section className="space-y-6">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white text-xs font-black">02</div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">Economic Parameters</h4>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Unit Valuation (₹)</Label>
                    <Input type="number" name="price" value={formData.price} onChange={handleChange} className="h-14 rounded-xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-black" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Stock Reservoir</Label>
                    <Input type="number" name="stock" value={formData.stock} onChange={handleChange} className="h-14 rounded-xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-black" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Classification (Category)</Label>
                    <Input name="category" value={formData.category} onChange={handleChange} className="h-14 rounded-xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-bold" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Origin (Brand)</Label>
                    <Input name="brand" value={formData.brand} onChange={handleChange} className="h-14 rounded-xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-bold" />
                  </div>
                </div>
              </section>

              {/* Visual Assets */}
              <section className="space-y-6">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white text-xs font-black">03</div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">Visual Evidence</h4>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <AnimatePresence>
                    {imagePreviews.map((img, idx) => (
                      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} key={idx} className="aspect-square relative group rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                        <img src={img} className="w-full h-full object-cover" alt="" />
                        <button className="absolute top-2 right-2 w-6 h-6 bg-rose-500 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <X size={14} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <label className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-50 transition-all text-slate-400 hover:text-primary hover:border-primary">
                    <ImagePlus size={24} />
                    <span className="text-[8px] font-black uppercase tracking-widest">Add Media</span>
                    <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
              </section>
            </div>

            <div className="p-10 border-t border-slate-100 bg-slate-50/50">
              <Button
                size="xl"
                onClick={handleSubmit}
                className="w-full h-16 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-[0.2em] shadow-2xl shadow-slate-200 hover:scale-[1.01] active:scale-95 transition-all"
              >
                Execute Synchronization
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
