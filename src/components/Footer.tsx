import React from 'react';
import { Sparkles, ShieldCheck, Heart } from 'lucide-react';

interface Props {
  setActiveTab: (tab: 'tools' | 'blog' | 'about' | 'privacy' | 'terms' | 'disclaimer' | 'contact') => void;
  onOpenSitemap: () => void;
}

export const Footer: React.FC<Props> = ({ setActiveTab, onOpenSitemap }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-20 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-bold shadow-sm">
                <Sparkles className="w-4 h-4 text-indigo-200" />
              </div>
              <span className="font-heading font-extrabold text-lg text-white tracking-tight">
                AITools <span className="text-indigo-400">Hub</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Your comprehensive browser-native tool suite with 100+ utilities for PDF conversion, image editing, calculation, developer code, and daily AI tech journalism.
            </p>
          </div>

          {/* Quick Category Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white uppercase tracking-wider text-[11px]">
              Tool Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('tools')} className="hover:text-indigo-300 transition-colors">
                  PDF Converters & Tools
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('tools')} className="hover:text-indigo-300 transition-colors">
                  Image Editing & Converters
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('tools')} className="hover:text-indigo-300 transition-colors">
                  Calculators & Measurement
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('tools')} className="hover:text-indigo-300 transition-colors">
                  AI & Text Utilities
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('tools')} className="hover:text-indigo-300 transition-colors">
                  Code & Developer Tools
                </button>
              </li>
            </ul>
          </div>

          {/* Compliance & AdSense Policy Pages */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white uppercase tracking-wider text-[11px]">
              AdSense & Policies
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-indigo-300 transition-colors font-medium">
                  About Us & Editorial Mission
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('privacy')} className="hover:text-indigo-300 transition-colors font-medium">
                  Privacy Policy (GDPR / CCPA)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('terms')} className="hover:text-indigo-300 transition-colors font-medium">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('disclaimer')} className="hover:text-indigo-300 transition-colors font-medium">
                  Disclaimer & Financial Notice
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('contact')} className="hover:text-indigo-300 transition-colors font-medium">
                  Contact Editorial Desk
                </button>
              </li>
            </ul>
          </div>

          {/* SEO & Sitemap indexing */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white uppercase tracking-wider text-[11px]">
              SEO Indexing & Digest
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Updated daily with fresh 2,000+ word AI research blogs backed by Google Search Grounding.
            </p>
            <button
              onClick={onOpenSitemap}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 text-indigo-300 font-bold text-xs rounded-xl border border-slate-700 hover:bg-slate-700 hover:text-white transition-all cursor-pointer mt-2 shadow-2xs"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" /> View XML Sitemap & Robots.txt
            </button>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 AI Tools Hub Media LLC. All rights reserved. Built for ultra-fast browser execution.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for SEO & AdSense approval standards.
          </p>
        </div>
      </div>
    </footer>
  );
};
