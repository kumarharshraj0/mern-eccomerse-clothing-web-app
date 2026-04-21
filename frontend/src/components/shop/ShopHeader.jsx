import React from "react";
import { Search, SlidersHorizontal, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SORT_OPTIONS } from "@/constants/shopData";

const ShopHeader = ({ 
  searchQuery, setSearchQuery, 
  sort, setSort, 
  setShowMobileFilters, 
  activeFiltersCount 
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
      <div className="space-y-1">
        <h1 className="text-4xl font-semibold tracking-tighter text-slate-900 uppercase text-center w-full mb-12">SwiftMart Collection</h1>
        <p className="text-slate-500 font-medium">Browse our curated collection</p>
      </div>

      <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
        <Button 
          onClick={() => setShowMobileFilters(true)}
          variant="outline" 
          className="lg:hidden h-12 flex-1 rounded-2xl border-slate-200 font-semibold gap-2 hover:bg-white shadow-sm"
        >
          <Filter size={16} />
          Filters
          {activeFiltersCount > 0 && (
            <span className="ml-1 w-5 h-5 rounded-full bg-primary text-white text-[10px] flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </Button>

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
            <Button variant="outline" className="h-12 flex-1 md:flex-initial rounded-2xl border-slate-200 font-semibold gap-2 hover:bg-white shadow-sm">
              <SlidersHorizontal size={16} />
              {sort}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl border-slate-200 p-2">
            <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
              {SORT_OPTIONS.map((opt) => (
                <DropdownMenuRadioItem key={opt} value={opt} className="rounded-lg font-medium py-2">
                  {opt}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ShopHeader;


