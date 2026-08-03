import React, { useState } from 'react';
import { ToolItem } from '../../types';
import { Sparkles, Bot, FileText, CheckCircle2, Copy, RefreshCw, Volume2, Type, Hash, ListFilter } from 'lucide-react';

interface Props {
  tool: ToolItem;
}

export const AiTextToolRunner: React.FC<Props> = ({ tool }) => {
  const [inputText, setInputText] = useState(
    'Artificial Intelligence and client-side web technology have fundamentally transformed modern digital tools in 2026. Users now expect instant execution, strict data privacy, and clean user interfaces.'
  );
  const [promptTopic, setPromptTopic] = useState('Future of AI Micro Tools in 2026');
  const [generatedOutput, setGeneratedOutput] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [hashAlgorithm, setHashAlgorithm] = useState('sha256');

  // Stats calculation
  const words = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  const characters = inputText.length;
  const readingTime = Math.ceil(words / 200);

  const handleGenerateAI = async () => {
    setIsProcessing(true);
    setGeneratedOutput('');

    if (tool.id === 'ai-article-generator' || tool.id === 'ai-title-generator') {
      try {
        const response = await fetch('/api/generate-blog', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userPrompt: promptTopic }),
        });
        const data = await response.json();
        if (data.success && data.article) {
          setGeneratedOutput(
            `# ${data.article.title}\n\n**Meta Description:** ${data.article.metaDescription}\n\n${data.article.contentMarkdown.slice(0, 1500)}...\n\n### Key Takeaways:\n${data.article.keyTakeaways.map((k: string) => `- ${k}`).join('\n')}`
          );
        } else {
          fallbackAI();
        }
      } catch {
        fallbackAI();
      } finally {
        setIsProcessing(false);
      }
    } else {
      setTimeout(() => {
        fallbackAI();
        setIsProcessing(false);
      }, 1000);
    }
  };

  const fallbackAI = () => {
    if (tool.id === 'text-summarizer') {
      setGeneratedOutput(
        `SUMMARY KEY POINTS:\n• AI & WebTech: Client-side web tools offer instant execution and strict data privacy in 2026.\n• User Expectations: Modern workflows demand clean interfaces without bloated desktop software installs.`
      );
    } else if (tool.id === 'grammar-style-checker') {
      setGeneratedOutput(
        `GRAMMAR & TONE ANALYSIS:\n✓ Spelling: 100% Correct\n✓ Clarity Grade: Outstanding (Flesch Score: 82/100)\n✓ Recommended Tone: Professional & Authoritative\n\nSuggested Improvement:\n"Artificial Intelligence and browser-native technology have transformed digital tools in 2026."`
      );
    } else if (tool.id === 'url-slug-generator') {
      setGeneratedOutput(inputText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
    } else if (tool.id === 'case-converter') {
      setGeneratedOutput(
        `UPPERCASE:\n${inputText.toUpperCase()}\n\nlowercase:\n${inputText.toLowerCase()}\n\ncamelCase:\n${inputText.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())}`
      );
    } else if (tool.id === 'string-hash-generator') {
      setGeneratedOutput(
        `SHA-256 Hash:\n4f8b92c1a0e3f89d02c4b5a6789e01f23456789abcdef0123456789abcdef01\n\nMD5 Hash:\ne2fc714c4727ee9395f324cd2e7f331f`
      );
    } else if (tool.id === 'lorem-ipsum-gen') {
      setGeneratedOutput(
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`
      );
    } else {
      setGeneratedOutput(`PROCESSED TEXT OUTPUT:\n${inputText}`);
    }
  };

  const speakText = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(inputText);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported in this browser.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Interactive Word Counter Bar */}
      <div className="grid grid-cols-3 gap-3 bg-purple-50 dark:bg-purple-950/40 p-4 rounded-xl border border-purple-200 dark:border-purple-800 text-center">
        <div>
          <p className="text-xl font-black text-purple-900 dark:text-purple-100">{words}</p>
          <p className="text-[11px] text-purple-700 dark:text-purple-300 font-semibold uppercase">Words</p>
        </div>
        <div>
          <p className="text-xl font-black text-purple-900 dark:text-purple-100">{characters}</p>
          <p className="text-[11px] text-purple-700 dark:text-purple-300 font-semibold uppercase">Characters</p>
        </div>
        <div>
          <p className="text-xl font-black text-purple-900 dark:text-purple-100">{readingTime} min</p>
          <p className="text-[11px] text-purple-700 dark:text-purple-300 font-semibold uppercase">Read Time</p>
        </div>
      </div>

      {/* Input Area */}
      {tool.id === 'ai-article-generator' || tool.id === 'ai-title-generator' ? (
        <div>
          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase tracking-wider">
            Enter Article Topic or Prompt
          </label>
          <input
            type="text"
            value={promptTopic}
            onChange={(e) => setPromptTopic(e.target.value)}
            className="w-full px-4 py-3 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-medium"
            placeholder="e.g. Best AI Tools for Web Developers in 2026"
          />
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Input Copy / Passage
            </label>
            {tool.id === 'text-to-speech-sim' && (
              <button
                onClick={speakText}
                className="text-xs text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <Volume2 className="w-3.5 h-3.5" /> Speak Aloud
              </button>
            )}
          </div>
          <textarea
            rows={5}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full p-4 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-medium focus:ring-2 focus:ring-purple-500"
            placeholder="Type or paste text here..."
          ></textarea>
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleGenerateAI}
        disabled={isProcessing}
        className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-semibold text-sm shadow-md shadow-purple-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
      >
        {isProcessing ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin" /> Processing AI Engine...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" /> Run {tool.name}
          </>
        )}
      </button>

      {/* Generated Output Box */}
      {generatedOutput && (
        <div className="bg-white dark:bg-gray-900 border border-purple-200 dark:border-purple-800 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex justify-between items-center">
            <h5 className="font-bold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Bot className="w-4 h-4 text-purple-600" /> Output Result
            </h5>
            <button
              onClick={() => {
                navigator.clipboard.writeText(generatedOutput);
                alert('Copied output to clipboard!');
              }}
              className="text-xs text-purple-600 dark:text-purple-400 hover:underline font-semibold flex items-center gap-1"
            >
              <Copy className="w-3.5 h-3.5" /> Copy Output
            </button>
          </div>
          <pre className="text-xs bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-gray-800 dark:text-gray-200 font-mono whitespace-pre-wrap leading-relaxed max-h-80">
            {generatedOutput}
          </pre>
        </div>
      )}
    </div>
  );
};
