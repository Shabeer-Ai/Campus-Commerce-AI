import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { 
  MapPin, 
  Heart, 
  MessageSquare, 
  ShieldCheck, 
  ChevronLeft, 
  Calendar, 
  Eye, 
  Bookmark,
  Sparkles,
  AlertOctagon,
  ArrowRight
} from "lucide-react";
import axios from "axios";
import { Product } from "../types";
import { motion } from "motion/react";

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser, wishlist, toggleWishlist, products } = useApp();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios.get(`/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        if (res.data?.images?.length > 0) {
          setActiveImage(res.data.images[0]);
        }
      })
      .catch(err => {
        console.error("Failed to fetch product details:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleStartChat = async () => {
    if (!currentUser || !product) {
      return alert("Authentication required to chat with peers!");
    }

    try {
      // Post to create or fetch existing chat thread
      const res = await axios.post("/api/chats", {
        productId: product.id,
        buyerId: currentUser.id,
        sellerId: product.sellerId
      });
      // Redirect to messages
      navigate("/chat");
    } catch (err) {
      console.error("Failed to start peer chat thread:", err);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="h-8 w-8 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-sm text-slate-400 font-mono">Retrieving encrypted campus assets...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-24 text-center space-y-4">
        <h3 className="text-lg font-bold text-white">Asset not found</h3>
        <p className="text-sm text-slate-400">The requested listing may have expired or been removed by moderation.</p>
        <Link to="/marketplace" className="text-xs text-cyan-300 uppercase font-bold">&larr; Back to marketplace</Link>
      </div>
    );
  }

  const isSaved = wishlist.includes(product.id);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 2);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8"
    >
      
      {/* Back button */}
      <Link 
        to="/marketplace" 
        className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-white uppercase tracking-wider font-mono"
      >
        <ChevronLeft className="h-4 w-4" />
        Return to Catalog
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Gallery Panel */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative rounded-2xl overflow-hidden glass-panel border border-white/5 bg-slate-950 aspect-video flex items-center justify-center">
            <img 
              src={activeImage} 
              alt={product.title} 
              className="max-h-full max-w-full object-contain"
            />
            
            {/* Overlay indicators */}
            <div className="absolute bottom-4 left-4 flex gap-1.5">
              <span className="px-2.5 py-1 text-[10px] font-bold font-mono uppercase bg-[#050816]/90 border border-cyan-500/30 text-cyan-300 rounded">
                {product.category}
              </span>
              <span className="px-2.5 py-1 text-[10px] font-bold font-mono uppercase bg-[#050816]/90 border border-purple-500/30 text-purple-300 rounded">
                {product.condition}
              </span>
            </div>
          </div>

          {/* Thumbnails list if multiple images exist */}
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`h-16 w-24 rounded-xl overflow-hidden border transition-all ${
                    activeImage === img ? "border-cyan-400" : "border-white/5 hover:border-white/20"
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Purchase & Action Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-blue-500/10 space-y-6">
            
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                <MapPin className="h-4 w-4 text-cyan-400" />
                <span>{product.location}</span>
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-white leading-snug">{product.title}</h1>
              
              <div className="flex items-center gap-6 text-slate-500 text-xs font-mono pt-1">
                <span className="flex items-center gap-1"><Eye className="h-4 w-4" /> {product.views} views</span>
                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {new Date(product.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Price section */}
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 block font-mono">EXCHANGE BUDGET</span>
                <span className="text-2xl font-mono font-bold text-cyan-300">
                  {product.price > 0 ? `$${product.price}` : "Free / Trade"}
                </span>
              </div>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 rounded-xl border transition-all ${
                  isSaved 
                    ? "bg-cyan-500 border-cyan-500 text-black shadow-lg shadow-cyan-500/15" 
                    : "border-white/10 text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <Heart className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
              </button>
            </div>

            {/* Peer Chat button */}
            <div className="space-y-3">
              <button 
                onClick={handleStartChat}
                className="glow-btn w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 font-bold text-xs uppercase tracking-wider text-white flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10"
              >
                <MessageSquare className="h-4.5 w-4.5" />
                Chat with verified seller
              </button>
              <span className="text-[10px] text-slate-500 font-mono text-center block">
                SSL Secured Peer Session • Identity Screened
              </span>
            </div>

            {/* Seller profile brief info */}
            {product.seller && (
              <div className="pt-6 border-t border-white/5 flex items-center gap-3.5 text-left">
                <div className="relative">
                  <img 
                    src={product.seller.avatar} 
                    alt={product.seller.name} 
                    className="h-11 w-11 rounded-full object-cover border border-cyan-400"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 bg-cyan-400 rounded-full p-0.5">
                    <ShieldCheck className="h-3 w-3 text-black" />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1">
                    {product.seller.name}
                    <span className="text-[10px] font-mono text-cyan-400 font-normal">[Stanford CS]</span>
                  </h4>
                  <p className="text-xs text-slate-400 leading-none mt-1">{product.seller.university}</p>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* Description & Specs Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
        
        {/* Description */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 space-y-4 text-left">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono">Product overview</h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">{product.description}</p>
        </div>

        {/* Specifications Table */}
        <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 space-y-4 text-left">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono">Asset specifications</h3>
          
          <div className="space-y-2.5">
            {Object.keys(product.specifications).length > 0 ? (
              Object.entries(product.specifications).map(([key, val]) => (
                <div key={key} className="flex justify-between p-2.5 rounded-lg bg-white/5 border border-white/5 text-xs font-mono">
                  <span className="text-slate-500">{key}</span>
                  <span className="text-slate-300 font-bold">{val}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 italic">No direct structural specs logged.</p>
            )}
          </div>
        </div>

      </div>

      {/* Related listings */}
      {related.length > 0 && (
        <div className="space-y-6 pt-6">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider font-mono text-left flex items-center gap-1.5">
            <Sparkles className="h-4.5 w-4.5 text-cyan-400" />
            Matching exchanges
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {related.map(r => (
              <Link 
                to={`/marketplace/${r.id}`} 
                key={r.id}
                className="glass-panel p-4 rounded-xl border border-white/5 bg-[#030614] hover:border-cyan-500/20 transition-all flex gap-4 text-left"
              >
                <img src={r.images[0]} alt="" className="h-16 w-16 rounded-lg object-cover shrink-0" />
                <div className="min-w-0 flex-1 space-y-1">
                  <h4 className="text-sm font-bold text-white truncate">{r.title}</h4>
                  <p className="text-xs text-slate-400 font-mono">${r.price}</p>
                  <p className="text-[10px] text-slate-500 truncate">{r.location}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </motion.div>
  );
};
export default ProductDetailsPage;
