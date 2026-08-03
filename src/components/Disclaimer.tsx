import React from 'react';

export const Disclaimer: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6 text-slate-800">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="font-heading text-3xl font-extrabold text-slate-900">Disclaimer</h1>
        <p className="text-xs text-slate-500 mt-1 font-sans">Updated: August 3, 2026</p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed font-sans">
        <section className="space-y-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <h2 className="font-heading text-lg font-bold text-slate-900">Financial & Calculation Disclaimer</h2>
          <p className="text-slate-600">
            The financial calculators (mortgage, loan EMI, compound interest, AdSense revenue estimators) provided on AI Tools Hub are designed for educational and estimation purposes only. Results do not constitute official financial advice or bank guarantees. Always consult a qualified certified financial advisor before making major investment decisions.
          </p>
        </section>

        <section className="space-y-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <h2 className="font-heading text-lg font-bold text-slate-900">Health & BMI Disclaimer</h2>
          <p className="text-slate-600">
            BMI and calorie/macro calculators offer general statistical estimations based on standard formulas. They are not medical diagnostic tools. Always consult a licensed medical professional for medical guidance.
          </p>
        </section>

        <section className="space-y-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <h2 className="font-heading text-lg font-bold text-slate-900">External Links & Affiliate Disclosure</h2>
          <p className="text-slate-600">
            Our blog articles and tool guides may contain external hyper-links to third-party web pages. While we strive to cite authoritative sources (such as Google DeepMind, W3C, and MIT Tech Review), we do not control or accept responsibility for third-party content or privacy practices.
          </p>
        </section>
      </div>
    </div>
  );
};
