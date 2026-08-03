import React from 'react';
import { AdSenseConfig } from '../types';
import { Info, Sparkles } from 'lucide-react';

interface Props {
  slot: 'headerBanner' | 'sidebarSquare' | 'inArticle' | 'footerSticky' | 'toolSidebar';
  config: AdSenseConfig;
}

export const AdBanner: React.FC<Props> = ({ slot, config }) => {
  if (!config.enabled || !config.slots[slot]) {
    return null;
  }

  const isDemo = config.demoMode;

  const slotDimensions = {
    headerBanner: 'h-24 w-full max-w-4xl mx-auto',
    sidebarSquare: 'h-60 w-full max-w-xs mx-auto',
    inArticle: 'h-28 w-full my-6',
    footerSticky: 'h-16 w-full fixed bottom-0 left-0 z-40 bg-slate-900 border-t border-slate-800 text-white',
    toolSidebar: 'h-64 w-full',
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-dashed border-amber-300 bg-amber-50/70 p-3 flex flex-col items-center justify-center text-center my-4 font-sans ${slotDimensions[slot]}`}>
      <div className="absolute top-1.5 right-2.5 flex items-center gap-1 text-[10px] text-amber-800 font-bold uppercase tracking-wider">
        <span>Advertisement</span>
        {config.publisherId && (
          <span className="bg-amber-200/80 px-1.5 py-0.5 rounded text-[9px] font-mono">
            {config.publisherId.slice(0, 12)}...
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 text-amber-900 font-heading">
        <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" />
        <span className="text-xs font-bold">
          {slot === 'headerBanner' && 'Responsive Top Leaderboard Ad Unit (728x90)'}
          {slot === 'sidebarSquare' && 'Google AdSense Square Slot (300x250)'}
          {slot === 'inArticle' && 'In-Article Native Ad Placement Zone'}
          {slot === 'footerSticky' && 'Mobile Sticky Bottom Anchor Ad (320x50)'}
          {slot === 'toolSidebar' && 'Interactive Tool Sidebar Sponsor Slot'}
        </span>
      </div>

      {isDemo && (
        <p className="text-[11px] text-amber-700 mt-0.5 font-sans">
          AdSense Demo Mode Active • High Viewability Placement Zone
        </p>
      )}
    </div>
  );
};
