'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import NotesForm from '@/components/NotesForm';
import NotesResult from '@/components/NotesResult';
import { ReleaseInput, GeneratedNotes } from '@/types';

const EMPTY: ReleaseInput = { productName: '', version: '', releaseDate: '', changes: '', context: '' };

export default function DemoPage() {
  return (
    <Suspense fallback={null}>
      <DemoPageInner />
    </Suspense>
  );
}

function DemoPageInner() {
  const embed = useSearchParams().get('embed') === '1';
  const [input, setInput] = useState<ReleaseInput>(EMPTY);
  const [notes, setNotes] = useState<GeneratedNotes | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generate = async () => {
    setLoading(true); setError(''); setNotes(null);
    try {
      const res = await fetch('/api/generate-notes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input) });
      if (!res.ok) throw new Error();
      setNotes(await res.json());
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {!embed && <nav className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-brand-500 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 3h12v2H2zm0 4h8v2H2zm0 4h10v2H2z" fill="white"/></svg>
            </div>
            <span className="text-sm font-semibold text-gray-900">Release Notes Generator</span>
            <span className="hidden sm:inline text-xs text-gray-500">by <a href="https://xavimarin.net" target="_blank" rel="noopener noreferrer" className="hover:text-brand-600 transition-colors">Xavi Marín</a></span>
          </div>
          <div className="flex items-center gap-2">
            <a href="https://ai-po-xavi-marin-suite.vercel.app" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors">← AI PO Suite</a>
            <Link href="/" className="text-xs font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors">← Home</Link>
          </div>
        </div>
      </nav>}

      <div className="bg-blue-50 border-b border-blue-100 px-4 py-2.5 text-center text-xs text-blue-700 font-medium">
        Demo mode — generates 3 versions in parallel via Groq + GPT-OSS 120B
      </div>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Release Notes Generator</h1>
          <p className="text-sm text-gray-500">One input → release notes for end users, engineering teams, and executives simultaneously.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2" data-tour="input">
            <NotesForm values={input} onChange={setInput} onSubmit={generate} loading={loading} />
            {error && <p className="text-xs text-red-600 mt-3">{error}</p>}
          </div>

          <div className="lg:col-span-3" data-tour="results">
            {!notes && !loading && (
              <div className="bg-white rounded-xl border border-gray-200 border-dashed p-12 text-center h-48 flex flex-col items-center justify-center">
                <p className="text-sm text-gray-400">3 versions will appear here</p>
                <p className="text-xs text-gray-300 mt-1">End user · Technical · Executive</p>
              </div>
            )}
            {loading && (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center h-48 flex flex-col items-center justify-center gap-3">
                <svg className="animate-spin w-6 h-6 text-brand-500" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
                <p className="text-sm text-gray-500">Generating 3 versions in parallel…</p>
              </div>
            )}
            {notes && <NotesResult notes={notes} productName={input.productName} version={input.version} />}
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-white mt-16">
        <div className="max-w-5xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <span>Built by <a href="https://xavimarin.net" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">Xavi Marín</a></span>
          <span>PO Toolkit #8 of 12</span>
        </div>
      </footer>
    </div>
  );
}
