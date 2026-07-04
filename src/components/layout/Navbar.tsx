import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { 
  ShoppingBag, 
  PlusCircle, 
  MessageSquare, 
  User as UserIcon, 
  ShieldCheck, 
  Menu, 
  X, 
  Sparkles,
  Bookmark
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const Navbar: React.FC = () => {
  const { currentUser, wishlist } = useApp();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Marketplace", path: "/marketplace", icon: ShoppingBag },
    { label: "Sell Item", path: "/sell", icon: PlusCircle },
    { label: "Messages", path: "/chat", icon: MessageSquare },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#050816]/75 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="h-5 w-5 text-white animate-pulse" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-white group-hover:text-blue-400 transition-colors duration-200">
                CampusCommerce<span className="text-cyan-400 font-extrabold font-mono ml-0.5">AI</span>
              </span>
              <div className="text-[10px] text-slate-400 font-mono leading-none tracking-wider uppercase">Verified Network</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? "bg-blue-500/10 text-cyan-400 border border-cyan-500/20 shadow-md shadow-cyan-500/5"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right Side: Wishlist, Profile/User Indicator, Admin */}
          <div className="hidden md:flex items-center gap-4">
            {/* Wishlist Link */}
            <Link 
              to="/profile" 
              className="relative p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
              title="Saved Wishlist"
            >
              <Bookmark className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-bold text-black font-mono">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* User details */}
            {currentUser && (
              <div className="flex items-center gap-3 border-l border-white/10 pl-4">
                <Link to="/profile" className="flex items-center gap-2.5 group">
                  <div className="relative">
                    <img 
                      src={currentUser.avatar} 
                      alt={currentUser.name} 
                      className="h-8 w-8 rounded-full object-cover border border-cyan-500/30 group-hover:border-cyan-400 transition-all"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 bg-cyan-400 rounded-full p-0.5" title="Verified Campus Identity">
                      <ShieldCheck className="h-2.5 w-2.5 text-[#050816]" />
                    </div>
                  </div>
                  <div className="text-left hidden lg:block">
                    <div className="text-xs font-semibold text-white leading-none group-hover:text-cyan-300 transition-colors">
                      {currentUser.name}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 leading-none">
                      {currentUser.university.split(" ")[0]} CS
                    </div>
                  </div>
                </Link>

                {/* Admin Quick Entry */}
                <Link
                  to="/admin"
                  className="px-2.5 py-1 text-[10px] font-bold tracking-wider text-purple-300 border border-purple-500/30 bg-purple-500/10 rounded uppercase hover:bg-purple-500/25 transition-all"
                >
                  Admin
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger icon */}
          <div className="flex md:hidden items-center gap-3">
            {wishlist.length > 0 && (
              <Link to="/profile" className="p-2 text-slate-300 relative">
                <Bookmark className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-cyan-500"></span>
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-white/5 bg-[#050816]/95 backdrop-blur-2xl overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                      isActive(item.path)
                        ? "bg-blue-500/20 text-cyan-400"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}

              {currentUser && (
                <div className="pt-4 border-t border-white/5 flex items-center justify-between px-2">
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3"
                  >
                    <img 
                      src={currentUser.avatar} 
                      alt={currentUser.name} 
                      className="h-10 w-10 rounded-full object-cover border border-cyan-400"
                    />
                    <div>
                      <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                        {currentUser.name}
                        <ShieldCheck className="h-4 w-4 text-cyan-400" />
                      </div>
                      <div className="text-xs text-slate-400">{currentUser.university}</div>
                    </div>
                  </Link>
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-1.5 text-xs font-bold text-purple-300 border border-purple-500/30 bg-purple-500/10 rounded uppercase"
                  >
                    Admin
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
export default Navbar;
