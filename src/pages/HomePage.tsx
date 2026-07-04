import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { 
  Sparkles, 
  Search, 
  ShieldCheck, 
  GraduationCap, 
  Handshake, 
  Heart, 
  Clock, 
  MapPin, 
  BookOpen, 
  CheckCircle,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  BrainCircuit,
  MessageCircle,
  PiggyBank
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Product } from "../types";

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    products, 
    wishlist, 
    toggleWishlist, 
    performAISearch, 
    aiSearchResult, 
    isSearchingAI,
    setAiSearchResult
  } = useApp();

  const [naturalLanguageQuery, setNaturalLanguageQuery] = useState("");
  const [showAIResults, setShowAIResults] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Statistics
  const stats = [
    { value: "100k+", label: "Verified Students", suffix: "from Ivy & State Universities" },
    { value: "15,800+", label: "Successful Exchanges", suffix: "peer-to-peer campus trades" },
    { value: "24+", label: "Integrated Campuses", suffix: "active local networks" },
    { value: "99.8%", label: "Trust Rate", suffix: "zero fraud, instant peer vetting" }
  ];

  // Categories
  const categories = [
    { 
      id: "buy", 
      title: "Buy & Sell", 
      desc: "Get textbook deals, monitors, and dorm essentials from peers.", 
      color: "from-cyan-500/20 to-blue-600/20 shadow-cyan-500/5 hover:shadow-cyan-500/10 hover:border-cyan-500/30",
      textColor: "text-cyan-400"
    },
    { 
      id: "rent", 
      title: "Rent Equipment", 
      desc: "Rent cameras, bikes, or gaming consoles by the week.", 
      color: "from-blue-500/20 to-indigo-600/20 shadow-blue-500/5 hover:shadow-blue-500/10 hover:border-blue-500/30",
      textColor: "text-blue-400"
    },
    { 
      id: "exchange", 
      title: "Barter / Exchange", 
      desc: "Swap gadgets or exchange tutoring hours with verified peers.", 
      color: "from-purple-500/20 to-pink-600/20 shadow-purple-500/5 hover:shadow-purple-500/10 hover:border-purple-500/30",
      textColor: "text-purple-400"
    },
    { 
      id: "donate", 
      title: "Student Donations", 
      desc: "Pass down items to junior students or find free local supplies.", 
      color: "from-emerald-500/20 to-teal-600/20 shadow-emerald-500/5 hover:shadow-emerald-500/10 hover:border-emerald-500/30",
      textColor: "text-emerald-400"
    }
  ];

  // Why choose us items
  const advantages = [
    {
      icon: ShieldCheck,
      title: "Double Peer Verification",
      desc: "Only users with active, matching university email domains (.edu) can access listings, keeping out commercial sellers and spam.",
      color: "border-cyan-500/20 shadow-cyan-500/5"
    },
    {
      icon: BrainCircuit,
      title: "Gemini AI Search Integration",
      desc: "Ask naturally. No more keyword guessing. Tell our AI 'I need a study desk that fits a dorm corner under $50' and get perfect matches instantly.",
      color: "border-blue-500/20 shadow-blue-500/5"
    },
    {
      icon: PiggyBank,
      title: "AI Fair Price Engine",
      desc: "Our real-time price analyzer checks student budgets and historic deals to give both buyers and sellers a transparent fair valuation range.",
      color: "border-purple-500/20 shadow-purple-500/5"
    }
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Marcus Aurelius",
      university: "UC Berkeley",
      branch: "Business Administration",
      quote: "Campus Commerce AI is a game changer. I traded my old road bike for an ultrawide monitor in less than 24 hours. The meetup was safely located at the campus library, and meeting another Haas student made it 100% stress-free.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60"
    },
    {
      name: "Sarah Chen",
      university: "MIT",
      branch: "Mechanical Engineering",
      quote: "Renting a dSLR for my final project from a student across the quad was so much cheaper than commercial shops. Verification is seamless and the AI search really understands student lingo.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60"
    }
  ];

  // FAQs
  const faqs = [
    {
      q: "How does the verification process work?",
      a: "When register, students must supply their official .edu academic email. We send a secure validation token to their inbox, double-checking match against supported university domains. Students can also add social verify to build additional reputation circles."
    },
    {
      q: "What is an Exchange or Donation listing?",
      a: "Exchange listings allow students to trade an item directly for another item (e.g. trading an Xbox console for an equivalent GPU) or for tuition services. Donations are entirely free listings targeting first-generation or low-income students in need of academic essentials."
    },
    {
      q: "Where do transactions and meetups happen?",
      a: "We recommend conducting peer trades exclusively at designated, well-lit 'Safe Meetup Zones' on campus—such as the university library entrance, student union hubs, or near campus safety kiosks."
    },
    {
      q: "How does the AI search find products?",
      a: "Our system employs server-side Gemini 3.5 AI. It parses the deep semantics of your request (understanding budgets, location context, academic requirements, and item states) and matches it perfectly to relevant posts, offering custom suggestions."
    }
  ];

  // Handle AI semantic search
  const handleAISearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!naturalLanguageQuery.trim()) return;
    setShowAIResults(true);
    await performAISearch(naturalLanguageQuery);
  };

  // Convert matchedIds from AI search result to list of products
  const matchedProducts: Product[] = aiSearchResult
    ? products.filter(p => aiSearchResult.matchedIds.includes(p.id))
    : [];

  return (
    <div className="relative min-h-screen overflow-hidden">
      
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] bg-purple-500/5 blur-[150px] rounded-full pointer-events-none"></div>

      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-8">
          
          {/* Animated Tech Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-md shadow-cyan-500/5"
          >
            <Sparkles className="h-4 w-4 animate-spin" />
            <span>Next-Gen Collegiate Commerce Platform</span>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none text-white max-w-5xl mx-auto"
          >
            Campus Commerce, Reimagined with <span className="text-gradient-cyan-purple font-black">Intelligence</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
          >
            An elite student-exclusive network built for buying, renting, exchanging, and donating products. Fast, secure peer trades backed by Gemini AI semantic matches.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link 
              to="/marketplace" 
              className="glow-btn flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-sm font-semibold text-white hover:opacity-90 shadow-lg shadow-cyan-500/15"
            >
              Browse Marketplace
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link 
              to="/sell" 
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-sm font-semibold text-slate-300 hover:text-white transition-all"
            >
              Create Listing
            </Link>
          </motion.div>

        </div>
      </section>

      {/* 2. DYNAMIC AI SEARCH BAR */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-panel p-6 sm:p-8 rounded-3xl border border-blue-500/20 shadow-xl shadow-blue-900/10"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold tracking-wider text-cyan-300 uppercase font-mono flex items-center gap-2">
              <BrainCircuit className="h-4 w-4" />
              Gemini Semantic Search
            </h3>
            <span className="text-[10px] bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-mono uppercase">Instant AI Matches</span>
          </div>

          <form onSubmit={handleAISearch} className="relative flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input 
                type="text"
                placeholder="Ask Campus AI: 'I need an M1/M2 iPad with Apple Pencil for design classes around $800'..."
                value={naturalLanguageQuery}
                onChange={(e) => setNaturalLanguageQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-white/10 bg-[#02050f] text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 text-sm transition-all"
              />
            </div>
            <button 
              type="submit"
              disabled={isSearchingAI}
              className="glow-btn px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-sm font-bold text-white hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {isSearchingAI ? (
                <>
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Thinking...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Search with AI
                </>
              )}
            </button>
          </form>

          {/* AI Search Result Panel */}
          <AnimatePresence>
            {showAIResults && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 border-t border-white/10 pt-6 space-y-4 overflow-hidden"
              >
                {isSearchingAI ? (
                  <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-cyan-400">
                      <BrainCircuit className="h-6 w-6 animate-pulse" />
                    </div>
                    <p className="text-sm font-mono text-slate-400 animate-pulse">Gemini is searching our verified database for matches...</p>
                  </div>
                ) : aiSearchResult ? (
                  <div className="space-y-4">
                    
                    {/* Reasoning statement */}
                    <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                      <div className="flex items-start gap-2.5">
                        <Sparkles className="h-4 w-4 text-cyan-400 mt-1 shrink-0" />
                        <div>
                          <span className="text-xs font-semibold text-cyan-300 font-mono block">AI RECOMMENDATION REASONING</span>
                          <p className="text-sm text-slate-300 mt-1 leading-relaxed">{aiSearchResult.reasoning}</p>
                        </div>
                      </div>
                    </div>

                    {/* Product listings */}
                    {matchedProducts.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {matchedProducts.map((p) => (
                          <div key={p.id} className="p-3.5 rounded-xl border border-white/5 bg-[#030614] hover:border-blue-500/30 transition-all flex gap-3.5 group">
                            <img 
                              src={p.images[0]} 
                              alt={p.title} 
                              className="h-16 w-16 rounded-lg object-cover shrink-0 border border-white/5"
                            />
                            <div className="flex-1 min-w-0">
                              <span className="inline-block text-[9px] font-mono font-bold tracking-wider uppercase text-cyan-400 leading-none">
                                {p.category} • {p.condition}
                              </span>
                              <h4 className="text-sm font-semibold text-white truncate group-hover:text-blue-400 transition-colors mt-1">{p.title}</h4>
                              <p className="text-xs text-slate-400 truncate mt-0.5">{p.location}</p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-sm font-mono font-bold text-cyan-300">
                                  {p.price > 0 ? `$${p.price}` : "Free / Trade"}
                                </span>
                                <Link 
                                  to={`/marketplace/${p.id}`}
                                  className="text-[10px] font-bold text-slate-400 hover:text-white flex items-center gap-0.5"
                                >
                                  View Item <ArrowRight className="h-3 w-3" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-sm text-slate-400">No strict matches in current catalog, but check out suggestions below!</p>
                      </div>
                    )}

                    {/* Suggestions keywords */}
                    {aiSearchResult.suggestions && aiSearchResult.suggestions.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 pt-2">
                        <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Try searching:</span>
                        {aiSearchResult.suggestions.map((s, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setNaturalLanguageQuery(s);
                              performAISearch(s);
                            }}
                            className="px-2.5 py-1 text-xs rounded bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5 transition-all"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="flex justify-end pt-2">
                      <button 
                        onClick={() => {
                          setShowAIResults(false);
                          setAiSearchResult(null);
                        }} 
                        className="text-xs text-slate-500 hover:text-slate-300 font-mono"
                      >
                        [ Dismiss Results ]
                      </button>
                    </div>
                  </div>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 3. ANIMATED STATISTICS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              key={i}
              className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col text-left group hover:border-blue-500/25 transition-all duration-300"
            >
              <span className="text-4xl sm:text-5xl font-black text-gradient-cyan-purple font-mono tracking-tight leading-none group-hover:scale-105 transition-transform duration-300">
                {stat.value}
              </span>
              <span className="text-sm font-semibold text-slate-200 mt-2.5 font-sans leading-snug">
                {stat.label}
              </span>
              <span className="text-xs text-slate-500 mt-1 leading-snug">
                {stat.suffix}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. CATEGORIES */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-sm font-semibold tracking-wider text-cyan-400 uppercase font-mono">Structured Actions</h2>
            <h3 className="text-3xl font-extrabold text-white tracking-tight mt-1">Four Ways to Exchange Campus Wealth</h3>
          </div>
          <Link to="/marketplace" className="text-sm font-bold text-cyan-400 hover:text-white flex items-center gap-1 transition-all">
            Open full marketplace <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div 
              key={cat.id}
              onClick={() => navigate(`/marketplace?category=${cat.id}`)}
              className={`glass-panel p-6 rounded-2xl border border-white/5 bg-gradient-to-b ${cat.color} cursor-pointer flex flex-col justify-between h-48 group transition-all duration-300`}
            >
              <div>
                <span className={`text-xs font-bold font-mono uppercase tracking-wider ${cat.textColor}`}>
                  {cat.title.split(" ")[0]}
                </span>
                <h4 className="text-lg font-bold text-white mt-1 group-hover:text-cyan-300 transition-colors">{cat.title}</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{cat.desc}</p>
              </div>
              <div className="flex justify-end">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:bg-cyan-500 group-hover:border-cyan-500 group-hover:text-black transition-all">
                  <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-black" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FEATURED PRODUCTS & LATEST LISTINGS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-sm font-semibold tracking-wider text-purple-400 uppercase font-mono flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4" />
              Featured Listings
            </h2>
            <h3 className="text-3xl font-extrabold text-white tracking-tight mt-1">Trending Near Your Campuses</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-xs font-mono text-slate-400">Live listings updated 2m ago</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, 3).map((product) => {
            const isSaved = wishlist.includes(product.id);
            return (
              <div 
                key={product.id}
                className="glass-panel rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/20 shadow-lg hover:shadow-cyan-500/5 transition-all duration-300 flex flex-col h-full group"
              >
                {/* Product Image */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900 shrink-0">
                  <img 
                    src={product.images[0]} 
                    alt={product.title} 
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 flex gap-1.5 items-center">
                    <span className="px-2.5 py-1 text-[10px] font-bold font-mono uppercase tracking-wider rounded-md bg-[#050816]/80 text-cyan-300 border border-cyan-500/30">
                      {product.category}
                    </span>
                    <span className="px-2.5 py-1 text-[10px] font-bold font-mono uppercase tracking-wider rounded-md bg-[#050816]/80 text-purple-300 border border-purple-500/30">
                      {product.condition}
                    </span>
                  </div>

                  {/* Bookmark Button */}
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-xl transition-all ${
                      isSaved 
                        ? "bg-cyan-500 text-black shadow-md shadow-cyan-500/20" 
                        : "bg-black/60 text-slate-300 hover:text-white hover:scale-105"
                    }`}
                  >
                    <Heart className={`h-4.5 w-4.5 ${isSaved ? "fill-current" : ""}`} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Location & Title */}
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                      <MapPin className="h-3 w-3 text-cyan-400 shrink-0" />
                      <span className="truncate">{product.location}</span>
                    </div>

                    <Link to={`/marketplace/${product.id}`}>
                      <h4 className="text-base font-bold text-white leading-snug hover:text-cyan-300 transition-colors line-clamp-1">
                        {product.title}
                      </h4>
                    </Link>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Pricing and Action */}
                  <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 block font-mono">EXCHANGE RATE</span>
                      <span className="text-lg font-mono font-bold text-cyan-300">
                        {product.price > 0 ? `$${product.price}` : "Free / Trade"}
                      </span>
                    </div>
                    
                    <Link 
                      to={`/marketplace/${product.id}`}
                      className="px-4 py-2 text-xs font-bold text-white bg-blue-500/10 border border-blue-500/20 rounded-lg hover:bg-blue-500/25 hover:border-blue-500/40 transition-all flex items-center gap-1"
                    >
                      View Details
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. WHY CHOOSE US (BENTO GRID) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-sm font-semibold tracking-wider text-cyan-400 uppercase font-mono">Built For Campuses</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">The Safe Alternative to Craigslist</h3>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed">
            Standard marketplaces are overrun with spam, commercial bots, and anonymous accounts. We engineered Campus Commerce AI to solve these trust deficits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {advantages.map((adv, idx) => {
            const Icon = adv.icon;
            return (
              <div 
                key={idx}
                className={`glass-panel p-8 rounded-2xl border ${adv.color} hover:border-blue-500/30 transition-all duration-300 flex flex-col gap-4 text-left`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-cyan-400 border border-blue-500/20">
                  <Icon className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-bold text-white mt-2">{adv.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{adv.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-purple-500/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="text-center space-y-3 mb-12 relative">
          <h2 className="text-sm font-semibold tracking-wider text-purple-400 uppercase font-mono">Student Voices</h2>
          <h3 className="text-3xl font-extrabold text-white tracking-tight">Vouched For by Active Peers</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          {testimonials.map((t, idx) => (
            <div 
              key={idx}
              className="glass-panel p-8 rounded-2xl border border-white/5 flex flex-col justify-between gap-6 hover:border-purple-500/20 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Sparkles key={i} className="h-4 w-4 text-cyan-400 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                <img 
                  src={t.avatar} 
                  alt={t.name} 
                  className="h-11 w-11 rounded-full object-cover border border-white/10"
                />
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1">
                    {t.name}
                    <ShieldCheck className="h-4 w-4 text-cyan-400" />
                  </h4>
                  <p className="text-xs text-slate-400">{t.branch} • {t.university}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FAQ ACCORDION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-sm font-semibold tracking-wider text-cyan-400 uppercase font-mono">Common Concerns</h2>
          <h3 className="text-3xl font-extrabold text-white tracking-tight">Frequently Asked Questions</h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div 
                key={idx}
                className="glass-panel rounded-xl border border-white/5 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-all"
                >
                  <span className="text-sm font-bold text-slate-200 hover:text-white flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-cyan-400 shrink-0" />
                    {faq.q}
                  </span>
                  <div className={`h-5 w-5 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180 text-cyan-400 border-cyan-500/20 bg-cyan-500/10" : ""}`}>
                    &darr;
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-white/5"
                    >
                      <div className="px-6 py-5 text-xs text-slate-400 leading-relaxed bg-[#020510]/50">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
export default HomePage;
