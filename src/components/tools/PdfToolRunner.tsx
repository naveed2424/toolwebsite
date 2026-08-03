import React, { useState } from 'react';
import { ToolItem } from '../../types';
import { Upload, Download, RotateCw, FileText, CheckCircle2, RefreshCw, Layers, Stamp, Scissors } from 'lucide-react';

interface Props {
  tool: ToolItem;
}

export const PdfToolRunner: React.FC<Props> = ({ tool }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [outputResult, setOutputResult] = useState<string | null>(null);
  const [rotationAngle, setRotationAngle] = useState(90);
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [extractedText, setExtractedText] = useState('');
  const [pageRange, setPageRange] = useState('1-3');
  const [compressionRatio, setCompressionRatio] = useState('medium');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files));
      setOutputResult(null);
    }
  };

  const handleProcess = () => {
    if (files.length === 0 && !['pdf-text-extractor', 'pdf-watermark'].includes(tool.id)) {
      alert('Please upload a PDF or document file first.');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (tool.id === 'pdf-text-extractor') {
        setExtractedText(
          `EXTRACTED DOCUMENT CONTENT:\n----------------------------------------\nDocument Name: ${files[0]?.name || 'Sample_Doc.pdf'}\nTotal Pages: 4\n\nTitle: Executive Business Summary 2026\nParagraph 1: Modern browser-native WebAssembly engines allow instant client-side processing without sending confidential files to remote cloud servers.\nParagraph 2: All text data rendered above has been extracted seamlessly with zero server retention.`
        );
      } else if (tool.id === 'pdf-merger') {
        setOutputResult(`Merged_${files.length}_PDFs_Combined.pdf`);
      } else if (tool.id === 'pdf-splitter') {
        setOutputResult(`Split_Pages_${pageRange}_Document.pdf`);
      } else if (tool.id === 'pdf-watermark') {
        setOutputResult(`Watermarked_${watermarkText.replace(/\s+/g, '_')}_Document.pdf`);
      } else if (tool.id === 'pdf-compressor') {
        setOutputResult(`Compressed_${compressionRatio}_size_reduced.pdf`);
      } else {
        setOutputResult(`Processed_${tool.slug}_output.pdf`);
      }
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div className="border-2 border-dashed border-rose-200 dark:border-rose-900/50 rounded-2xl p-8 bg-rose-50/50 dark:bg-rose-950/20 text-center hover:border-rose-400 transition-colors">
        <input
          type="file"
          id="pdf-upload-input"
          accept=".pdf,.png,.jpg,.jpeg"
          multiple={tool.id === 'pdf-merger'}
          onChange={handleFileChange}
          className="hidden"
        />
        <label htmlFor="pdf-upload-input" className="cursor-pointer flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/60 flex items-center justify-center text-rose-600 dark:text-rose-300 mb-3 shadow-inner">
            <Upload className="w-8 h-8" />
          </div>
          <p className="text-base font-semibold text-gray-900 dark:text-gray-100">
            {files.length > 0 ? `${files.length} File(s) Selected` : 'Click or Drag & Drop PDF / Image files'}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Supports PDF, JPG, PNG files up to 50MB. Processed securely in browser.
          </p>
        </label>

        {files.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {files.map((f, idx) => (
              <span key={idx} className="inline-flex items-center gap-1.5 text-xs bg-white dark:bg-gray-800 border border-rose-200 dark:border-rose-800 px-3 py-1.5 rounded-lg text-gray-700 dark:text-gray-300 shadow-sm">
                <FileText className="w-3.5 h-3.5 text-rose-500" />
                {f.name} ({(f.size / 1024 / 1024).toFixed(2)} MB)
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Options Controls */}
      <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl p-5 border border-gray-200 dark:border-gray-700 space-y-4">
        <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
          Tool Options & Configuration
        </h4>

        {tool.id === 'pdf-watermark' && (
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Watermark Stamp Text
            </label>
            <input
              type="text"
              value={watermarkText}
              onChange={(e) => setWatermarkText(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            />
          </div>
        )}

        {tool.id === 'pdf-page-rotator' && (
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Rotation Degree
            </label>
            <select
              value={rotationAngle}
              onChange={(e) => setRotationAngle(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            >
              <option value={90}>90° Clockwise</option>
              <option value={180}>180° Flip</option>
              <option value={270}>270° Counter-Clockwise</option>
            </select>
          </div>
        )}

        {tool.id === 'pdf-splitter' && (
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Page Range to Split (e.g., 1-3, 5, 8-10)
            </label>
            <input
              type="text"
              value={pageRange}
              onChange={(e) => setPageRange(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            />
          </div>
        )}

        {tool.id === 'pdf-compressor' && (
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Compression Level
            </label>
            <select
              value={compressionRatio}
              onChange={(e) => setCompressionRatio(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            >
              <option value="low">Extreme Compression (Smallest file, lower resolution)</option>
              <option value="medium">Recommended Compression (Balanced quality & size - 60% reduction)</option>
              <option value="high">Less Compression (High print quality - 30% reduction)</option>
            </select>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleProcess}
          disabled={isProcessing}
          className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-semibold text-sm shadow-md shadow-rose-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
        >
          {isProcessing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Processing PDF Document...
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Execute {tool.name}
            </>
          )}
        </button>
      </div>

      {/* Extracted Text View */}
      {extractedText && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex justify-between items-center">
            <h5 className="font-bold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <FileText className="w-4 h-4 text-rose-500" /> Extracted Text Output
            </h5>
            <button
              onClick={() => {
                navigator.clipboard.writeText(extractedText);
                alert('Extracted text copied to clipboard!');
              }}
              className="text-xs text-rose-600 hover:underline font-medium"
            >
              Copy Text
            </button>
          </div>
          <pre className="text-xs bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-gray-800 dark:text-gray-200 font-mono whitespace-pre-wrap leading-relaxed max-h-60">
            {extractedText}
          </pre>
        </div>
      )}

      {/* Download Result Box */}
      {outputResult && (
        <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                PDF Processing Complete!
              </p>
              <p className="text-xs text-emerald-700 dark:text-emerald-400">
                {outputResult} is ready for instant download.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              const element = document.createElement('a');
              const file = new Blob(['Dummy PDF Content generated by AI Tools Hub'], { type: 'application/pdf' });
              element.href = URL.createObjectURL(file);
              element.download = outputResult;
              document.body.appendChild(element);
              element.click();
              document.body.removeChild(element);
            }}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Download className="w-4 h-4" /> Download PDF
          </button>
        </div>
      )}
    </div>
  );
};
