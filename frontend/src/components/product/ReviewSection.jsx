import React from "react";
import { Star, MessageCircle, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const ReviewSection = ({ 
  reviews, myReview, rating, setRating, 
  title, setTitle, comment, setComment, 
  handleSubmitReview, handleDeleteReview 
}) => {
  return (
    <section className="mt-32 pt-24 border-t border-slate-100">
      <div className="flex flex-col lg:flex-row gap-20">
        <div className="lg:w-1/3 space-y-8">
          <div className="space-y-2">
            <h2 className="text-4xl font-semibold tracking-tighter">Customer Reviews</h2>
            <div className="flex items-center gap-4 text-5xl font-semibold text-slate-900">
              4.0 <span className="text-2xl text-slate-400">/ 5.0</span>
            </div>
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => <Star key={i} fill={i < 4 ? "currentColor" : "none"} />)}
            </div>
          </div>

          <div className="bg-slate-50 rounded-3xl p-8 space-y-6">
            <h3 className="text-lg font-semibold tracking-tighter flex items-center gap-2">
              <MessageCircle className="text-primary" />
              {myReview ? "Edit your experience" : "Share your thoughts"}
            </h3>
            <div className="space-y-4">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((r) => (
                  <button key={r} onClick={() => setRating(r)} className={`p-1 transition-colors ${rating >= r ? "text-yellow-500" : "text-slate-300"}`}>
                    <Star size={24} fill={rating >= r ? "currentColor" : "none"} />
                  </button>
                ))}
              </div>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Headline" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all" />
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={4} placeholder="Tell us what you liked..." className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all" />
              <div className="flex gap-2 pt-2">
                <Button onClick={handleSubmitReview} className="flex-1 rounded-xl font-semibold shadow-lg shadow-primary/10">{myReview ? "Update Review" : "Submit Review"}</Button>
                {myReview && <Button variant="ghost" onClick={handleDeleteReview} className="text-red-500 hover:bg-red-50 rounded-xl p-3"><Trash2 size={20} /></Button>}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-2/3 space-y-8">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Showing {reviews.length} reviews</h4>
            <Button variant="link" className="text-xs font-semibold uppercase tracking-widest p-0">Sort By Latest</Button>
          </div>
          <div className="space-y-6">
            {reviews.map((r, i) => (
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} key={r._id} className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-semibold text-slate-400">{r.user?.name?.[0]}</div>
                    <div><p className="font-semibold text-slate-900 tracking-tight">{r.user?.name}</p><p className="text-[10px] text-slate-400 font-semibold uppercase">Verified Buyer</p></div>
                  </div>
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < r.rating ? "currentColor" : "none"} />)}
                  </div>
                </div>
                <div className="space-y-2">
                  <h5 className="text-lg font-semibold tracking-tight text-slate-900">{r.title}</h5>
                  <p className="text-slate-500 font-medium leading-relaxed">{r.comment}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;


