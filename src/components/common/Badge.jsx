import React from 'react';
import { Instagram, Youtube, Play } from 'lucide-react';

export default function Badge({ type, value, className = '' }) {
  // 1. Status Badges
  if (type === 'status') {
    const statusStyles = {
      Active: 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20',
      Completed: 'bg-brand-50 text-brand-600 border-brand-100 dark:bg-brand-500/10 dark:text-brand-400 dark:border-brand-500/20',
      Pending: 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20',
      Paused: 'bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${statusStyles[value] || 'bg-slate-50 text-slate-700 border-slate-200'} ${className}`}>
        {value === 'Active' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 active-pulse-dot" />}
        {value}
      </span>
    );
  }

  // 2. Platform Badges
  if (type === 'platform') {
    const platformConfigs = {
      Instagram: {
        bg: 'bg-pink-50 text-pink-700 border-pink-100 hover:bg-pink-100 dark:bg-pink-500/10 dark:text-pink-400 dark:border-pink-500/20',
        icon: Instagram
      },
      TikTok: {
        bg: 'bg-slate-900 text-white border-slate-800 hover:bg-slate-800 dark:bg-slate-800 dark:border-slate-700',
        icon: ({ className }) => (
          <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.62 4.2 1.22 1.34 2.92 2.1 4.74 2.37v3.83c-1.39-.07-2.74-.53-3.89-1.31a8.16 8.16 0 0 1-2.47-2.67c-.03.74-.01 1.48-.02 2.22-.05 3.32-.87 6.64-3.1 9.07-2.43 2.58-6.16 3.66-9.59 2.76A9.61 9.61 0 0 1 .49 13.9c-.31-3.66 1.44-7.46 4.67-9.28 1.86-1.01 4-1.36 6.1-1.07.03 1.21-.01 2.42-.01 3.63-1.63-.38-3.41-.09-4.83.84-1.5 1.05-2.22 2.99-1.78 4.79.43 1.88 2.26 3.25 4.19 3.07 1.95-.08 3.56-1.72 3.61-3.67.03-3.95.01-7.9.02-11.86.01-.11.02-.21.03-.33z"/>
          </svg>
        )
      },
      YouTube: {
        bg: 'bg-rose-50 text-rose-700 border-rose-100 hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20',
        icon: Youtube
      }
    };

    const config = platformConfigs[value] || { bg: 'bg-slate-50 text-slate-700 border-slate-200', icon: Play };
    const IconComponent = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.bg} ${className}`}>
        <IconComponent className="w-3.5 h-3.5" />
        {value}
      </span>
    );
  }

  return null;
}
