import React, { useState } from 'react';
import { FileSpreadsheet, Bot, Copy, Download, X } from 'lucide-react';
import { TOOLS_DATA } from '../data/toolsData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SitemapModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'xml' | 'robots'>('xml');

  if (!isOpen) return null;

  const siteUrl = 'https://aitoolshub.com';
  const currentDate = new Date().toISOString().split('T')[0];

  const xmlSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${siteUrl}/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
${TOOLS_DATA.map(
  (t) => `  <url>
    <loc>${siteUrl}/#tool-${t.id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
).join('\n')}
</urlset>`;

  const robotsTxt = `# Robots.txt for AI Tools Hub & Daily Tech Digest
User-agent: *
Allow: /
Disallow: /api/

# Sitemap Location
Sitemap: ${siteUrl}/sitemap.xml`;

  const activeContent = activeTab === 'xml' ? xmlSitemap : robotsTxt;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 font-sans">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-3xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-base text-slate-900">
                SEO Indexing Engine: Sitemap & Robots.txt
              </h3>
              <p className="text-xs text-slate-500 font-sans">
                Google Search Console & Bing Webmaster Indexing Files ({TOOLS_DATA.length + 5} URLs Indexed)
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-200 text-slate-500 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 bg-slate-100 px-5 pt-2 gap-2">
          <button
            onClick={() => setActiveTab('xml')}
            className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-colors flex items-center gap-1.5 cursor-pointer font-heading ${
              activeTab === 'xml'
                ? 'bg-white text-indigo-600 border-t-2 border-indigo-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" /> sitemap.xml
          </button>
          <button
            onClick={() => setActiveTab('robots')}
            className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-colors flex items-center gap-1.5 cursor-pointer font-heading ${
              activeTab === 'robots'
                ? 'bg-white text-indigo-600 border-t-2 border-indigo-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Bot className="w-3.5 h-3.5" /> robots.txt
          </button>
        </div>

        {/* Content Code Output */}
        <div className="p-5 flex-1 overflow-y-auto bg-slate-950">
          <pre className="text-xs font-mono text-indigo-300 leading-relaxed whitespace-pre-wrap select-all">
            {activeContent}
          </pre>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center">
          <button
            onClick={() => {
              navigator.clipboard.writeText(activeContent);
              alert(`${activeTab === 'xml' ? 'sitemap.xml' : 'robots.txt'} copied to clipboard!`);
            }}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold font-heading rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Copy className="w-4 h-4" /> Copy Code
          </button>
          <button
            onClick={() => {
              const element = document.createElement('a');
              const file = new Blob([activeContent], { type: 'text/plain' });
              element.href = URL.createObjectURL(file);
              element.download = activeTab === 'xml' ? 'sitemap.xml' : 'robots.txt';
              document.body.appendChild(element);
              element.click();
              document.body.removeChild(element);
            }}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold font-heading rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
          >
            <Download className="w-4 h-4" /> Download {activeTab === 'xml' ? 'sitemap.xml' : 'robots.txt'}
          </button>
        </div>
      </div>
    </div>
  );
};
