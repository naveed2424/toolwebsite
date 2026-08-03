import React, { useState } from 'react';
import { CATEGORIES } from '../data/categoriesData';
import { CategoryId, ToolItem, AdSenseConfig } from '../types';
import { Sparkles, Search, BookOpen, Layers, Settings, FileSpreadsheet, Star, ShieldCheck, ChevronDown, Check } from 'lucide-react';

interface Props {
  activeTab: 'tools' | 'blog' | 'about' | 'privacy' | 'terms' | 'disclaimer' | 'contact';
  setActiveTab: (tab: 'tools' | 'blog' | 'about' | 'privacy' | 'terms' | 'disclaimer' | 'contact') => void;
  selectedCategory: CategoryId | 'all';
  setSelectedCategory: (cat: CategoryId | 'all') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  favoritesCount: number;
  onOpenSitemap: () => void;
  adConfig: AdSenseConfig;
  setAdConfig: React.Dispatch<React.SetStateAction<AdSenseConfig>>;
}

export const Header: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  favoritesCount,
  onOpenSitemap,
  adConfig,
  setAdConfig,
}) => {
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showAdSettings, setShowAdSettings] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div
            onClick={() => {
              setActiveTab('tools');
              setSelectedCategory('all');
            }}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-900 via-indigo-900 to-indigo-600 flex items-center justify-center text-white shadow-sm font-bold group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <span className="font-heading font-extrabold text-lg text-slate-900 tracking-tight flex items-center gap-1">
                AITools <span className="text-indigo-600">Hub</span>
              </span>
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block -mt-1 font-sans">
                100+ Free Web Tools & Digest
              </span>
            </div>
          </div>

          {/* Quick Search Input */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'tools') setActiveTab('tools');
              }}
              placeholder="Search 100+ tools (e.g. PDF merger, BMI, JSON, WEBP)..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-3 focus:ring-indigo-100 transition-all font-medium"
            />
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Category Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowCategoryMenu(!showCategoryMenu)}
                className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all"
              >
                <Layers className="w-3.5 h-3.5 text-indigo-600" />
                <span className="hidden sm:inline">Categories</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showCategoryMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-lg p-2 z-50 space-y-1">
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setActiveTab('tools');
                      setShowCategoryMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-xl flex items-center justify-between transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-indigo-50 text-indigo-700 font-bold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>All 100+ Tools</span>
                    {selectedCategory === 'all' && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                  </button>

                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setActiveTab('tools');
                        setShowCategoryMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-xl flex items-center justify-between transition-colors ${
                        selectedCategory === cat.id
                          ? 'bg-indigo-50 text-indigo-700 font-bold'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-mono font-bold">
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Daily AI Tech Digest Tab */}
            <button
              onClick={() => setActiveTab('blog')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'blog'
                  ? 'bg-slate-900 text-white shadow-sm hover:bg-slate-800'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-2xs'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              <span>Daily AI Digest</span>
            </button>

            {/* Sitemap Modal Trigger */}
            <button
              onClick={onOpenSitemap}
              className="p-2 text-slate-600 hover:text-indigo-600 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 shadow-2xs cursor-pointer transition-colors"
              title="XML Sitemap & Robots.txt"
            >
              <FileSpreadsheet className="w-4 h-4" />
            </button>

            {/* AdSense Settings Toggle */}
            <button
              onClick={() => setShowAdSettings(!showAdSettings)}
              className="p-2 text-amber-700 bg-amber-50 hover:bg-amber-100/80 rounded-xl border border-amber-200 cursor-pointer transition-colors"
              title="AdSense Placement Controls"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* AdSense Settings Modal Overlay */}
      {showAdSettings && (
        <div className="bg-amber-50/95 backdrop-blur-xs border-b border-amber-200/80 p-4 text-xs space-y-3">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-amber-950 font-bold">
              <ShieldCheck className="w-4 h-4 text-amber-600" /> Google AdSense & Monetization Controls
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <label className="flex items-center gap-1.5 font-semibold text-amber-900 cursor-pointer">
                <input
                  type="checkbox"
                  checked={adConfig.enabled}
                  onChange={(e) => setAdConfig({ ...adConfig, enabled: e.target.checked })}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                Show Ad Placements
              </label>

              <label className="flex items-center gap-1.5 font-semibold text-amber-900 cursor-pointer">
                <input
                  type="checkbox"
                  checked={adConfig.demoMode}
                  onChange={(e) => setAdConfig({ ...adConfig, demoMode: e.target.checked })}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                AdSense Demo Banners
              </label>

              <input
                type="text"
                value={adConfig.publisherId}
                onChange={(e) => setAdConfig({ ...adConfig, publisherId: e.target.value })}
                placeholder="ca-pub-XXXXXXXXXXXXXXXX"
                className="px-2.5 py-1 text-xs rounded border border-amber-300 bg-white font-mono text-slate-800 shadow-2xs focus:ring-2 focus:ring-amber-400 outline-none"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
