import React from 'react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6 text-slate-800">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="font-heading text-3xl font-extrabold text-slate-900">Privacy Policy</h1>
        <p className="text-xs text-slate-500 mt-1 font-sans">Last Updated: August 3, 2026 • Compliant with GDPR, CCPA, and Google AdSense Guidelines</p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed font-sans">
        <section className="space-y-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <h2 className="font-heading text-lg font-bold text-slate-900">1. Information We Collect</h2>
          <p className="text-slate-600">
            AI Tools Hub operates with a strictly privacy-first philosophy. All 100+ browser tools (PDF converters, image resizers, code formatters, and calculators) process your files locally on your device via client-side WebAssembly and JavaScript. We do not store, copy, or transmit your uploaded documents to any remote server.
          </p>
        </section>

        <section className="space-y-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <h2 className="font-heading text-lg font-bold text-slate-900">2. Cookies & Advertising (Google AdSense)</h2>
          <p className="text-slate-600">
            We use Google AdSense and third-party advertising partners to display advertisements. Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to our website or other websites.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
            <li>Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our sites and/or other sites on the Internet.</li>
            <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer" className="text-indigo-600 font-semibold underline">Google Ads Settings</a>.</li>
          </ul>
        </section>

        <section className="space-y-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <h2 className="font-heading text-lg font-bold text-slate-900">3. Log Files & Web Analytics</h2>
          <p className="text-slate-600">
            Like most standard websites, we use log files that include internet protocol (IP) addresses, browser type, internet service provider (ISP), referring/exit pages, platform type, and date/time stamps. This data is non-personally identifiable and used exclusively to analyze trends and administer the site.
          </p>
        </section>

        <section className="space-y-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <h2 className="font-heading text-lg font-bold text-slate-900">4. Contact Us</h2>
          <p className="text-slate-600">
            If you have questions regarding this Privacy Policy, please reach out through our official <a href="#contact" className="text-indigo-600 underline font-semibold">Contact Page</a>.
          </p>
        </section>
      </div>
    </div>
  );
};
