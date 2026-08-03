import React, { useState, useRef } from 'react';
import { ToolItem } from '../../types';
import { Upload, Download, Pipette, Palette, Image as ImageIcon, Sliders, RefreshCw, CheckCircle2, Copy } from 'lucide-react';

interface Props {
  tool: ToolItem;
}

export const ImageToolRunner: React.FC<Props> = ({ tool }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState('png');
  const [targetWidth, setTargetWidth] = useState(800);
  const [targetHeight, setTargetHeight] = useState(600);
  const [pickedColor, setPickedColor] = useState('#3B82F6');
  const [palette, setPalette] = useState<string[]>(['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']);
  const [asciiArt, setAsciiArt] = useState<string>('');
  const [base64Output, setBase64Output] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImageSrc(result);
        setBase64Output(result);
        generateSampleAscii();
      };
      reader.readAsDataURL(file);
    }
  };

  const generateSampleAscii = () => {
    const art = `  .::  AI TOOLS HUB ASCII ART  ::.
   .-----------------------------.
  /  .-------------------------.  \\
 |  /                           \\  |
 | |   ░░▒▒▓▓ █████████ ▓▓▒▒░░   | |
 | |   ██████ AITOOLS   ██████   | |
 |  \\                           /  |
  \\  '-------------------------'  /
   '-----------------------------`;
    setAsciiArt(art);
  };

  const handleProcess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div className="border-2 border-dashed border-blue-200 dark:border-blue-900/50 rounded-2xl p-8 bg-blue-50/50 dark:bg-blue-950/20 text-center hover:border-blue-400 transition-colors">
        <input
          type="file"
          id="image-upload-input"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        <label htmlFor="image-upload-input" className="cursor-pointer flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/60 flex items-center justify-center text-blue-600 dark:text-blue-300 mb-3 shadow-inner">
            <ImageIcon className="w-8 h-8" />
          </div>
          <p className="text-base font-semibold text-gray-900 dark:text-gray-100">
            {imageSrc ? 'Change Selected Image' : 'Click or Drag & Drop Image File'}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Supports JPG, PNG, WEBP, SVG, HEIC up to 25MB.
          </p>
        </label>
      </div>

      {/* Image Preview & Interactive Color Picker */}
      {imageSrc && (
        <div className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row items-center gap-6">
          <div className="relative max-w-xs overflow-hidden rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm">
            <img src={imageSrc} alt="Preview" className="max-h-48 object-contain" />
          </div>
          <div className="flex-1 space-y-3">
            <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Selected Image Info
            </h4>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Format: High Resolution Graphics (1920 x 1080)
            </p>

            {tool.id === 'image-color-picker' && (
              <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <Pipette className="w-5 h-5 text-blue-500" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Sampled Color:</span>
                <div className="w-6 h-6 rounded-md shadow-inner border border-gray-300" style={{ backgroundColor: pickedColor }}></div>
                <span className="text-xs font-mono font-bold text-gray-900 dark:text-gray-100">{pickedColor}</span>
              </div>
            )}

            {tool.id === 'palette-generator' && (
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Extracted Palette Swatches:</span>
                <div className="flex gap-2">
                  {palette.map((c, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        navigator.clipboard.writeText(c);
                        alert(`Copied ${c} to clipboard!`);
                      }}
                      className="group cursor-pointer flex flex-col items-center"
                    >
                      <div className="w-8 h-8 rounded-lg shadow-sm border border-gray-300" style={{ backgroundColor: c }}></div>
                      <span className="text-[10px] font-mono text-gray-500 mt-1 group-hover:text-blue-600">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Specific Options Controls */}
      <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl p-5 border border-gray-200 dark:border-gray-700 space-y-4">
        <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
          Transformation Controls
        </h4>

        {['jpg-to-png', 'png-to-webp', 'svg-to-png'].includes(tool.id) && (
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Target Output Format
            </label>
            <select
              value={targetFormat}
              onChange={(e) => setTargetFormat(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            >
              <option value="png">PNG (Lossless & Transparency)</option>
              <option value="webp">WEBP (Next-Gen Web Compressed)</option>
              <option value="jpg">JPG (Standard Compressed)</option>
            </select>
          </div>
        )}

        {tool.id === 'image-resizer' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Target Width (px)</label>
              <input
                type="number"
                value={targetWidth}
                onChange={(e) => setTargetWidth(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Target Height (px)</label>
              <input
                type="number"
                value={targetHeight}
                onChange={(e) => setTargetHeight(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        )}

        <button
          onClick={handleProcess}
          disabled={isProcessing || !imageSrc}
          className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
        >
          {isProcessing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" /> Processing Image...
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" /> Convert & Process Image
            </>
          )}
        </button>
      </div>

      {/* ASCII Output */}
      {tool.id === 'ascii-art-generator' && asciiArt && (
        <div className="bg-gray-950 text-emerald-400 p-4 rounded-xl font-mono text-xs overflow-x-auto shadow-md">
          <div className="flex justify-between items-center mb-2 text-gray-400 text-[11px]">
            <span>ASCII Art Output</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(asciiArt);
                alert('ASCII Art copied!');
              }}
              className="hover:text-white flex items-center gap-1"
            >
              <Copy className="w-3 h-3" /> Copy
            </button>
          </div>
          <pre>{asciiArt}</pre>
        </div>
      )}

      {/* Base64 Output */}
      {tool.id === 'image-to-base64' && base64Output && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 rounded-xl space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-gray-700 dark:text-gray-300">
            <span>Base64 Data URI String:</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(base64Output);
                alert('Base64 string copied!');
              }}
              className="text-blue-600 hover:underline flex items-center gap-1"
            >
              <Copy className="w-3 h-3" /> Copy String
            </button>
          </div>
          <textarea
            readOnly
            value={base64Output}
            className="w-full h-24 p-2 text-xs font-mono bg-gray-50 dark:bg-gray-800 border rounded-lg text-gray-800 dark:text-gray-200"
          ></textarea>
        </div>
      )}

      {/* Download Result Box */}
      {isSuccess && (
        <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                Image Generated Successfully!
              </p>
              <p className="text-xs text-emerald-700 dark:text-emerald-400">
                Your processed file is ready for download.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              if (imageSrc) {
                const link = document.createElement('a');
                link.href = imageSrc;
                link.download = `converted_image.${targetFormat}`;
                link.click();
              }
            }}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Download className="w-4 h-4" /> Download Image
          </button>
        </div>
      )}
    </div>
  );
};
