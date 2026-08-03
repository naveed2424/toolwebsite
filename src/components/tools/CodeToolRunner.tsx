import React, { useState } from 'react';
import { ToolItem } from '../../types';
import { Braces, Code, Terminal, Key, SearchCode, Palette, Copy, CheckCircle2, RefreshCw } from 'lucide-react';

interface Props {
  tool: ToolItem;
}

export const CodeToolRunner: React.FC<Props> = ({ tool }) => {
  const [inputCode, setInputCode] = useState<string>(
    '{\n  "status": "success",\n  "app": "AI Tools Hub",\n  "category": "Developer Utilities",\n  "version": 2026,\n  "features": ["JSON", "JWT", "Minifier", "Regex"]\n}'
  );
  const [formattedOutput, setFormattedOutput] = useState<string>('');
  const [jwtToken, setJwtToken] = useState<string>(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFmemFsNCIsImFkbWluIjp0cnVlLCJpYXQiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  );
  const [regexPattern, setRegexPattern] = useState<string>('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
  const [regexTestText, setRegexTestText] = useState<string>('Contact our editorial desk at support@aitoolshub.com or info@domain.org');
  const [colorHex, setColorHex] = useState<string>('#3B82F6');
  const [shadowBlur, setShadowBlur] = useState<number>(20);
  const [shadowSpread, setShadowSpread] = useState<number>(5);
  const [uuidList, setUuidList] = useState<string[]>([]);

  const handleExecuteCodeTool = () => {
    try {
      if (tool.id === 'json-formatter-validator') {
        const parsed = JSON.parse(inputCode);
        setFormattedOutput(JSON.stringify(parsed, null, 2));
      } else if (tool.id === 'css-minifier') {
        setFormattedOutput(
          inputCode
            .replace(/\s+/g, ' ')
            .replace(/\/\*[\s\S]*?\*\//g, '')
            .replace(/\s*([{}:;,])\s*/g, '$1')
            .trim()
        );
      } else if (tool.id === 'url-encoder-decoder') {
        setFormattedOutput(`ENCODED:\n${encodeURIComponent(inputCode)}\n\nDECODED:\n${decodeURIComponent(inputCode)}`);
      } else if (tool.id === 'html-encoder-decoder') {
        setFormattedOutput(
          inputCode
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
        );
      } else if (tool.id === 'uuid-v4-generator') {
        const generated = Array.from({ length: 5 }, () => crypto.randomUUID());
        setUuidList(generated);
        setFormattedOutput(generated.join('\n'));
      } else if (tool.id === 'jwt-decoder') {
        try {
          const parts = jwtToken.split('.');
          if (parts.length === 3) {
            const header = JSON.parse(atob(parts[0]));
            const payload = JSON.parse(atob(parts[1]));
            setFormattedOutput(`HEADER:\n${JSON.stringify(header, null, 2)}\n\nPAYLOAD:\n${JSON.stringify(payload, null, 2)}`);
          } else {
            setFormattedOutput('Invalid JWT Token format. Expected 3 dot-separated parts.');
          }
        } catch {
          setFormattedOutput('Error decoding JWT base64 payload.');
        }
      } else {
        setFormattedOutput(`// Formatted Code Output\n${inputCode}`);
      }
    } catch (err: any) {
      setFormattedOutput(`Syntax Error: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. JWT Decoder */}
      {tool.id === 'jwt-decoder' && (
        <div>
          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase tracking-wider">
            Paste JWT Token
          </label>
          <textarea
            rows={3}
            value={jwtToken}
            onChange={(e) => setJwtToken(e.target.value)}
            className="w-full p-3 text-xs font-mono rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          ></textarea>
        </div>
      )}

      {/* 2. Regex Tester */}
      {tool.id === 'regex-tester' && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase">Regex Pattern</label>
            <input
              type="text"
              value={regexPattern}
              onChange={(e) => setRegexPattern(e.target.value)}
              className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase">Test Text</label>
            <textarea
              rows={3}
              value={regexTestText}
              onChange={(e) => setRegexTestText(e.target.value)}
              className="w-full p-3 text-xs font-mono rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            ></textarea>
          </div>
        </div>
      )}

      {/* 3. CSS Box Shadow Builder */}
      {tool.id === 'css-box-shadow-gen' && (
        <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 space-y-4">
          <div className="flex justify-center p-8 bg-white dark:bg-gray-900 rounded-xl">
            <div
              className="w-32 h-32 rounded-2xl bg-amber-500 flex items-center justify-center font-bold text-white text-xs"
              style={{ boxShadow: `0px 10px ${shadowBlur}px ${shadowSpread}px rgba(0,0,0,0.25)` }}
            >
              Box Shadow
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Blur Radius ({shadowBlur}px)</label>
              <input
                type="range"
                min={0}
                max={50}
                value={shadowBlur}
                onChange={(e) => setShadowBlur(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Spread ({shadowSpread}px)</label>
              <input
                type="range"
                min={0}
                max={30}
                value={shadowSpread}
                onChange={(e) => setShadowSpread(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
          <div className="bg-gray-900 p-3 rounded-lg text-amber-400 font-mono text-xs flex justify-between items-center">
            <code>box-shadow: 0px 10px {shadowBlur}px {shadowSpread}px rgba(0,0,0,0.25);</code>
            <button
              onClick={() => {
                navigator.clipboard.writeText(`box-shadow: 0px 10px ${shadowBlur}px ${shadowSpread}px rgba(0,0,0,0.25);`);
                alert('CSS copied!');
              }}
              className="text-white hover:underline text-[11px]"
            >
              Copy
            </button>
          </div>
        </div>
      )}

      {/* General Code Input Area */}
      {!['jwt-decoder', 'regex-tester', 'css-box-shadow-gen'].includes(tool.id) && (
        <div>
          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase tracking-wider">
            Input Code / Payload
          </label>
          <textarea
            rows={6}
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            className="w-full p-4 text-xs font-mono rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-amber-500"
          ></textarea>
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleExecuteCodeTool}
        className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold text-sm shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
      >
        <Code className="w-4 h-4" /> Run {tool.name}
      </button>

      {/* Code Output Area */}
      {formattedOutput && (
        <div className="bg-gray-950 rounded-xl p-5 border border-gray-800 shadow-md space-y-2">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span className="font-mono font-bold flex items-center gap-1 text-amber-400">
              <Terminal className="w-4 h-4" /> Output Console
            </span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(formattedOutput);
                alert('Output copied to clipboard!');
              }}
              className="hover:text-white flex items-center gap-1 font-semibold"
            >
              <Copy className="w-3.5 h-3.5" /> Copy Code
            </button>
          </div>
          <pre className="text-xs font-mono text-amber-300/90 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-80 p-2">
            {formattedOutput}
          </pre>
        </div>
      )}
    </div>
  );
};
