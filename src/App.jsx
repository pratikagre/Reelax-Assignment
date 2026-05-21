import React, { useState, useEffect } from 'react';
import LayoutWrapper from './components/layout/LayoutWrapper';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Card from './components/common/Card';
import Tabs from './components/dashboard/Tabs';
import DataTable from './components/dashboard/DataTable';
import AnalyticsCharts from './components/dashboard/AnalyticsCharts';
import HistoryTimeline from './components/dashboard/HistoryTimeline';
import CampaignModal from './components/dashboard/CampaignModal';
import Button from './components/common/Button';

// Mock database
import { summaryStats, campaignsData } from './data/mockData';

// Icons
import { 
  CreditCard, 
  Tv, 
  Users, 
  TrendingUp, 
  ArrowUpRight, 
  Plus, 
  Search,
  Sparkles,
  Sliders
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sync dark mode class
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Metric icons mapper
  const getMetricIcon = (title) => {
    switch (title) {
      case 'Total Spend':
        return CreditCard;
      case 'Active Campaigns':
        return Tv;
      case 'Total Influencers':
        return Users;
      case 'Avg Engagement Rate':
      default:
        return TrendingUp;
    }
  };

  // Render Page Content based on selected Tab
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Metric Summary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {summaryStats.map((stat, idx) => (
                <Card
                  key={idx}
                  title={stat.title}
                  value={stat.value}
                  change={stat.change}
                  changeType={stat.changeType}
                  icon={getMetricIcon(stat.title)}
                />
              ))}
            </div>

            {/* Dynamic Tabs Navigation */}
            <div className="pt-2">
              <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
            </div>

            {/* Main Interactive campaign table */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white m-0">Campaign Hub</h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-sans">Click on any campaign row to analyze details and deliverables.</p>
                </div>
              </div>
              <DataTable 
                campaigns={campaignsData} 
                onRowClick={setSelectedCampaign} 
                searchQuery={searchQuery}
              />
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
            <AnalyticsCharts />
          </div>
        );

      case 'history':
        return (
          <div className="space-y-6">
            <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
            <HistoryTimeline />
          </div>
        );

      case 'influencers':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-figma-lg p-6 shadow-premium space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white m-0">Creator Community</h2>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Explore and connect with creators in your network.</p>
                </div>
                <Button variant="primary" size="sm" icon={Plus}>Add Creator</Button>
              </div>
              {/* Creator pool card layouts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {campaignsData.map((camp, idx) => (
                  <div key={idx} className="p-4 border border-slate-100 dark:border-slate-800 rounded-figma-lg flex items-center gap-3.5 hover:shadow-sm transition-all duration-200">
                    <img src={camp.influencer.avatar} alt="" className="w-10 h-10 rounded-full object-cover border" />
                    <div>
                      <span className="block text-sm font-bold text-slate-900 dark:text-white leading-tight">{camp.influencer.name}</span>
                      <span className="block text-xs text-slate-400 dark:text-slate-500">{camp.influencer.handle}</span>
                      <span className="inline-block text-[10px] font-semibold text-brand-500 mt-1.5">{camp.influencer.followers} followers</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'campaigns':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-figma-lg p-6 shadow-premium space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white m-0">Active Campaigns</h2>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Overview of currently running projects.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {campaignsData.map((camp, idx) => (
                  <div key={idx} className="p-5 border border-slate-100 dark:border-slate-800 rounded-figma-lg hover:shadow-sm transition-all duration-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-brand-500 font-mono">{camp.id}</span>
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">{camp.startDate}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white font-sans truncate">{camp.name}</h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-sans line-clamp-2">{camp.description}</p>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-50 dark:border-slate-800/50">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{camp.budget}</span>
                      <Button variant="ghost" size="sm" onClick={() => {
                        setSelectedCampaign(camp);
                      }}>Analyze</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-figma-lg p-6 shadow-premium space-y-5">
              <div>
                <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white m-0">Account & Workspace Settings</h2>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Configure your B2B dashboard integration and settings preferences.</p>
              </div>
              
              <div className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-300 block font-sans">Workspace Theme</span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-sans">Toggle between light and premium dark themes.</span>
                  </div>
                  <Button variant="secondary" size="sm" onClick={() => setIsDarkMode(!isDarkMode)}>
                    Toggle Theme
                  </Button>
                </div>
                <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-300 block font-sans">Global Search Optimization</span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-sans">Auto-updates lists instantly as you search campaigns.</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 text-xs font-semibold">Active</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <LayoutWrapper
        sidebar={
          <Sidebar 
            isOpen={isMobileSidebarOpen}
            onClose={() => setIsMobileSidebarOpen(false)}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        }
        header={
          <Header
            onMenuToggle={() => setIsMobileSidebarOpen(true)}
            title={activeTab}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            isDarkMode={isDarkMode}
            onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
          />
        }
      >
        {renderContent()}
      </LayoutWrapper>

      {/* Floating Campaign Details Modal popup */}
      {selectedCampaign && (
        <CampaignModal
          campaign={selectedCampaign}
          onClose={() => setSelectedCampaign(null)}
        />
      )}
    </>
  );
}
