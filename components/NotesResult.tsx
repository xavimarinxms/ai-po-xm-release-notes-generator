'use client';

import { useState } from 'react';
import { GeneratedNotes, Audience, AudienceNotes } from '@/types';

const TABS: { key: Audience; label: string; icon: string; desc: string }[] = [
  { key: 'endUser', label: 'End Users', icon: '👤', desc: 'Benefit-focused, no jargon' },
  { key: 'technical', label: 'Technical', icon: '⚙️', desc: 'API changes, deprecations' },
  { key: 'executive', label: 'Executive', icon: '📊', desc: 'Business impact, concise' },
];

function toMarkdown(notes: AudienceNotes, productName: string, version: string): string {
  const lines = [
    `# ${notes.title}`,
    '',
    notes.intro,
    '',
  ];
  notes.sections.forEach(s => {
    lines.push(`## ${s.heading}`);
    s.items.forEach(i => lines.push(`- ${i}`));
    lines.push('');
  });
  if (notes.closing) { lines.push(notes.closing); lines.push(''); }
  return lines.join('\n');
}

function NoteView({ notes, productName, version }: { notes: AudienceNotes; productName: string; version: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(toMarkdown(notes, productName, version)).catch(() => {
      /* Clipboard API blocked (e.g. embedded iframe without permission) — fail silently. */
    });
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const download = () => {
    const blob = new Blob([toMarkdown(notes, productName, version)], { type: 'text/markdown' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = `release-notes-${version}.md`; a.click();
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900">{notes.title}</h3>
          <p className="text-sm text-gray-500 mt-1 leading-relaxed">{notes.intro}</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button onClick={copy} className="text-xs font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors">
            {copied ? '✓ Copied' : 'Copy MD'}
          </button>
          <button onClick={download} className="text-xs font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors">
            ↓ .md
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {notes.sections.map(section => (
          <div key={section.heading}>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{section.heading}</h4>
            <ul className="flex flex-col gap-1.5">
              {section.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
                  <span className="text-brand-500 mt-0.5 shrink-0">›</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {notes.closing && (
        <p className="text-sm text-gray-500 italic border-t border-gray-100 pt-4">{notes.closing}</p>
      )}
    </div>
  );
}

export default function NotesResult({ notes, productName, version }: { notes: GeneratedNotes; productName: string; version: string }) {
  const [active, setActive] = useState<Audience>('endUser');

  const copyAll = () => {
    const all = TABS.map(t => `<!-- ${t.label} -->\n${toMarkdown(notes[t.key], productName, version)}`).join('\n---\n\n');
    navigator.clipboard?.writeText(all).catch(() => {
      /* Clipboard API blocked (e.g. embedded iframe without permission) — fail silently. */
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Audience tabs */}
      <div className="bg-white rounded-xl border border-gray-200 p-1.5 flex gap-1">
        {TABS.map(t => (
          <button key={t.key} onClick={() => setActive(t.key)}
            className={`flex-1 flex flex-col items-center gap-0.5 px-3 py-2.5 rounded-lg text-xs transition-colors ${active === t.key ? 'bg-brand-50 text-brand-700 font-semibold' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}>
            <span className="text-base">{t.icon}</span>
            <span>{t.label}</span>
            <span className={`text-[10px] font-normal ${active === t.key ? 'text-brand-500' : 'text-gray-400'}`}>{t.desc}</span>
          </button>
        ))}
      </div>

      <NoteView notes={notes[active]} productName={productName} version={version} />

      <button onClick={copyAll} className="text-xs font-medium text-gray-500 hover:text-gray-700 text-center">
        Copy all 3 versions to clipboard
      </button>
    </div>
  );
}
