import React from 'react';
import { recentAudits } from '../../data/mockData';
import { CheckCircle2, AlertCircle, Info, RefreshCw, Sparkles, User } from 'lucide-react';

export default function HistoryTimeline() {
  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-rose-500" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-amber-500" />;
      case 'info':
      default:
        return <Info className="w-4 h-4 text-brand-500" />;
    }
  };

  const getBadgeColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20 text-emerald-700';
      case 'error':
        return 'bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/20 text-rose-700';
      case 'warning':
        return 'bg-amber-50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/20 text-amber-700';
      case 'info':
      default:
        return 'bg-brand-50 dark:bg-brand-500/10 border-brand-100 dark:border-brand-500/20 text-brand-600';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-figma-lg p-6 shadow-premium space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Audit Log</span>
          <h2 className="text-base font-bold font-heading text-slate-900 dark:text-white mt-1">Workspace Activity History</h2>
        </div>
        <button className="inline-flex items-center gap-1 text-xs text-brand-500 hover:text-brand-600 font-semibold cursor-pointer">
          <RefreshCw className="w-3 h-3" />
          Refresh Log
        </button>
      </div>

      {/* Timeline List */}
      <div className="relative border-l border-slate-100 dark:border-slate-800 ml-3 pl-6 space-y-8 py-2">
        {recentAudits.map((audit) => (
          <div key={audit.id} className="relative group">
            {/* Timeline Dot container */}
            <span className={`absolute -left-[35px] top-1.5 p-1.5 rounded-full border bg-white dark:bg-slate-900 shadow-sm transition-transform duration-300 group-hover:scale-110 ${getBadgeColor(audit.type)}`}>
              {getIcon(audit.type)}
            </span>

            {/* Content box */}
            <div className="space-y-1">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-500 transition-colors">
                  {audit.action}
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-sans shrink-0">{audit.time}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                Campaign: <span className="font-semibold text-slate-700 dark:text-slate-300">{audit.campaign}</span>
              </p>
              
              <div className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500 mt-2 font-sans pt-1">
                <User className="w-3 h-3 text-slate-350" />
                <span>Modified by: <span className="font-semibold text-slate-500 dark:text-slate-400">{audit.user}</span></span>
                <span className="mx-1">•</span>
                <span>Ref ID: <span className="font-mono">{audit.id}</span></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
