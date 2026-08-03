import React, { useState } from 'react';
import { BlogArticle, AdSenseConfig } from '../types';
import { BlogDetailView } from './BlogDetailView';
import { AdBanner } from './AdBanner';
import { Sparkles, Bot, Clock, Calendar, Search, RefreshCw, CheckCircle2, ChevronRight, BookOpen, Flame } from 'lucide-react';

interface Props {
  articles: BlogArticle[];
  onAddNewArticle: (article: BlogArticle) => void;
  adConfig: AdSenseConfig;
}

export const BlogHub: React.FC<Props> = ({ articles, onAddNewArticle, adConfig }) => {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [topicPrompt, setTopicPrompt] = useState("Write today's best and trending topic");
  const [isGenerating, setIsGenerating] = useState(false);
  const [genStatus, setGenStatus] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleGenerateTodayTrend = async () => {
    setIsGenerating(true);
    setGenStatus('1/4 Connecting to Google Search Grounding for live trends...');

    try {
      setTimeout(() => setGenStatus('2/4 Analyzing breaking AI & tech developments...'), 1500);
      setTimeout(() => setGenStatus('3/4 Drafting 2,000+ word SEO article with H2/H3 headings...'), 3500);
      setTimeout(() => setGenStatus('4/4 Adding 4 in-content images, ALT text, and internal links...'), 5500);

      const response = await fetch('/api/generate-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userPrompt: topicPrompt }),
      });

      const data = await response.json();

      if (data.success && data.article) {
        onAddNewArticle(data.article);
        setSelectedArticle(data.article);
      } else {
        alert('Failed to generate daily article: ' + (data.error || 'Server error'));
      }
    } catch (err: any) {
      alert('Error generating daily article: ' + err.message);
    } finally {
      setIsGenerating(false);
      setGenStatus('');
    }
  };

  const filteredArticles = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedArticle) {
    return <BlogDetailView article={selectedArticle} onBack={() => setSelectedArticle(null)} adConfig={adConfig} />;
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-10">
      {/* Header Title */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3.5 py-1 rounded-full border border-indigo-200">
          <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse" /> Daily Tech & AI Trend Journalism Desk
        </span>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Today's Best & Trending Tech AI Digest
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
          Daily researched 2,000+ word in-depth articles on artificial intelligence, web converters, SEO strategies, and digital productivity.
        </p>
      </div>

      {/* ⚡ ONE-CLICK DAILY TRENDING AI BLOG GENERATOR BOX */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-center gap-3.5 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300 shadow-inner">
            <Sparkles className="w-6 h-6 animate-spin text-indigo-300" />
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold text-white">Generate Today's Best & Trending Topic Blog</h3>
            <p className="text-xs text-slate-300 font-sans">
              Powered by Gemini 3.6 Flash + Live Google Search Grounding (Writes 2,000+ words, 5 images with ALT text, FAQs, and SEO links)
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 relative z-10">
          <input
            type="text"
            value={topicPrompt}
            onChange={(e) => setTopicPrompt(e.target.value)}
            className="flex-1 px-4 py-3 text-sm rounded-xl border border-slate-700 bg-slate-950/80 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400 font-medium"
            placeholder="e.g. Write today's best and trending topic"
          />
          <button
            onClick={handleGenerateTodayTrend}
            disabled={isGenerating}
            className="py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-heading font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer whitespace-nowrap"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-indigo-200" /> Generating Blog...
              </>
            ) : (
              <>
                <Bot className="w-4 h-4 text-indigo-200" /> Generate & Publish Blog
              </>
            )}
          </button>
        </div>

        {/* Live Generation Progress Status */}
        {isGenerating && (
          <div className="bg-slate-950/90 border border-indigo-500/40 p-4 rounded-xl flex items-center gap-3 font-mono text-xs text-indigo-200">
            <RefreshCw className="w-5 h-5 text-indigo-400 animate-spin" />
            <span>{genStatus}</span>
          </div>
        )}
      </div>

      {/* Header Ad Placement */}
      <AdBanner slot="headerBanner" config={adConfig} />

      {/* Search & Articles Catalog */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-slate-200/80 pb-4">
          <h2 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-indigo-600" /> Published Articles ({filteredArticles.length})
          </h2>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 shadow-2xs font-medium"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredArticles.map((art) => (
            <div
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="group pro-card rounded-3xl border border-slate-200/80 overflow-hidden hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                {art.featuredImage && (
                  <div className="relative h-52 overflow-hidden bg-slate-100">
                    <img
                      src={art.featuredImage.url}
                      alt={art.featuredImage.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg">
                      {art.category}
                    </div>
                  </div>
                )}

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-medium font-sans">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" /> {art.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" /> {art.publishedAt}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-sans">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex justify-between items-center text-xs font-bold text-indigo-600 group-hover:text-indigo-700">
                <span>Read Full 2,000+ Word Article</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
