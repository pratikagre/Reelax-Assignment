import React from 'react';
import { Menu, Bell, Search, Plus, Sun, Moon } from 'lucide-react';
import Button from '../common/Button';

export default function Header({ 
  onMenuToggle, 
  title, 
  searchQuery, 
  onSearchChange,
  isDarkMode,
  onDarkModeToggle
}) {
  return (
    <header className="h-16 border-b border-slate-100 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md sticky top-0 z-30 px-6 flex items-center justify-between gap-4">
      {/* Mobile Drawer Trigger & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="p-2 -ml-2 rounded-figma-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 lg:hidden focus:outline-none"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="font-heading font-bold text-xl text-slate-900 dark:text-white capitalize">
          {title === 'overview' ? 'Overview Dashboard' : title.replace('&', 'and')}
        </h1>
      </div>

      {/* Global search and action buttons */}
      <div className="flex items-center gap-4">
        {/* Search Bar - Hidden on small mobile */}
        <div className="relative hidden md:flex items-center w-64">
          <Search className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search campaigns or creators..."
            className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-white rounded-figma-md text-xs font-sans focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 placeholder-slate-400 transition-all duration-200"
          />
        </div>

        {/* Theme toggle */}
        <button
          onClick={onDarkModeToggle}
          className="p-2 rounded-figma-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notifications */}
        <button className="p-2 rounded-figma-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 border border-white dark:border-slate-900 rounded-full" />
        </button>

        {/* Quick Action Button */}
        <Button 
          variant="primary" 
          size="sm" 
          icon={Plus}
          className="hidden sm:inline-flex"
        >
          New Campaign
        </Button>
      </div>
    </header>
  );
}
