import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Shield, GraduationCap, Github } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="relative mt-24 border-t border-white/5 bg-[#02050f] pt-16 pb-8 overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 shadow-md">
                <Sparkles className="h-4.5 w-4.5 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight text-white">
                CampusCommerce<span className="text-cyan-400 font-extrabold font-mono ml-0.5">AI</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
              The next-generation AI-driven marketplace engineered exclusively for college students. Secure trade, verified peers, intelligent match.
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <div className="flex items-center gap-1.5 text-xs bg-white/5 border border-white/10 px-2.5 py-1 rounded-full font-mono">
                <GraduationCap className="h-3.5 w-3.5 text-cyan-400" />
                <span>Edu-Verified</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs bg-white/5 border border-white/10 px-2.5 py-1 rounded-full font-mono">
                <Shield className="h-3.5 w-3.5 text-blue-400" />
                <span>SSL Encrypted</span>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-slate-200 uppercase font-mono">Marketplace</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li><Link to="/marketplace?category=buy" className="hover:text-cyan-400 transition-colors">Buy Gear</Link></li>
              <li><Link to="/marketplace?category=rent" className="hover:text-cyan-400 transition-colors">Rent Equipment</Link></li>
              <li><Link to="/marketplace?category=exchange" className="hover:text-cyan-400 transition-colors">Skill & Item Exchange</Link></li>
              <li><Link to="/marketplace?category=donate" className="hover:text-cyan-400 transition-colors">Donations Portal</Link></li>
            </ul>
          </div>

          {/* Verification & Trust Column */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-slate-200 uppercase font-mono">AI Ecosystem</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li><span className="text-slate-500 block">Semantic Search</span></li>
              <li><span className="text-slate-500 block">Price Predictions</span></li>
              <li><span className="text-slate-500 block">Fraud Shield Engine</span></li>
              <li><span className="text-slate-500 block">Smart Matches</span></li>
            </ul>
          </div>

          {/* Safety & Compliance Column */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-slate-200 uppercase font-mono">Campus Safety</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li><span className="hover:text-cyan-400 cursor-pointer transition-colors">Verification Rules</span></li>
              <li><span className="hover:text-cyan-400 cursor-pointer transition-colors">Safe Meetup Zones</span></li>
              <li><span className="hover:text-cyan-400 cursor-pointer transition-colors">Community Guidelines</span></li>
              <li><span className="hover:text-cyan-400 cursor-pointer transition-colors">Terms of Service</span></li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Campus Commerce AI Inc. Powered by Gemini Pro. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-slate-500">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Security Standards</span>
            <div className="flex items-center gap-1 hover:text-white cursor-pointer">
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
