import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { 
  User as UserIcon, 
  GraduationCap, 
  Bookmark, 
  ShoppingBag, 
  Settings, 
  ShieldCheck, 
  Trash2,
  ExternalLink
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Product } from "../types";
import { motion } from "motion/react";

export const ProfilePage: React.FC = () => {
  const { currentUser, wishlist, toggleWishlist, products } = useApp();
  const [activeTab, setActiveTab] = useState<"listings" | "wishlist" | "settings">("listings");
  const [myListings, setMyListings] = useState<Product[]>([]);

  useEffect(() => {
    if (!currentUser) return;
    axios.get(`/api/users/${currentUser.id}/listings`)
      .then(res => setMyListings(res.data))
      .catch(err => console.error(err));
  }, [currentUser, products]);

  const savedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
    >
      
      {/* Profile Header Block */}
      {currentUser && (
        <div className="relative rounded-3xl overflow-hidden glass-panel p-8 sm:p-10 mb-10 border border-blue-500/10 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="absolute top-[-50%] left-[-20%] w-[50%] h-[200%] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>
          
          {/* Avatar with verify lock */}
          <div className="relative">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="h-24 w-24 rounded-full object-cover border-2 border-cyan-400/50 shadow-xl"
            />
            <div className="absolute -bottom-1 -right-1 bg-cyan-400 text-black p-1.5 rounded-full" title="Domain Vetted Student">
              <ShieldCheck className="h-5 w-5" />
            </div>
          </div>

          <div className="space-y-2 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{currentUser.name}</h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 rounded-full w-fit mx-auto sm:mx-0">
                <GraduationCap className="h-3.5 w-3.5" />
                Verified Student
              </span>
            </div>
            
            <p className="text-sm text-slate-400">
              Department of <strong>{currentUser.branch}</strong> at {currentUser.university}
            </p>
            
            <p className="text-xs text-slate-500 font-mono">
              Academic ID: <span className="text-slate-400">{currentUser.email}</span> • Joined {currentUser.joinedDate}
            </p>
          </div>
        </div>
      )}

      {/* Tabs list */}
      <div className="flex border-b border-white/5 mb-8 gap-6 shrink-0 overflow-x-auto">
        {(["listings", "wishlist", "settings"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 px-1 text-sm font-bold tracking-wider uppercase border-b-2 transition-all relative capitalize ${
              activeTab === tab 
                ? "border-cyan-400 text-cyan-300" 
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {activeTab === "listings" && (
        <div className="space-y-4">
          {myListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myListings.map((p) => (
                <div key={p.id} className="glass-panel rounded-2xl border border-white/5 overflow-hidden flex flex-col justify-between group">
                  <div className="relative h-40 bg-slate-950">
                    <img src={p.images[0]} alt={p.title} className="h-full w-full object-cover" />
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 text-[9px] font-bold font-mono uppercase bg-[#050816]/90 border border-cyan-500/30 text-cyan-300 rounded">
                      {p.category}
                    </span>
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="text-sm font-bold text-white truncate">{p.title}</h3>
                    <p className="text-xs text-slate-400 truncate">{p.location}</p>
                    <div className="flex justify-between items-center pt-2 border-t border-white/5 mt-3">
                      <span className="text-sm font-bold text-cyan-300 font-mono">${p.price}</span>
                      <Link to={`/marketplace/${p.id}`} className="text-[10px] text-slate-400 hover:text-white flex items-center gap-0.5 font-mono">
                        View item <ExternalLink className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-panel text-center py-16 rounded-3xl border border-white/5">
              <ShoppingBag className="h-10 w-10 text-slate-700 mx-auto mb-3" />
              <p className="text-sm text-slate-400">You haven't listed any items for trade yet.</p>
              <Link to="/sell" className="inline-block mt-4 text-xs font-bold text-cyan-300 uppercase hover:underline">
                Post an item now &rarr;
              </Link>
            </div>
          )}
        </div>
      )}

      {activeTab === "wishlist" && (
        <div className="space-y-4">
          {savedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedProducts.map((p) => (
                <div key={p.id} className="glass-panel rounded-2xl border border-white/5 overflow-hidden flex flex-col justify-between group">
                  <div className="relative h-40 bg-slate-950">
                    <img src={p.images[0]} alt={p.title} className="h-full w-full object-cover" />
                    <button 
                      onClick={() => toggleWishlist(p.id)}
                      className="absolute top-2.5 right-2.5 p-1.5 bg-cyan-500 text-black rounded-lg hover:scale-105 transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="text-sm font-bold text-white truncate">{p.title}</h3>
                    <p className="text-xs text-slate-400 truncate">{p.location}</p>
                    <div className="flex justify-between items-center pt-2 border-t border-white/5 mt-3">
                      <span className="text-sm font-bold text-cyan-300 font-mono">${p.price}</span>
                      <Link to={`/marketplace/${p.id}`} className="text-[10px] text-slate-400 hover:text-white flex items-center gap-0.5 font-mono">
                        View item &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-panel text-center py-16 rounded-3xl border border-white/5">
              <Bookmark className="h-10 w-10 text-slate-700 mx-auto mb-3" />
              <p className="text-sm text-slate-400">Your wishlist is currently empty.</p>
              <Link to="/marketplace" className="inline-block mt-4 text-xs font-bold text-cyan-300 uppercase hover:underline">
                Explore listings &rarr;
              </Link>
            </div>
          )}
        </div>
      )}

      {activeTab === "settings" && (
        <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4 text-left max-w-2xl">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Student Account Settings</h3>
          
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-blue-500/5 border border-white/5 space-y-1">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block font-mono">Safety Zone Meetups</span>
              <p className="text-xs text-slate-400 leading-relaxed">By default, our geofence targets your active university. You will only receive matching peer listings and chat request flags from students located in this territory.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block font-mono">Notification Channels</span>
                <p className="text-xs text-slate-300">In-App Chat Alerts Only</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block font-mono">Security Radius</span>
                <p className="text-xs text-slate-300">5 Miles (Campus Radius)</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </motion.div>
  );
};
export default ProfilePage;
