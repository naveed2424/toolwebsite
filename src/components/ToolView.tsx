import React from 'react';
import { ToolItem, AdSenseConfig } from '../types';
import { CATEGORIES } from '../data/categoriesData';
import { TOOLS_DATA } from '../data/toolsData';
import { PdfToolRunner } from './tools/PdfToolRunner';
import { ImageToolRunner } from './tools/ImageToolRunner';
import { CalculatorToolRunner } from './tools/CalculatorToolRunner';
import { AiTextToolRunner } from './tools/AiTextToolRunner';
import { CodeToolRunner } from './tools/CodeToolRunner';
import { SeoToolRunner } from './tools/SeoToolRunner';
import { AdBanner } from './AdBanner';
import { ArrowLeft, Star, Share2, ShieldCheck, Sparkles, HelpCircle } from 'lucide-react';

interface Props {
  tool: ToolItem;
  onBack: () => void;
  onSelectTool: (tool: ToolItem) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  adConfig: AdSenseConfig;
}

export const ToolView: React.FC<Props> = ({
  tool,
  onBack,
  onSelectTool,
  isFavorite,
  onToggleFavorite,
  adConfig,
}) => {
  const categoryInfo = CATEGORIES.find((c) => c.id === tool.category);

  // Filter related tools in same category
  const relatedTools = TOOLS_DATA.filter((t) => t.category === tool.category && t.id !== tool.id).slice(0, 4);

  const renderToolRunner = () => {
    switch (tool.category) {
      case 'pdf':
        return <PdfToolRunner tool={tool} />;
      case 'image':
        return <ImageToolRunner tool={tool} />;
      case 'calculator':
        return <CalculatorToolRunner tool={tool} />;
      case 'ai-text':
        return <AiTextToolRunner tool={tool} />;
      case 'code':
        return <CodeToolRunner tool={tool} />;
      case 'seo':
        return <SeoToolRunner tool={tool} />;
      default:
        return <AiTextToolRunner tool={tool} />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-8">
      {/* Back & Breadcrumb Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-indigo-600 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-2xs hover:bg-slate-50 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-slate-500" /> Back to All Tools
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleFavorite(tool.id)}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer shadow-2xs ${
              isFavorite
                ? 'bg-amber-50 border-amber-300 text-amber-500'
                : 'bg-white border-slate-200 text-slate-400 hover:text-amber-500 hover:bg-slate-50'
            }`}
            title="Bookmark Tool"
          >
            <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400 text-amber-500' : ''}`} />
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert('Tool link copied to clipboard!');
            }}
            className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:bg-slate-50 shadow-2xs transition-all cursor-pointer"
            title="Share Tool"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tool Header Title & Badge */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full border ${categoryInfo?.badgeBg || 'bg-slate-100'} ${categoryInfo?.badgeText || 'text-slate-700'}`}
          >
            {categoryInfo?.name}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% Free & Secure Client Processing
          </span>
        </div>

        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">{tool.name}</h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed font-sans">{tool.description}</p>
      </div>

      {/* Header Ad Placement */}
      <AdBanner slot="headerBanner" config={adConfig} />

      {/* Tool Interactive Runner Container */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
            <h3 className="font-heading font-extrabold text-base text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" /> Interactive Tool Workspace
            </h3>
            <span className="text-xs text-slate-400 font-mono">ID: #{tool.id}</span>
          </div>

          {/* Render Active Tool Runner */}
          {renderToolRunner()}
        </div>

        {/* Sidebar Space */}
        <div className="space-y-6">
          <AdBanner slot="toolSidebar" config={adConfig} />

          {/* Quick How to Use Guide */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-3">
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-indigo-600" /> How to Use This Tool
            </h4>
            <ol className="text-xs text-slate-600 space-y-2 list-decimal pl-4 leading-relaxed font-sans">
              <li>Upload your input file or enter data parameters into the configuration box.</li>
              <li>Select desired transformation formats or options.</li>
              <li>Click the action button to process instantly inside your browser.</li>
              <li>Copy output results or download processed files directly.</li>
            </ol>
          </div>
        </div>
      </div>

      {/* In-Article Ad Banner */}
      <AdBanner slot="inArticle" config={adConfig} />

      {/* Related Tools Grid */}
      <div className="space-y-4">
        <h3 className="font-heading text-lg font-bold text-slate-900">
          Related Utilities in {categoryInfo?.name}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {relatedTools.map((rel) => (
            <div
              key={rel.id}
              onClick={() => onSelectTool(rel)}
              className="pro-card p-4 rounded-xl border border-slate-200/80 hover:border-slate-300 transition-all cursor-pointer space-y-2"
            >
              <h4 className="font-heading font-bold text-sm text-slate-900 hover:text-indigo-600 line-clamp-1">
                {rel.name}
              </h4>
              <p className="text-xs text-slate-500 line-clamp-2 font-sans">{rel.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
