import React, { useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import {
    Ticket,
    Plus,
    Trash2,
    Calendar,
    Clock,
    Tag,
    ShieldCheck,
    ChevronRight,
    Zap,
    Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

const AdminCoupons = () => {
    const { coupons, createCoupon, deleteCoupon, fetchCoupons, loading } = useAdmin();
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    React.useEffect(() => {
        fetchCoupons();
    }, [fetchCoupons]);
    const [formData, setFormData] = useState({
        code: "",
        discount: "",
        expiryDate: "",
        usageLimit: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createCoupon({
                ...formData,
                discount: Number(formData.discount),
                usageLimit: formData.usageLimit ? Number(formData.usageLimit) : undefined
            });
            setIsSheetOpen(false);
            setFormData({ code: "", discount: "", expiryDate: "", usageLimit: "" });
        } catch (err) {
            // toast handled in context
        }
    };

    return (
        <div className="flex-1 p-8 md:p-12 space-y-12 bg-slate-50 min-h-screen">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-1">
                    <div className="flex items-center gap-3 text-primary mb-2">
                        <Ticket size={24} />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Marketing Module 04</span>
                    </div>
                    <h1 className="text-4xl font-semibold tracking-tighter text-slate-900 uppercase">Promotion Registry</h1>
                    <p className="text-slate-500 font-medium font-serif text-lg">Secure coupon issuance & attribution tracking</p>
                </div>

                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                        <Button size="lg" className="h-16 px-8 rounded-2xl bg-slate-900 text-white font-semibold uppercase tracking-widest text-[10px] shadow-2xl shadow-slate-200 hover:scale-[1.02] active:scale-95 transition-all gap-3">
                            <Plus size={16} /> Mint New Coupon
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="w-full sm:max-w-md bg-white border-l border-slate-100 p-10">
                        <SheetHeader className="mb-10 text-left">
                            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-primary mb-4">
                                <Zap size={20} />
                            </div>
                            <SheetTitle className="text-3xl font-semibold uppercase tracking-tighter">Issue Coupon</SheetTitle>
                            <p className="text-slate-400 font-medium font-serif text-sm">Configure cryptographic discount tokens</p>
                        </SheetHeader>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[9px] font-semibold uppercase tracking-widest text-slate-400">Coupon Code</label>
                                <input
                                    required
                                    value={formData.code}
                                    onChange={e => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                    placeholder="E.G. SUMM3R25"
                                    className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-6 font-semibold uppercase tracking-widest text-sm focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-semibold uppercase tracking-widest text-slate-400">Discount %</label>
                                    <input
                                        required
                                        type="number"
                                        value={formData.discount}
                                        onChange={e => setFormData({ ...formData, discount: e.target.value })}
                                        placeholder="25"
                                        className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-6 font-semibold text-sm focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-semibold uppercase tracking-widest text-slate-400">Limit (Opts)</label>
                                    <input
                                        type="number"
                                        value={formData.usageLimit}
                                        onChange={e => setFormData({ ...formData, usageLimit: e.target.value })}
                                        placeholder="100"
                                        className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-6 font-semibold text-sm focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[9px] font-semibold uppercase tracking-widest text-slate-400">Expiration Date</label>
                                <input
                                    required
                                    type="date"
                                    value={formData.expiryDate}
                                    onChange={e => setFormData({ ...formData, expiryDate: e.target.value })}
                                    className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-6 font-semibold text-sm focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                                />
                            </div>

                            <Button type="submit" disabled={loading} className="w-full h-16 rounded-2xl bg-slate-900 font-semibold uppercase tracking-widest text-[10px] mt-4">
                                {loading ? "Registering..." : "Commit to Registry"}
                            </Button>
                        </form>
                    </SheetContent>
                </Sheet>
            </header>

            {/* Coupons Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                    {coupons.map((coupon, i) => (
                        <motion.div
                            key={coupon._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-primary/5 transition-all group overflow-hidden"
                        >
                            <div className="p-8 space-y-6">
                                <div className="flex justify-between items-start">
                                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                                        <Tag size={20} />
                                    </div>
                                    <Badge variant="outline" className="h-8 rounded-full border-slate-200 text-slate-400 font-semibold uppercase tracking-widest text-[8px]">
                                        {coupon.isActive ? "Active Asset" : "Inactive"}
                                    </Badge>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-[9px] font-semibold text-primary uppercase tracking-[0.2em]">{coupon.discount}% Value Token</p>
                                    <h3 className="text-2xl font-semibold text-slate-900 tracking-tighter uppercase">{coupon.code}</h3>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} className="text-slate-300" />
                                        <span className="text-[10px] font-semibold text-slate-500 uppercase">{new Date(coupon.expiryDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock size={14} className="text-slate-300" />
                                        <span className="text-[10px] font-semibold text-slate-500 uppercase">{coupon.usageLimit ? `${coupon.usedCount}/${coupon.usageLimit}` : "Unlimited"}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="px-8 pb-8 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-1 text-[8px] font-semibold text-slate-300 uppercase tracking-widest">
                                    <ShieldCheck size={10} /> Secure Registry
                                </div>
                                <Button
                                    variant="ghost"
                                    onClick={() => deleteCoupon(coupon._id)}
                                    className="h-10 w-10 p-0 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                                >
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                        </motion.div>
                    ))}

                    {coupons.length === 0 && !loading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="col-span-full py-32 flex flex-col items-center justify-center text-center space-y-4"
                        >
                            <div className="w-20 h-20 bg-slate-100 rounded-[2.5rem] flex items-center justify-center text-slate-200">
                                <Ticket size={40} />
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-semibold text-slate-900 uppercase tracking-widest">No promotions deployed</p>
                                <p className="text-xs text-slate-400 font-medium font-serif">Initialize the marketing engine to see tokens here</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AdminCoupons;


