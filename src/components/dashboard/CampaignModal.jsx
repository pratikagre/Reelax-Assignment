import React, { useEffect } from 'react';
import { X, DollarSign, Target, BarChart2, Eye, User, Sparkles } from 'lucide-react';
import Badge from '../common/Badge';
import Button from '../common/Button';

export default function CampaignModal({ campaign, onClose }) {
  // ESC Key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!campaign) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md transition-opacity duration-300">
      {/* Click-out overlay */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog Content container */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-figma-lg shadow-2xl overflow-hidden transform transition-all duration-300 scale-100 flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Badge type="platform" value={campaign.platform} />
            <span className="text-xs text-slate-400 font-mono font-medium">{campaign.id}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Title & Status */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl md:text-2xl font-bold font-heading text-slate-950 dark:text-white m-0">
                {campaign.name}
              </h2>
              <Badge type="status" value={campaign.status} />
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
              {campaign.description}
            </p>
          </div>

          {/* Influencer Profile Section */}
          <div className="p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 rounded-figma-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <img 
                src={campaign.influencer.avatar} 
                alt={campaign.influencer.name} 
                className="w-12 h-12 rounded-full object-cover border-2 border-brand-100 dark:border-slate-800 shadow"
              />
              <div className="space-y-0.5">
                <span className="block text-sm font-bold text-slate-900 dark:text-white font-sans">{campaign.influencer.name}</span>
                <span className="block text-xs text-slate-400 dark:text-slate-500 font-sans">{campaign.influencer.handle}</span>
              </div>
            </div>
            <div className="flex gap-4 border-t sm:border-t-0 border-slate-100 dark:border-slate-800 pt-3 sm:pt-0 text-left">
              <div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider block font-semibold font-sans">Followers</span>
                <span className="text-sm font-bold text-slate-800 dark:text-white block font-heading">{campaign.influencer.followers}</span>
              </div>
              <div className="w-px bg-slate-200 dark:bg-slate-800 self-stretch" />
              <div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider block font-semibold font-sans">Reach Capacity</span>
                <span className="text-sm font-bold text-slate-800 dark:text-white block font-heading">{campaign.reach}</span>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 border border-slate-100 dark:border-slate-800 rounded-figma-lg space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
                <DollarSign className="w-4 h-4 text-brand-500" />
                <span className="text-[10px] font-bold uppercase tracking-wider font-sans">Total Budget</span>
              </div>
              <span className="text-lg font-bold text-slate-950 dark:text-white font-heading block">{campaign.budget}</span>
            </div>

            <div className="p-4 border border-slate-100 dark:border-slate-800 rounded-figma-lg space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
                <Target className="w-4 h-4 text-brand-500" />
                <span className="text-[10px] font-bold uppercase tracking-wider font-sans">Spend to Date</span>
              </div>
              <span className="text-lg font-bold text-slate-950 dark:text-white font-heading block">{campaign.spend}</span>
            </div>

            <div className="p-4 border border-slate-100 dark:border-slate-800 rounded-figma-lg space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
                <BarChart2 className="w-4 h-4 text-brand-500" />
                <span className="text-[10px] font-bold uppercase tracking-wider font-sans">Engagement</span>
              </div>
              <span className="text-lg font-bold text-slate-950 dark:text-white font-heading block">{campaign.engagement}</span>
            </div>
          </div>

          {/* Deliverables Checklist */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-sans">Campaign Deliverables</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {campaign.deliverables.map((item, index) => (
                <li 
                  key={index}
                  className="flex items-center gap-2.5 p-3 rounded-figma-md bg-slate-50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-355 font-sans"
                >
                  <div className="w-4 h-4 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                    ✓
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Timeline / Project Schedule */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-sans">Timeline Details</h3>
            <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 font-sans p-3 border border-slate-100 dark:border-slate-800 rounded-figma-md">
              <div>
                <span className="block text-[10px] text-slate-400 font-semibold uppercase">Start Date</span>
                <span className="font-bold text-slate-800 dark:text-white text-sm">{campaign.startDate}</span>
              </div>
              <div className="h-0.5 w-12 bg-slate-200 dark:bg-slate-800" />
              <div className="text-right">
                <span className="block text-[10px] text-slate-400 font-semibold uppercase">End Date</span>
                <span className="font-bold text-slate-800 dark:text-white text-sm">{campaign.endDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer actions */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3 shrink-0">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close details
          </Button>
          <Button variant="primary" size="sm">
            Edit Campaign
          </Button>
        </div>

      </div>
    </div>
  );
}
