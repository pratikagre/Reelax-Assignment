import React from 'react';

export default function LayoutWrapper({ sidebar, header, children }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 dark:bg-slate-950 font-sans">
      {/* Sidebar - left */}
      {sidebar}

      {/* Main Content Area - right */}
      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
        {/* Header - top */}
        {header}

        {/* Dynamic content scrollable viewport */}
        <main className="flex-1 overflow-y-auto px-6 py-6 md:px-8 space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
