import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function Card({ title, value, change, changeType, icon: Icon }) {
  const isPositive = changeType === 'positive';

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-figma-lg border border-slate-100 dark:border-slate-800 shadow-premium flex flex-col justify-between transition-all duration-300 hover:shadow-premium-hover hover:-translate-y-0.5 group">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400 font-sans">{title}</span>
        {Icon && (
          <div className="p-2.5 bg-brand-50 dark:bg-brand-500/10 rounded-figma-md text-brand-500 transition-colors duration-300 group-hover:bg-brand-100 dark:group-hover:bg-brand-500/20">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div>
        <h3 className="text-2xl font-bold text-slate-950 dark:text-white font-heading tracking-tight">
          {value}
        </h3>
        <div className="flex items-center gap-1.5 mt-2">
          <span className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${
            isPositive 
              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' 
              : 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400'
          }`}>
            {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {isPositive ? '+' : ''}{change}%
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500 font-sans">vs last month</span>
        </div>
      </div>
    </div>
  );
}
