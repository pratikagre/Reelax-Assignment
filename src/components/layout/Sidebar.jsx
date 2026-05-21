import React from 'react';
import { 
  LayoutDashboard, 
  Tv, 
  BarChart3, 
  Users2, 
  CircleDollarSign, 
  Settings, 
  X, 
  Sparkles,
  LogOut
} from 'lucide-react';
import Button from '../common/Button';

export default function Sidebar({ isOpen, onClose, activeTab, onTabChange }) {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'history', label: 'History & Audits', icon: CircleDollarSign }
  ];

  const secondaryItems = [
    { id: 'influencers', label: 'Influencers', icon: Users2 },
    { id: 'campaigns', label: 'Campaign Hub', icon: Tv },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <>
      {/* Mobile Sidebar Backdrop overlay */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden transition-opacity duration-300"
        />
      )}

      {/* Sidebar container */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen shrink-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-figma-md bg-gradient-to-tr from-brand-600 to-brand-500 text-white shadow-md shadow-brand-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-heading font-bold text-lg text-slate-900 dark:text-white tracking-tight">Reelax</span>
            <span className="text-[10px] font-semibold font-sans px-1.5 py-0.5 bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400 rounded">B2B</span>
          </div>
          
          {/* Close button on mobile */}
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
          <div>
            <span className="px-3 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Core Workspace
            </span>
            <ul className="mt-2.5 space-y-1">
              {menuItems.map((item) => {
                const isActive = activeTab === item.id;
                const IconComponent = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        onTabChange(item.id);
                        onClose(); // Close mobile drawer
                      }}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2.5 rounded-figma-md text-sm font-sans font-medium transition-all duration-200
                        ${isActive 
                          ? 'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400 font-semibold' 
                          : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800/50'}
                      `}
                    >
                      <IconComponent className={`w-4 h-4 shrink-0 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} />
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <span className="px-3 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Management
            </span>
            <ul className="mt-2.5 space-y-1">
              {secondaryItems.map((item) => {
                const isActive = activeTab === item.id;
                const IconComponent = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        onTabChange(item.id);
                        onClose();
                      }}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2.5 rounded-figma-md text-sm font-sans font-medium transition-all duration-200
                        ${isActive 
                          ? 'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400 font-semibold' 
                          : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800/50'}
                      `}
                    >
                      <IconComponent className="w-4 h-4 shrink-0" />
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* User Card / Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-3 p-2 rounded-figma-lg bg-slate-50 dark:bg-slate-950 border border-slate-100/50 dark:border-slate-800/50">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" 
                alt="Pratik Agre" 
                className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-800"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-950 active-pulse-dot" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white font-sans truncate">Pratik Agre</h4>
              <p className="text-xs text-slate-400 dark:text-slate-500 truncate font-sans">Campaign Manager</p>
            </div>
            <button className="p-1.5 rounded-figma-md text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
