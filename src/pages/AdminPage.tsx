import React from "react";
import { useApp } from "../context/AppContext";
import { 
  ShieldAlert, 
  Users, 
  ShoppingBag, 
  AlertTriangle, 
  TrendingUp, 
  Database,
  CheckCircle,
  FileText
} from "lucide-react";

export const AdminPage: React.FC = () => {
  const { products } = useApp();

  const metrics = [
    { label: "Active Student Auth", value: "1,248", change: "+14.2% MoM", icon: Users, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
    { label: "Listed Products", value: products.length.toString(), change: "+5.1% this week", icon: ShoppingBag, color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
    { label: "Active Disputes / Reports", value: "2", change: "-50% resolved", icon: AlertTriangle, color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
    { label: "AI Safety Audits", value: "148", change: "99.8% safe index", icon: ShieldAlert, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" }
  ];

  const pendingReports = [
    { id: "r1", reporter: "Elena Rostova", offender: "u4", reason: "Listing pricing seems highly unrealistic", item: "Specialized Rockhopper Bike", status: "reviewing" },
    { id: "r2", reporter: "Sarah Chen", offender: "u2", reason: "Seller has not responded in 4 days", item: "iPad Pro 12.9 M2", status: "notified" }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      
      {/* Title */}
      <div className="space-y-2 text-center sm:text-left">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Admin & Moderator Dashboard</h1>
        <p className="text-slate-400 text-sm">Review student registrations, check AI safety flags, and resolve peer listings conflicts.</p>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className="glass-panel p-6 rounded-2xl border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{m.label}</span>
                <div className={`p-2 rounded-xl border ${m.color}`}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-3xl font-bold font-mono text-white leading-none">{m.value}</h3>
                <span className="text-[10px] text-slate-500 font-mono block">{m.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pending Reviews list */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Reports Panel */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-white/5 space-y-5">
          <h3 className="text-sm font-bold tracking-wider text-slate-300 uppercase font-mono flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-yellow-400" />
            Integrity Safety Reports
          </h3>

          <div className="space-y-3">
            {pendingReports.map((report) => (
              <div key={report.id} className="p-4 rounded-xl border border-white/5 bg-[#02050f]/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-yellow-400 uppercase tracking-wider bg-yellow-400/5 border border-yellow-400/15 px-2 py-0.5 rounded">
                    {report.status}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">Report Ref: {report.id}</span>
                </div>
                
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>{report.reporter}</strong> reported listing for <strong>{report.item}</strong>:
                  <span className="text-slate-400 italic block mt-1">"{report.reason}"</span>
                </p>

                <div className="flex justify-end gap-2 pt-2 border-t border-white/5">
                  <button className="px-3 py-1 text-[10px] font-mono font-bold text-slate-400 hover:text-white border border-white/10 hover:bg-white/5 rounded">
                    Dismiss
                  </button>
                  <button className="px-3 py-1 text-[10px] font-mono font-bold text-yellow-300 border border-yellow-500/20 bg-yellow-500/5 hover:bg-yellow-500/10 rounded">
                    Warn Seller
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Database Stats Column */}
        <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
          <h3 className="text-sm font-bold tracking-wider text-slate-300 uppercase font-mono flex items-center gap-1.5">
            <Database className="h-4.5 w-4.5 text-cyan-400" />
            Core Databases
          </h3>

          <div className="space-y-3">
            {[
              { name: "Users Database", count: "1,248 rows" },
              { name: "Products Database", count: products.length + " rows" },
              { name: "Messages Table", count: "4,215 rows" },
              { name: "Dispute Reports", count: "8 rows" }
            ].map((table, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-[#02050f]/30">
                <span className="text-xs font-semibold text-slate-300">{table.name}</span>
                <span className="text-[11px] text-slate-500 font-mono">{table.count}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
export default AdminPage;
