import React, { useState } from 'react';
import { 
  Instagram, 
  Youtube, 
  Search, 
  SlidersHorizontal,
  ChevronRight,
  ArrowUpDown,
  FilterX
} from 'lucide-react';
import Badge from '../common/Badge';
import Button from '../common/Button';

export default function DataTable({ campaigns, onRowClick, searchQuery }) {
  const [platformFilter, setPlatformFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  // Handle column sorting
  const handleSort = (field) => {
    const isAsc = sortField === field && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortField(field);
  };

  // Filter logic
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = 
      campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.influencer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.influencer.handle.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPlatform = platformFilter === 'All' || campaign.platform === platformFilter;
    const matchesStatus = statusFilter === 'All' || campaign.status === statusFilter;

    return matchesSearch && matchesPlatform && matchesStatus;
  });

  // Sort logic
  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    if (!sortField) return 0;
    
    let aVal = a[sortField];
    let bVal = b[sortField];

    // Special numeric mappings
    if (sortField === 'budget') {
      aVal = a.budgetVal;
      bVal = b.budgetVal;
    } else if (sortField === 'engagement') {
      aVal = a.engagementVal;
      bVal = b.engagementVal;
    }

    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-figma-lg shadow-premium overflow-hidden">
      {/* Filtering Header controls */}
      <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Platform Quick Tags */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {['All', 'Instagram', 'TikTok', 'YouTube'].map((plat) => (
            <button
              key={plat}
              onClick={() => setPlatformFilter(plat)}
              className={`
                px-3 py-1.5 rounded-figma-md text-xs font-medium cursor-pointer transition-all duration-200 border shrink-0
                ${platformFilter === plat 
                  ? 'bg-brand-500 border-brand-500 text-white shadow-sm shadow-brand-500/10' 
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700'}
              `}
            >
              {plat}
            </button>
          ))}
        </div>

        {/* Status Dropdown selector & Reset */}
        <div className="flex items-center gap-3 justify-end">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-white rounded-figma-md px-3 py-1.5 text-xs font-sans focus:outline-none focus:border-brand-500"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Paused">Paused</option>
            </select>
          </div>

          {(platformFilter !== 'All' || statusFilter !== 'All') && (
            <button
              onClick={() => {
                setPlatformFilter('All');
                setStatusFilter('All');
              }}
              className="inline-flex items-center gap-1 text-xs text-rose-500 hover:text-rose-600 font-medium font-sans cursor-pointer"
            >
              <FilterX className="w-3 h-3" />
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="max-lg:hidden overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-950/20 text-slate-400 dark:text-slate-500 font-sans text-xs font-semibold border-b border-slate-100 dark:border-slate-800">
              <th className="py-4 px-6">Campaign Info</th>
              <th className="py-4 px-6">Influencer</th>
              <th className="py-4 px-6">Platform</th>
              <th className="py-4 px-6 cursor-pointer hover:text-slate-700 dark:hover:text-slate-300 transition-colors" onClick={() => handleSort('budget')}>
                <div className="flex items-center gap-1.5">
                  Budget <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-4 px-6 cursor-pointer hover:text-slate-700 dark:hover:text-slate-300 transition-colors" onClick={() => handleSort('engagement')}>
                <div className="flex items-center gap-1.5">
                  Engagement <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {sortedCampaigns.length > 0 ? (
              sortedCampaigns.map((camp) => (
                <tr 
                  key={camp.id}
                  onClick={() => onRowClick(camp)}
                  className="hover:bg-slate-50/55 dark:hover:bg-slate-800/20 transition-all duration-150 cursor-pointer group"
                >
                  {/* Campaign Name */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="font-sans font-bold text-sm text-slate-900 dark:text-white group-hover:text-brand-500 transition-colors">
                        {camp.name}
                      </span>
                      <span className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{camp.id}</span>
                    </div>
                  </td>
                  {/* Influencer Profile */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img 
                        src={camp.influencer.avatar} 
                        alt={camp.influencer.name} 
                        className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-800 shadow-sm"
                      />
                      <div className="flex flex-col">
                        <span className="font-sans font-medium text-sm text-slate-800 dark:text-slate-300">{camp.influencer.name}</span>
                        <span className="text-xs text-slate-400 dark:text-slate-500">{camp.influencer.handle}</span>
                      </div>
                    </div>
                  </td>
                  {/* Platform Badge */}
                  <td className="py-4 px-6">
                    <Badge type="platform" value={camp.platform} />
                  </td>
                  {/* Budget */}
                  <td className="py-4 px-6">
                    <span className="font-heading font-bold text-sm text-slate-800 dark:text-slate-350">{camp.budget}</span>
                  </td>
                  {/* Engagement Rate */}
                  <td className="py-4 px-6">
                    <span className="font-sans font-semibold text-sm text-slate-800 dark:text-slate-300">{camp.engagement}</span>
                  </td>
                  {/* Status */}
                  <td className="py-4 px-6">
                    <Badge type="status" value={camp.status} />
                  </td>
                  {/* Details Trigger */}
                  <td className="py-4 px-6 text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      icon={ChevronRight}
                      iconPosition="right"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRowClick(camp);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      Details
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-slate-400">
                    <span className="font-sans font-medium text-sm">No campaigns match your filters.</span>
                    <button 
                      onClick={() => {
                        setPlatformFilter('All');
                        setStatusFilter('All');
                      }}
                      className="mt-2 text-xs text-brand-500 hover:text-brand-600 font-semibold cursor-pointer"
                    >
                      Clear all search parameters
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout - Under 1024px */}
      <div className="lg:hidden divide-y divide-slate-100 dark:divide-slate-800">
        {sortedCampaigns.length > 0 ? (
          sortedCampaigns.map((camp) => (
            <div 
              key={camp.id}
              onClick={() => onRowClick(camp)}
              className="p-5 hover:bg-slate-50/50 dark:hover:bg-slate-800/10 cursor-pointer transition-colors space-y-4"
            >
              {/* Card top */}
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-sans font-semibold">{camp.id}</span>
                  <h4 className="font-sans font-bold text-base text-slate-950 dark:text-white leading-tight">
                    {camp.name}
                  </h4>
                </div>
                <Badge type="status" value={camp.status} />
              </div>

              {/* Creator details */}
              <div className="flex items-center justify-between border-t border-b border-slate-50 dark:border-slate-800/50 py-3">
                <div className="flex items-center gap-2.5">
                  <img 
                    src={camp.influencer.avatar} 
                    alt={camp.influencer.name} 
                    className="w-7 h-7 rounded-full object-cover border"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-300 leading-tight">{camp.influencer.name}</span>
                    <span className="text-[10px] text-slate-400 leading-none">{camp.influencer.handle}</span>
                  </div>
                </div>
                <Badge type="platform" value={camp.platform} />
              </div>

              {/* Card Metrics */}
              <div className="flex justify-between items-center text-xs">
                <div>
                  <span className="text-slate-400 dark:text-slate-500 block font-medium">Budget</span>
                  <span className="font-heading font-bold text-slate-800 dark:text-white text-sm">{camp.budget}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 dark:text-slate-500 block font-medium">Engagement</span>
                  <span className="font-sans font-bold text-slate-800 dark:text-white text-sm">{camp.engagement}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 text-center text-slate-400 dark:text-slate-500">
            <p className="font-sans text-sm">No campaigns match your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
