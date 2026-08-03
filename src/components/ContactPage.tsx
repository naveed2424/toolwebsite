import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare, PhoneCall, MapPin } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all required fields.');
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3.5 py-1 rounded-full border border-indigo-200">
          Get in Touch
        </span>
        <h1 className="font-heading text-3xl font-extrabold text-slate-900">Contact Editorial & Support Desk</h1>
        <p className="text-sm text-slate-600 font-sans">
          Have questions about our 100+ tools, blog partnerships, or technical feedback? Send us a message below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="pro-card p-6 rounded-2xl border border-slate-200/80 space-y-3">
          <Mail className="w-6 h-6 text-indigo-600" />
          <h3 className="font-heading font-bold text-slate-900 text-sm">Email Us Directly</h3>
          <p className="text-xs text-slate-700 font-mono">editorial@aitoolshub.com</p>
          <p className="text-[11px] text-slate-400 font-sans">Response within 24 business hours.</p>
        </div>

        <div className="pro-card p-6 rounded-2xl border border-slate-200/80 space-y-3">
          <MessageSquare className="w-6 h-6 text-indigo-600" />
          <h3 className="font-heading font-bold text-slate-900 text-sm">Feedback & Tool Requests</h3>
          <p className="text-xs text-slate-600 font-sans">Suggest new features or report tool issues directly to our dev desk.</p>
        </div>

        <div className="pro-card p-6 rounded-2xl border border-slate-200/80 space-y-3">
          <MapPin className="w-6 h-6 text-emerald-600" />
          <h3 className="font-heading font-bold text-slate-900 text-sm">Global Headquarters</h3>
          <p className="text-xs text-slate-600 font-sans">AI Tools Hub Media LLC, San Francisco, CA</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-xs">
        {isSubmitted ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-slate-900">Message Received!</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto font-sans">
              Thank you, <span className="font-semibold text-slate-900">{formData.name}</span>. Our editorial and support desk will review your inquiry regarding <span className="font-semibold">{formData.subject}</span> and reply shortly.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold font-heading transition-colors"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 font-sans">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-indigo-600 font-sans"
                  placeholder="e.g. Sarah Jenkins"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 font-sans">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-indigo-600 font-sans"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 font-sans">Subject Topic</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-indigo-600 font-sans"
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Tool Feedback / Bug Report">Tool Feedback / Bug Report</option>
                <option value="Editorial & Blog Partnerships">Editorial & Blog Partnerships</option>
                <option value="AdSense & Sponsorships">AdSense & Sponsorships</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 font-sans">Your Message *</label>
              <textarea
                rows={5}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-3 text-sm rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-indigo-600 font-sans"
                placeholder="How can we help you today?..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-heading font-bold rounded-xl text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" /> Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
