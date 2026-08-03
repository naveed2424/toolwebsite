import React, { useState } from 'react';
import { BlogArticle, AdSenseConfig } from '../types';
import { AdBanner } from './AdBanner';
import { ArrowLeft, Clock, Calendar, User, Share2, Copy, Bookmark, CheckCircle2, ExternalLink, HelpCircle, Sparkles } from 'lucide-react';

interface Props {
  article: BlogArticle;
  onBack: () => void;
  adConfig: AdSenseConfig;
}

export const BlogDetailView: React.FC<Props> = ({ article, onBack, adConfig }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(article.contentMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-indigo-600 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-2xs hover:bg-slate-50 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-slate-500" /> Back to Tech Digest
        </button>

        <button
          onClick={handleCopyMarkdown}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 px-3.5 py-2 rounded-xl border border-indigo-200 cursor-pointer hover:bg-indigo-100 transition-colors shadow-2xs"
        >
          {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-indigo-600" />}
          {copied ? 'Markdown Copied!' : 'Copy Article Markdown'}
        </button>
      </div>

      {/* Headline & Metadata */}
      <div className="space-y-4 text-center sm:text-left">
        <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
          <span className="text-xs font-bold uppercase tracking-wider bg-slate-900 text-white px-3 py-1 rounded-full">
            {article.category}
          </span>
          <span className="text-xs text-slate-500 font-medium flex items-center gap-1 font-sans">
            <Clock className="w-3.5 h-3.5 text-slate-400" /> {article.readTime}
          </span>
          <span className="text-xs text-slate-500 font-medium flex items-center gap-1 font-sans">
            <Calendar className="w-3.5 h-3.5 text-slate-400" /> {article.publishedAt}
          </span>
        </div>

        <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
          {article.title}
        </h1>

        <p className="text-base text-slate-600 leading-relaxed italic border-l-4 border-indigo-600 pl-4 py-1 font-sans">
          {article.excerpt}
        </p>

        {/* SEO Meta Box Verification */}
        <div className="bg-slate-100/80 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1 font-mono">
          <p><span className="font-bold text-indigo-700">SEO Meta Title:</span> {article.metaTitle}</p>
          <p><span className="font-bold text-indigo-700">Primary Keyword:</span> {article.primaryKeyword}</p>
          <p><span className="font-bold text-indigo-700">Meta Description:</span> {article.metaDescription}</p>
        </div>
      </div>

      {/* Featured Image with ALT Text Badge */}
      {article.featuredImage && (
        <div className="space-y-2">
          <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs">
            <img
              src={article.featuredImage.url}
              alt={article.featuredImage.alt}
              className="w-full h-72 sm:h-96 object-cover"
            />
            <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-xs text-white text-[10px] font-mono px-3 py-1.5 rounded-lg border border-slate-700">
              <span className="text-indigo-300 font-bold">ALT Text:</span> "{article.featuredImage.alt}"
            </div>
          </div>
          <p className="text-xs text-center text-slate-500 italic font-sans">{article.featuredImage.caption}</p>
        </div>
      )}

      {/* Header Ad Banner */}
      <AdBanner slot="headerBanner" config={adConfig} />

      {/* Table of Contents */}
      {article.tableOfContents && article.tableOfContents.length > 0 && (
        <div className="bg-indigo-50/70 rounded-2xl p-6 border border-indigo-200 space-y-3">
          <h3 className="font-heading font-bold text-sm text-indigo-950 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" /> Table of Contents
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-indigo-900 font-sans">
            {article.tableOfContents.map((toc, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="font-mono text-indigo-600 font-bold">0{idx + 1}.</span> {toc}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Key Takeaways */}
      {article.keyTakeaways && article.keyTakeaways.length > 0 && (
        <div className="bg-emerald-50/80 rounded-2xl p-6 border border-emerald-200 space-y-3">
          <h3 className="font-heading font-bold text-sm text-emerald-950 uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Key Takeaways & Summary
          </h3>
          <ul className="space-y-2 text-xs text-emerald-900 leading-relaxed font-sans">
            {article.keyTakeaways.map((take, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold mt-0.5">•</span>
                <span>{take}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Article Body with In-Content Images */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6 text-sm text-slate-800 leading-relaxed font-sans">
        <div className="whitespace-pre-wrap">{article.contentMarkdown}</div>

        {/* In-Content Images Placement */}
        {article.inContentImages && article.inContentImages.length > 0 && (
          <div className="space-y-8 my-8 pt-6 border-t border-slate-100">
            <h3 className="font-heading text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
              Article Media & In-Content Visuals
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {article.inContentImages.map((img, idx) => (
                <div key={idx} className="space-y-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <div className="relative rounded-xl overflow-hidden h-48">
                    <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 bg-slate-900/90 text-white text-[9px] font-mono px-2 py-1 rounded">
                      Placement: {img.placement}
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-600 space-y-0.5">
                    <p><span className="font-bold text-indigo-700">ALT Text:</span> "{img.alt}"</p>
                    <p className="italic">{img.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Internal Links Suggestions */}
      {article.internalLinks && article.internalLinks.length > 0 && (
        <div className="bg-slate-100/90 rounded-2xl p-6 border border-slate-200 space-y-3">
          <h3 className="font-heading font-bold text-xs text-slate-800 uppercase tracking-wider">
            Internal Website Tool Recommendations
          </h3>
          <div className="flex flex-wrap gap-3">
            {article.internalLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-white px-3.5 py-2 rounded-xl border border-slate-200 hover:border-indigo-300 shadow-2xs hover:underline transition-all"
              >
                {link.anchor}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* External Authority Sources */}
      {article.externalSources && article.externalSources.length > 0 && (
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-3">
          <h3 className="font-heading font-bold text-xs text-slate-700 uppercase tracking-wider">
            Authoritative References & Citations
          </h3>
          <div className="flex flex-wrap gap-4 text-xs">
            {article.externalSources.map((ext, idx) => (
              <a
                key={idx}
                href={ext.url}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600 font-bold hover:underline flex items-center gap-1"
              >
                {ext.name} <ExternalLink className="w-3 h-3 text-indigo-500" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* In-Article Ad Placement */}
      <AdBanner slot="inArticle" config={adConfig} />

      {/* FAQ Section */}
      {article.faq && article.faq.length > 0 && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="font-heading text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-600" /> Frequently Asked Questions (FAQ)
          </h3>
          <div className="space-y-4">
            {article.faq.map((q, idx) => (
              <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
                <h4 className="font-heading font-bold text-sm text-slate-900">{q.question}</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">{q.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Call To Action Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white p-8 rounded-2xl text-center space-y-4 shadow-lg border border-slate-800">
        <h3 className="font-heading text-2xl font-extrabold text-white">Ready to Supercharge Your Daily Workflow?</h3>
        <p className="text-sm text-slate-300 max-w-xl mx-auto font-sans">
          {article.ctaText || 'Explore our 100+ free online AI tools, PDF converters, calculators, and SEO utilities.'}
        </p>
        <button
          onClick={onBack}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-heading font-bold rounded-xl text-xs shadow-md cursor-pointer transition-colors"
        >
          Browse All 100+ Free Tools
        </button>
      </div>
    </div>
  );
};
