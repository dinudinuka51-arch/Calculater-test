import React, { useState } from 'react';
import { getGroundedAnswer } from '../services/geminiService';
import type { GeminiSearchResult } from '../types';
import { GoogleIcon } from './icons/GoogleIcon';
import { SendIcon } from './icons/SendIcon';

export const GeminiSearch: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<GeminiSearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await getGroundedAnswer(prompt);
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col h-full bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl shadow-lg p-6 text-white">
      <div className="flex items-center gap-3 mb-4">
        <GoogleIcon />
        <h2 className="text-xl font-bold">Ask Gemini</h2>
      </div>
      <p className="text-gray-400 mb-6 text-sm">Ask complex questions or for up-to-date information. Powered by Gemini with Google Search.</p>
      
      <div className="flex-grow overflow-y-auto pr-2">
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
            <p className="mt-4 text-gray-300">Searching the web and thinking...</p>
          </div>
        )}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}
        {result && (
          <div className="space-y-6">
            <div>
              <p className="font-semibold text-lg mb-2">Response:</p>
              <p className="text-gray-200 whitespace-pre-wrap">{result.text}</p>
            </div>
            {result.sources.length > 0 && (
              <div>
                <p className="font-semibold text-lg mb-2">Sources:</p>
                <ul className="space-y-2 list-disc list-inside">
                  {result.sources.map((source, index) => (
                    source.web && <li key={index}>
                      <a
                        href={source.web.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-400 hover:text-orange-300 underline"
                      >
                        {source.web.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-auto pt-6">
        <div className="relative">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., 'Who won the last F1 race?'"
            disabled={isLoading}
            className="w-full bg-gray-800/50 border border-gray-700 rounded-full py-3 pl-5 pr-14 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-orange-600 hover:bg-orange-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
          >
            <SendIcon />
          </button>
        </div>
      </form>
    </div>
  );
};
