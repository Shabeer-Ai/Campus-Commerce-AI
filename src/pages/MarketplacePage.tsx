import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { 
  ShoppingBag, 
  Search, 
  SlidersHorizontal, 
  MapPin, 
  Heart, 
  Eye, 
  MessageSquare,
  Sparkles,
  RefreshCcw,
  Tag
} from "lucide-react";
import { Link } from "react-router-dom";

export const MarketplacePage: React.FC = () => {
  const { products, wishlist, toggleWishlist } = useApp();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [conditionFilter, setConditionFilter] = useState("all");

  const filtered = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
    const matchesCondition = conditionFilter === "all" || p.condition === conditionFilter;
    return matchesSearch && matchesCategory && matchesCondition;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden glass-panel p-8 sm:p-12 mb-10 border border-blue-500/10">
        <div className="absolute top-[-30%] right-[-10%] w-[40%] h-[150%] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="relative max-w-2xl space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-full">
            Marketplace Module
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Verified Student Listings
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Rent, buy, trade, or accept donations directly from peers on campus. Filter by condition, rate, or school.
          </p>
        </div>
      </div>

      {/* Control Panel: Search & Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="glass-panel p-6 rounded-2xl border border-white/5 h-fit space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h3 className="text-sm font-bold tracking-wider uppercase text-slate-300 flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-cyan-400" />
              Filter Catalog
            </h3>
            <button 
              onClick={() => {
                setSearch("");
                setCategoryFilter("all");
                setConditionFilter("all");
              }}
              className="text-[10px] font-mono text-slate-500 hover:text-cyan-400 flex items-center gap-1 uppercase"
            >
              <RefreshCcw className="h-3 w-3" /> Reset
            </button>
          </div>

          {/* Search */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Keywords</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-white/5 bg-[#02050f] text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/30 transition-all"
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Trading Type</label>
            <div className="space-y-1.5">
              {["all", "buy", "rent", "exchange", "donate"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium capitalize border transition-all ${
                    categoryFilter === cat 
                      ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/30 font-bold" 
                      : "bg-transparent text-slate-400 border-transparent hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {cat === "all" ? "All Listings" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Condition */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Condition</label>
            <div className="space-y-1.5">
              {["all", "new", "like-new", "good", "fair"].map((cond) => (
                <button
                  key={cond}
                  onClick={() => setConditionFilter(cond)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium capitalize border transition-all ${
                    conditionFilter === cond 
                      ? "bg-purple-500/10 text-purple-300 border-purple-500/30 font-bold" 
                      : "bg-transparent text-slate-400 border-transparent hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {cond === "all" ? "Any Condition" : cond.replace("-", " ")}
                </button>
              ))}
            </div>
          </div>

          {/* Safe Meetup Note */}
          <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10 text-[11px] text-slate-400 leading-relaxed space-y-1.5">
            <span className="font-bold text-cyan-300 uppercase block font-mono">CAMPUS SEGREGATION</span>
            <p>Our geo-fencing strictly displays listings based in matching university territories to facilitate secure peer delivery.</p>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => {
                const isSaved = wishlist.includes(product.id);
                return (
                  <div 
                    key={product.id}
                    className="glass-panel rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/20 shadow-lg hover:shadow-cyan-500/5 transition-all duration-300 flex flex-col h-full group"
                  >
                    {/* Image Area */}
                    <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
                      <img 
                        src={product.images[0]} 
                        alt={product.title} 
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 left-2.5 flex gap-1.5">
                        <span className="px-2 py-0.5 text-[9px] font-bold font-mono uppercase tracking-wider rounded-md bg-[#050816]/80 text-cyan-300 border border-cyan-500/25">
                          {product.category}
                        </span>
                        <span className="px-2 py-0.5 text-[9px] font-bold font-mono uppercase tracking-wider rounded-md bg-[#050816]/80 text-purple-300 border border-purple-500/25">
                          {product.condition}
                        </span>
                      </div>
                      <button 
                        onClick={() => toggleWishlist(product.id)}
                        className={`absolute top-2.5 right-2.5 p-1.5 rounded-lg transition-all ${
                          isSaved 
                            ? "bg-cyan-500 text-black shadow-md shadow-cyan-500/20" 
                            : "bg-black/60 text-slate-300 hover:text-white"
                        }`}
                      >
                        <Heart className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Meta info */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono">
                          <MapPin className="h-3 w-3 text-cyan-400" />
                          <span className="truncate">{product.location}</span>
                        </div>
                        <Link to={`/marketplace/${product.id}`}>
                          <h4 className="text-sm font-bold text-white hover:text-cyan-300 transition-colors line-clamp-1">
                            {product.title}
                          </h4>
                        </Link>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      {/* Pricing Footer */}
                      <div className="mt-4 pt-3.5 border-t border-white/5 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] text-slate-500 block font-mono leading-none">RATE</span>
                          <span className="text-sm font-mono font-bold text-cyan-300">
                            {product.price > 0 ? `$${product.price}` : "Free / Exchange"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 font-mono text-[10px]">
                          <span className="flex items-center gap-0.5"><Eye className="h-3.5 w-3.5" /> {product.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="glass-panel rounded-3xl py-16 px-4 text-center border border-white/5">
              <ShoppingBag className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white">No products found</h3>
              <p className="text-sm text-slate-400 max-w-sm mx-auto mt-2">
                We couldn't match any verified listings for your filter selections. Try adjusting your query or resetting filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default MarketplacePage;
