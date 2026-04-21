import React from "react";
import { Filter, X, ChevronDown } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { CATEGORIES_DATA, BRANDS_DATA, COLORS_DATA } from "@/constants/shopData";

const FiltersContent = ({ 
  selectedCategory, setSelectedCategory, 
  selectedBrand, setSelectedBrand, 
  selectedColor, setSelectedColor, 
  priceRange, setPriceRange, 
  clearFilters, toggleSelection,
  activeFiltersCount, setShowMobileFilters 
}) => {

  const renderMultiFilter = (options, selected, setSelected, title) => (
    <div className="py-6 border-b border-slate-100 last:border-0">
      <h4 className="text-sm font-semibold uppercase tracking-widest text-slate-900 mb-4 flex items-center justify-between">
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
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border ${isActive
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
    <div className="bg-white rounded-[2rem] lg:rounded-[2rem] border lg:border-slate-200 shadow-sm p-8 h-full overflow-y-auto lg:overflow-visible">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2">
          <Filter size={18} className="text-primary" />
          FILTERS
        </h3>
        <div className="flex items-center gap-4">
          {activeFiltersCount > 0 && (
            <button onClick={clearFilters} className="text-xs font-semibold text-primary hover:underline">Reset All</button>
          )}
          <button 
            onClick={() => setShowMobileFilters(false)} 
            className="lg:hidden w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {renderMultiFilter(CATEGORIES_DATA, selectedCategory, setSelectedCategory, "Categories")}
        {renderMultiFilter(BRANDS_DATA, selectedBrand, setSelectedBrand, "Top Brands")}

        <div className="py-8">
          <h4 className="text-sm font-semibold uppercase tracking-widest text-slate-900 mb-6 flex items-center justify-between">
            Price Range
            <span className="text-primary font-semibold">₹{priceRange[1]}</span>
          </h4>
          <Slider value={priceRange} max={50000} step={500} onValueChange={setPriceRange} className="mb-4" />
          <div className="flex justify-between text-[10px] font-semibold text-slate-400 tracking-tighter uppercase">
            <span>min ₹0</span>
            <span>max ₹50,000</span>
          </div>
        </div>

        {renderMultiFilter(COLORS_DATA, selectedColor, setSelectedColor, "Palettes")}
      </div>
    </div>
  );
};

export default FiltersContent;


