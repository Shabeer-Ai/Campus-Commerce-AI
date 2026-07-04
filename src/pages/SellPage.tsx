import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { 
  PlusCircle, 
  Sparkles, 
  Upload, 
  MapPin, 
  Tag, 
  AlertCircle,
  HelpCircle,
  PiggyBank
} from "lucide-react";
import axios from "axios";
import { AIAnalysisResult } from "../types";
import { motion } from "motion/react";

export const SellPage: React.FC = () => {
  const navigate = useNavigate();
  const { triggerAddProduct } = useApp();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("buy");
  const [condition, setCondition] = useState("good");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState<string[]>([]);

  // AI analysis state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null);

  const handleAIAnalyze = async () => {
    if (!title) return alert("Please specify an item title first!");
    setIsAnalyzing(true);
    try {
      const res = await axios.post("/api/ai/analyze-product", {
        title,
        description,
        category,
        price: Number(price) || 0,
        condition
      });
      setAnalysisResult(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !location) {
      return alert("Please fill out all required fields!");
    }

    try {
      await triggerAddProduct({
        title,
        description,
        category: category as any,
        condition: condition as any,
        price: Number(price),
        subcategory: "General Campus Goods",
        location,
        images: images.length > 0 ? images : ["https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=60"],
        specifications: {}
      });
      alert("Product listed successfully!");
      navigate("/marketplace");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-4xl px-4 py-8 sm:px-6"
    >
      
      {/* Header */}
      <div className="space-y-2 mb-10 text-center sm:text-left">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">List Your Campus Wealth</h1>
        <p className="text-slate-400 text-sm">Post text-books, gadgets, bike leases, or donations for verified campus students.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form Column */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSubmit} className="glass-panel p-6 rounded-2xl border border-white/5 space-y-5">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Item Name / Title *</label>
              <input 
                type="text" 
                placeholder="e.g. iPad Pro M2, Organic Chemistry Wade..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/5 bg-[#02050f] text-sm text-slate-200 focus:outline-none focus:border-cyan-500/30 transition-all"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Description</label>
              <textarea 
                placeholder="Describe your item specs, condition details, academic use, and meetup preference..."
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/5 bg-[#02050f] text-sm text-slate-200 focus:outline-none focus:border-cyan-500/30 transition-all"
              />
            </div>

            {/* Grid for Price, Category & Condition */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Price ($) *</label>
                <input 
                  type="number" 
                  placeholder="0 for Donate/Free"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/5 bg-[#02050f] text-sm text-slate-200 focus:outline-none focus:border-cyan-500/30 transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Trading Mode</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/5 bg-[#02050f] text-sm text-slate-300 focus:outline-none focus:border-cyan-500/30 transition-all"
                >
                  <option value="buy">Sell (Direct Buy)</option>
                  <option value="rent">Rent Out</option>
                  <option value="exchange">Exchange/Trade</option>
                  <option value="donate">Donate/Free</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Item Condition</label>
                <select 
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/5 bg-[#02050f] text-sm text-slate-300 focus:outline-none focus:border-cyan-500/30 transition-all"
                >
                  <option value="new">Brand New</option>
                  <option value="like-new">Like New (Mint)</option>
                  <option value="good">Good (Light Use)</option>
                  <option value="fair">Fair (Decent)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Campus Meetup Location *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder="e.g. Stanford East Quad"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-white/5 bg-[#02050f] text-sm text-slate-200 focus:outline-none focus:border-cyan-500/30 transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Mock Image Upload */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Product Photos</label>
              <div className="border border-dashed border-white/10 hover:border-cyan-500/30 rounded-2xl p-6 text-center bg-[#02050f]/50 cursor-pointer transition-colors flex flex-col items-center justify-center space-y-2">
                <Upload className="h-8 w-8 text-slate-500" />
                <span className="text-xs font-semibold text-slate-300">Drag and drop images, or click to upload</span>
                <span className="text-[10px] text-slate-500">Supports PNG, JPG (Max 5MB)</span>
              </div>
            </div>

            <div className="flex gap-4 pt-2">
              <button
                type="button"
                onClick={handleAIAnalyze}
                disabled={isAnalyzing}
                className="flex-1 py-3 text-xs font-bold rounded-xl border border-cyan-500/20 bg-cyan-500/5 text-cyan-300 hover:bg-cyan-500/10 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                {isAnalyzing ? "Analyzing..." : "Analyze with Gemini"}
              </button>
              
              <button 
                type="submit"
                className="flex-1 py-3 text-xs font-bold text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl hover:opacity-90 transition-all cursor-pointer"
              >
                Submit Listing
              </button>
            </div>
          </form>
        </div>

        {/* AI Insight/Help Column */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
            <h3 className="text-sm font-bold tracking-wider uppercase text-slate-300 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-cyan-400 font-bold" />
              Gemini Optimization
            </h3>
            
            {analysisResult ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 text-left"
              >
                <div className="p-3 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                  <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block font-mono">Suggested Price Bracket</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <PiggyBank className="h-4 w-4 text-cyan-400" />
                    <span className="text-sm font-bold text-white font-mono">{analysisResult.fairPriceRange}</span>
                  </div>
                </div>

                <div className={`p-3 rounded-xl border text-xs leading-relaxed ${
                  analysisResult.isSpamOrScam ? "bg-red-500/5 border-red-500/20 text-red-300" : "bg-emerald-500/5 border-emerald-500/20 text-emerald-300"
                }`}>
                  <span className="text-[10px] font-bold uppercase tracking-wider block font-mono mb-1">Safety & Spam Index</span>
                  {analysisResult.spamAnalysis}
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block font-mono">Title & Spec Advices</span>
                  <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4 leading-relaxed">
                    {analysisResult.optimizationSuggestions.map((suggestion, i) => (
                      <li key={i}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ) : (
              <p className="text-xs text-slate-400 leading-relaxed">
                Provide a title and run the <strong>Gemini Analyzer</strong> to automatically predict fair pricing benchmarks, ensure listing compliance, and optimize your keywords to sell to classmates faster!
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default SellPage;
