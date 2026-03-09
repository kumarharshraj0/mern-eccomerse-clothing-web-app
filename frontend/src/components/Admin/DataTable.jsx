import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, ExternalLink } from "lucide-react";

export default function DataTable({ data = [] }) {
  const navigate = useNavigate();
  return (
    <div className="overflow-x-auto h-full">
      <table className="w-full text-left border-separate border-spacing-y-3">
        <thead>
          <tr className="bg-slate-50/50 rounded-2xl overflow-hidden">
            <th className="py-4 px-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 first:rounded-l-2xl last:rounded-r-2xl">Asset Detail</th>
            <th className="py-4 px-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Class</th>
            <th className="py-4 px-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Status</th>
            <th className="py-4 px-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right first:rounded-l-2xl last:rounded-r-2xl">Executive</th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? data.map((item, i) => (
            <tr key={item._id || i} className="group hover:bg-slate-50 transition-colors">
              <td className="py-4 px-6 bg-white border-y border-l border-slate-100 first:rounded-l-2xl group-hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
                    <img src={item.images?.[0]?.url || item.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-black text-slate-900 truncate uppercase tracking-tight text-xs">{item.title || item.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">₹{item.price?.toLocaleString() || "N/A"}</p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6 bg-white border-y border-slate-100 group-hover:bg-slate-50 transition-colors">
                <Badge variant="outline" className="rounded-lg text-[9px] font-black uppercase tracking-widest border-slate-200 text-slate-500 truncate max-w-[100px]">
                  {item.category || "General"}
                </Badge>
              </td>
              <td className="py-4 px-6 bg-white border-y border-slate-100 group-hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${item.status === 'active' || !item.status ? 'bg-green-500' : 'bg-rose-500'}`} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">{item.status || "Live"}</span>
                </div>
              </td>
              <td className="py-4 px-6 bg-white border-y border-r border-slate-100 first:rounded-l-2xl last:rounded-r-2xl group-hover:bg-slate-50 transition-colors text-right">
                <Link
                  to="/admin/products"
                  className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-primary transition-all inline-block"
                >
                  <ExternalLink size={16} />
                </Link>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan={4} className="py-12 text-center text-slate-300 font-black uppercase tracking-[0.2em] text-[10px]">Registry is empty</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
