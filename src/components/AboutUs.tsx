import React from 'react';
import { ShieldCheck, Award, Zap, Users } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-8 px-4">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3.5 py-1 rounded-full border border-indigo-200">
          Journalistic Editorial & Engineering Desk
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
          About AI Tools Hub & Daily Tech Digest
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-sans">
          Empowering global creators, software engineers, and digital marketers with over 100 client-side web tools and daily fact-based AI technology journalism.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="pro-card p-6 rounded-2xl border border-slate-200/80 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="font-heading text-lg font-bold text-slate-900">Zero-Install Speed</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-sans">
            All 100+ utilities run directly inside your web browser tab using modern WebAssembly and HTML5 engines for instant execution.
          </p>
        </div>

        <div className="pro-card p-6 rounded-2xl border border-slate-200/80 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-heading text-lg font-bold text-slate-900">Absolute Privacy</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-sans">
            Your PDF documents, photos, and code payloads are processed locally on your device. We never store or transmit your sensitive files.
          </p>
        </div>

        <div className="pro-card p-6 rounded-2xl border border-slate-200/80 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-heading text-lg font-bold text-slate-900">Journalistic Standards</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-sans">
            Our daily blog posts strictly follow professional SEO and editorial guidelines, covering verified breaking news, statistical data, and expert insights.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-xs space-y-4">
        <h2 className="font-heading text-xl font-bold text-slate-900">Our Editorial Mission</h2>
        <p className="text-sm text-slate-600 leading-relaxed font-sans">
          At AI Tools Hub, we believe high-performance software utilities should be universally accessible without paywalls, intrusive tracking, or heavy software downloads. Our engineering desk maintains over 100 specialized converters, calculators, and developer tools across 6 core categories.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed font-sans">
          Simultaneously, our daily research desk utilizes state-of-the-art Google Search Grounding and neural AI models to analyze breaking developments in artificial intelligence, delivering comprehensive 2,000+ word deep-dives that empower businesses to stay ahead.
        </p>
      </div>
    </div>
  );
};
