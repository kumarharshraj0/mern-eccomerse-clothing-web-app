import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { STATUS_CONFIG } from "@/constants/adminOrders";

const OrderManagementSheet = ({ 
  sheetOpen, setSheetOpen, 
  currentOrder, status, setStatus, 
  deliveryBoy, setDeliveryBoy, 
  deliveryBoys, handleUpdate 
}) => {
  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetContent className="max-w-md w-full border-none shadow-2xl p-0">
        <div className="h-full flex flex-col bg-white">
          <SheetHeader className="p-10 border-b border-slate-50">
            <div className="space-y-1">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">Control Surface</span>
              <SheetTitle className="text-3xl font-semibold tracking-tighter text-slate-900 uppercase">
                Manage Transmission
              </SheetTitle>
            </div>
          </SheetHeader>

          {currentOrder && (
            <div className="flex-1 overflow-y-auto p-10 space-y-10">
              <section className="space-y-6">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white text-xs font-semibold">01</div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-900">Pipeline Status</h4>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 ml-1">Current State</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="h-14 rounded-xl border-slate-100 bg-slate-50 font-semibold uppercase tracking-widest text-xs">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-slate-100 shadow-2xl">
                      {Object.keys(STATUS_CONFIG).map((s) => (
                        <SelectItem key={s} value={s} className="font-semibold uppercase tracking-widest text-[10px] py-3">{STATUS_CONFIG[s].label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </section>

              <section className="space-y-6">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white text-xs font-semibold">02</div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-900">Logistics Assignment</h4>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 ml-1">Fulfillment Lead</Label>
                  <Select value={deliveryBoy} onValueChange={setDeliveryBoy}>
                    <SelectTrigger className="h-14 rounded-xl border-slate-100 bg-slate-50 font-semibold uppercase tracking-widest text-xs">
                      <SelectValue placeholder="Select Deployment Lead" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-slate-100 shadow-2xl">
                      {deliveryBoys.map((boy) => (
                        <SelectItem key={boy._id} value={boy._id} className="font-semibold uppercase tracking-widest text-[10px] py-3">{boy.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </section>
            </div>
          )}

          <div className="p-10 border-t border-slate-100 bg-slate-50/50">
            <Button
              size="xl"
              onClick={handleUpdate}
              className="w-full h-16 rounded-2xl bg-slate-900 text-white font-semibold uppercase tracking-[0.2em] shadow-2xl shadow-slate-200 hover:scale-[1.01] active:scale-95 transition-all"
            >
              Sync Pipeline Changes
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default OrderManagementSheet;


