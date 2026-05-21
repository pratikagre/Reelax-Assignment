import React from 'react';
import { platformEngagement } from '../../data/mockData';
import { TrendingUp, Award, Smartphone, BarChart2 } from 'lucide-react';

export default function AnalyticsCharts() {
  return (
    <div className="space-y-6">
      {/* Top row analytics header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-brand-900 text-white p-6 rounded-figma-lg shadow-premium flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-bold font-heading text-white m-0">Performance Insights</h2>
          <p className="text-xs text-slate-300 font-sans">Real-time engagement splits and capital allocation metrics across social networks.</p>
        </div>
        <div className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 bg-white/10 rounded-full border border-white/10 shrink-0">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span>+8.4% Engagement Growth</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SVG Circle Donut Chart - Engagement Share */}
        <div className="bg-white dark:bg-slate-900 p-6 border border-slate-100 dark:border-slate-800 rounded-figma-lg shadow-premium flex flex-col items-center justify-between">
          <div className="w-full mb-4">
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Audience Split</span>
            <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white mt-1">Platform Share</h3>
          </div>
          
          {/* Custom SVG Circle */}
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              {/* Instagram: 45% (dasharray 16 84) */}
              <circle cx="18" cy="18" r="15.915" fill="none" stroke="#cbd5e1" strokeWidth="2.5" className="opacity-20" />
              {/* Instagram segment: 45% */}
              <circle cx="18" cy="18" r="15.915" fill="none" stroke="#e1306c" strokeWidth="2.5" strokeDasharray="45 55" strokeDashoffset="0" />
              {/* TikTok segment: 35% */}
              <circle cx="18" cy="18" r="15.915" fill="none" stroke="#00f2fe" strokeWidth="2.5" strokeDasharray="35 65" strokeDashoffset="-45" />
              {/* YouTube segment: 20% */}
              <circle cx="18" cy="18" r="15.915" fill="none" stroke="#ff0000" strokeWidth="2.5" strokeDasharray="20 80" strokeDashoffset="-80" />
            </svg>
            <div className="absolute text-center">
              <span className="text-2xl font-bold font-heading text-slate-900 dark:text-white">167M</span>
              <span className="text-[10px] text-slate-400 block font-medium uppercase font-sans">Total Reach</span>
            </div>
          </div>

          {/* Donut Legend */}
          <div className="w-full grid grid-cols-3 gap-2 mt-6 border-t border-slate-50 dark:border-slate-800/50 pt-4">
            <div className="text-center">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#e1306c] mr-1.5" />
              <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-400 font-sans block">Instagram</span>
              <span className="text-xs font-bold text-slate-800 dark:text-white mt-0.5 block">45%</span>
            </div>
            <div className="text-center">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#00f2fe] mr-1.5" />
              <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-400 font-sans block">TikTok</span>
              <span className="text-xs font-bold text-slate-800 dark:text-white mt-0.5 block">35%</span>
            </div>
            <div className="text-center">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#ff0000] mr-1.5" />
              <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-400 font-sans block">YouTube</span>
              <span className="text-xs font-bold text-slate-800 dark:text-white mt-0.5 block">20%</span>
            </div>
          </div>
        </div>

        {/* Platform Engagement List Progress bars */}
        <div className="bg-white dark:bg-slate-900 p-6 border border-slate-100 dark:border-slate-800 rounded-figma-lg shadow-premium flex flex-col justify-between lg:col-span-2">
          <div>
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Channel Statistics</span>
            <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white mt-1">Average Engagement Rates</h3>
          </div>

          <div className="space-y-5 my-6">
            {platformEngagement.map((plat) => (
              <div key={plat.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-800 dark:text-slate-350 font-sans">{plat.name}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400 text-xs">{plat.campaigns} campaigns</span>
                    <span className="font-bold text-slate-900 dark:text-white">{plat.engagement}%</span>
                  </div>
                </div>
                {/* Horizontal Progress */}
                <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: `${(plat.engagement / 8) * 100}%`,
                      backgroundColor: plat.color 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Quick info summaries */}
          <div className="border-t border-slate-100 dark:border-slate-800 pt-4 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 rounded-figma-md">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-medium uppercase font-sans">Top Platform</span>
                <span className="text-xs font-bold text-slate-800 dark:text-white block">TikTok (5.9% Avg)</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-50 dark:bg-amber-500/10 text-amber-600 rounded-figma-md">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-medium uppercase font-sans">Campaign Count</span>
                <span className="text-xs font-bold text-slate-800 dark:text-white block">9 Campaigns Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SVG Column Chart representation for Spend */}
      <div className="bg-white dark:bg-slate-900 p-6 border border-slate-100 dark:border-slate-800 rounded-figma-lg shadow-premium">
        <div className="mb-6">
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Capital Distribution</span>
          <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white mt-1">Platform Payout Allocations</h3>
        </div>

        {/* Dynamic Spend Columns */}
        <div className="h-60 flex items-end justify-around gap-4 border-b border-slate-200 dark:border-slate-800 pb-2">
          {platformEngagement.map((plat) => (
            <div key={plat.name} className="flex flex-col items-center w-full max-w-[80px] group cursor-pointer">
              {/* Value on Hover */}
              <span className="text-xs font-bold text-slate-900 dark:text-white opacity-0 group-hover:opacity-100 transition-opacity mb-2">
                ${plat.spend.toLocaleString()}
              </span>
              {/* Column shape */}
              <div 
                className="w-full rounded-t-figma-md transition-all duration-700 ease-out shadow-sm group-hover:shadow group-hover:brightness-110"
                style={{ 
                  height: `${(plat.spend / 75000) * 180}px`,
                  backgroundColor: plat.color
                }}
              />
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-2 font-sans">{plat.name}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 mt-3 font-sans">
          <span>Capital allocated across networks</span>
          <span>Max Capacity $75,000</span>
        </div>
      </div>
    </div>
  );
}
