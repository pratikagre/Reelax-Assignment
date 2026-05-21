import React from 'react';

export default function Tabs({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'history', label: 'History & Audits' },
  ];

  return (
    <div className="flex items-center border-b border-slate-200 dark:border-slate-800 w-full mb-6 shrink-0">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-6 py-3.5 -mb-[1px] font-sans text-sm font-medium transition-all duration-200 border-b-2 relative focus:outline-none cursor-pointer ${
              isActive
                ? 'border-brand-500 text-brand-600 dark:text-brand-400 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            {tab.label}
            {isActive && (
              <span className="absolute bottom-0 inset-x-4 h-0.5 bg-brand-500 rounded-t-full shadow shadow-brand-500/50" />
            )}
          </button>
        );
      })}
    </div>
  );
}
