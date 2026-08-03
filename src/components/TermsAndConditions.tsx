import React from 'react';

export const TermsAndConditions: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6 text-slate-800">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="font-heading text-3xl font-extrabold text-slate-900">Terms & Conditions</h1>
        <p className="text-xs text-slate-500 mt-1 font-sans">Effective Date: August 3, 2026</p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed font-sans">
        <section className="space-y-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <h2 className="font-heading text-lg font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p className="text-slate-600">
            By accessing and using AI Tools Hub & Daily Tech Digest ("Website"), you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, please refrain from using our service.
          </p>
        </section>

        <section className="space-y-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <h2 className="font-heading text-lg font-bold text-slate-900">2. Use of Online Tools & Utilities</h2>
          <p className="text-slate-600">
            Our 100+ web utilities (including PDF converters, image formatters, calculators, and AI generators) are provided for lawful personal and commercial use. You agree not to use the tools to process malicious code, illegal materials, or violate third-party intellectual property.
          </p>
        </section>

        <section className="space-y-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <h2 className="font-heading text-lg font-bold text-slate-900">3. Intellectual Property</h2>
          <p className="text-slate-600">
            All original website design, brand graphics, editorial blog content, and tool interfaces are owned by AI Tools Hub and protected under global copyright laws.
          </p>
        </section>

        <section className="space-y-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <h2 className="font-heading text-lg font-bold text-slate-900">4. Limitation of Liability</h2>
          <p className="text-slate-600">
            The website and its tools are provided on an "as is" and "as available" basis. While we strive for 100% mathematical accuracy and document integrity, AI Tools Hub shall not be held liable for indirect damages or data loss resulting from the use of our calculators or file converters.
          </p>
        </section>
      </div>
    </div>
  );
};
