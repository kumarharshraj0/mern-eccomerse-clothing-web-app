import React from "react";
import { X, ImagePlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ProductConfigSheet = ({ 
  sheetOpen, setSheetOpen, 
  editingProduct, formData, 
  imagePreviews, handleChange, 
  handleImageUpload, handleSubmit 
}) => {
  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetContent className="max-w-2xl sm:max-w-xl w-full border-none shadow-2xl p-0">
        <div className="h-full flex flex-col bg-white">
          <SheetHeader className="p-10 border-b border-slate-50">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">Configuration Tool</span>
                <SheetTitle className="text-3xl font-semibold tracking-tighter text-slate-900 uppercase">
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
            {/* Documentation */}
            <section className="space-y-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white text-xs font-semibold">01</div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-900">Registry Documentation</h4>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 ml-1">Asset Identity (Title)</Label>
                <Input name="title" value={formData.title} onChange={handleChange} className="h-14 rounded-xl border-slate-100 bg-slate-50 focus:bg-white transition-all font-semibold" placeholder="e.g. Quantum X Series" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 ml-1">Strategic Narrative (Description)</Label>
                <Textarea name="description" value={formData.description} onChange={handleChange} className="min-h-[120px] rounded-xl border-slate-100 bg-slate-50 focus:bg-white transition-all font-medium py-4" placeholder="Detail the asset's competitive advantages..." />
              </div>
            </section>

            {/* Economic Meta */}
            <section className="space-y-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white text-xs font-semibold">02</div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-900">Economic Parameters</h4>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 ml-1">Unit Valuation (₹)</Label>
                  <Input type="number" name="price" value={formData.price} onChange={handleChange} className="h-14 rounded-xl border-slate-100 bg-slate-50 font-semibold" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 ml-1">Stock Reservoir</Label>
                  <Input type="number" name="stock" value={formData.stock} onChange={handleChange} className="h-14 rounded-xl border-slate-100 bg-slate-50 font-semibold" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 ml-1">Classification (Category)</Label>
                  <Input name="category" value={formData.category} onChange={handleChange} className="h-14 rounded-xl border-slate-100 bg-slate-50 font-semibold" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 ml-1">Origin (Brand)</Label>
                  <Input name="brand" value={formData.brand} onChange={handleChange} className="h-14 rounded-xl border-slate-100 bg-slate-50 font-semibold" />
                </div>
              </div>
              {/* Optional: Sizes and Colors inputs could go here if needed, keeping them simple for now */}
            </section>

            {/* Visual Assets */}
            <section className="space-y-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white text-xs font-semibold">03</div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-900">Visual Evidence</h4>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <AnimatePresence>
                  {imagePreviews.map((img, idx) => (
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} key={idx} className="aspect-square relative group rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                      <img src={img} className="w-full h-full object-cover" alt="" />
                    </motion.div>
                  ))}
                </AnimatePresence>
                <label className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-50 transition-all text-slate-400">
                  <ImagePlus size={24} />
                  <span className="text-[8px] font-semibold uppercase tracking-widest">Add Media</span>
                  <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
            </section>
          </div>

          <div className="p-10 border-t border-slate-100 bg-slate-50/50">
            <Button size="xl" onClick={handleSubmit} className="w-full h-16 rounded-2xl bg-slate-900 text-white font-semibold uppercase tracking-[0.2em] shadow-2xl hover:scale-[1.01] active:scale-95 transition-all">
              Execute Synchronization
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProductConfigSheet;


