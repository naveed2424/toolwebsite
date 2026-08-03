import React from 'react';
import { CATEGORIES } from '../data/categoriesData';
import { ToolItem, CategoryId, AdSenseConfig } from '../types';
import { AdBanner } from './AdBanner';
import { Sparkles, Star, Search, Layers, ArrowRight, ShieldCheck, Flame, BookOpen } from 'lucide-react';

interface Props {
  tools: ToolItem[];
  selectedCategory: CategoryId | 'all';
  setSelectedCategory: (cat: CategoryId | 'all') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSelectTool: (tool: ToolItem) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  showFavoritesOnly: boolean;
  setShowFavoritesOnly: (val: boolean) => void;
  adConfig: AdSenseConfig;
  onNavigateBlog: () => void;
}

export const ToolGrid: React.FC<Props> = ({
  tools,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  onSelectTool,
  favorites,
  onToggleFavorite,
  showFavoritesOnly,
  setShowFavoritesOnly,
  adConfig,
  onNavigateBlog,
}) => {
  // Filter logic
  let filtered = tools.filter((t) => {
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFav = !showFavoritesOnly || favorites.includes(t.id);
    return matchesCategory && matchesSearch && matchesFav;
  });

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Hero Banner Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden space-y-6 border border-slate-800">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-3.5 py-1.5 rounded-full backdrop-blur-xs">
            <Sparkles className="w-4 h-4 text-indigo-400" /> 100+ Free Browser Web Tools & Daily Tech Digest
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
            High-Performance Web Utilities & Daily AI News
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Convert PDFs, edit photos, calculate mortgages, format code, and read daily 2,000+ word AI research blogs with zero installation and 100% browser data privacy.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onNavigateBlog}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-heading font-bold text-xs shadow-md flex items-center gap-2 transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-indigo-200" /> Today's Trending AI Digest <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs text-slate-300 font-medium flex items-center gap-1.5 bg-slate-800/80 border border-slate-700 px-3.5 py-2 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Client-Side WebAssembly Processing
            </span>
          </div>
        </div>
      </div>

      {/* Header Ad Placement */}
      <AdBanner slot="headerBanner" config={adConfig} />

      {/* 6 Category Filter Tabs & Favorites Toggle */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setSelectedCategory('all');
                setShowFavoritesOnly(false);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === 'all' && !showFavoritesOnly
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-2xs'
              }`}
            >
              All Tools (100+)
            </button>

            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setShowFavoritesOnly(false);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === cat.id && !showFavoritesOnly
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-2xs'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  selectedCategory === cat.id && !showFavoritesOnly
                    ? 'bg-slate-800 text-indigo-300'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
              showFavoritesOnly
                ? 'bg-amber-50 border-amber-300 text-amber-700 shadow-2xs'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-2xs'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${showFavoritesOnly ? 'fill-amber-400 text-amber-500' : 'text-slate-400'}`} />
            <span>Favorites ({favorites.length})</span>
          </button>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="space-y-4">
        <div className="flex justify-between items-center text-xs text-slate-500 font-semibold">
          <span>Showing {filtered.length} utilities available</span>
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-indigo-600 hover:underline">
              Clear search filter
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/80 shadow-xs space-y-3">
            <Search className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="font-heading font-extrabold text-lg text-slate-900">No tools matched your filter</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try searching for common terms like "PDF", "BMI", "JSON", "Converter", or reset category selection.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setShowFavoritesOnly(false);
              }}
              className="px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-indigo-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((tool) => {
              const catInfo = CATEGORIES.find((c) => c.id === tool.category);
              const isFav = favorites.includes(tool.id);

              return (
                <div
                  key={tool.id}
                  onClick={() => onSelectTool(tool)}
                  className="group pro-card rounded-2xl p-5 border border-slate-200/80 hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between space-y-4 relative"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${catInfo?.badgeBg || 'bg-slate-100'} ${catInfo?.badgeText || 'text-slate-700'}`}
                      >
                        {catInfo?.name}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(tool.id);
                        }}
                        className="text-slate-300 hover:text-amber-400 p-1 transition-colors"
                      >
                        <Star className={`w-4 h-4 ${isFav ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                      </button>
                    </div>

                    <h3 className="font-heading font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                      {tool.name}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-sans">
                      {tool.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:text-indigo-700">
                    <span>Open Utility</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* In-Article Ad Placement */}
      <AdBanner slot="inArticle" config={adConfig} />
    </div>
  );
};
