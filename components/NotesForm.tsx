'use client';

import { ReleaseInput } from '@/types';
import { SAMPLE_INPUT } from '@/lib/sampleData';

interface Props {
  values: ReleaseInput;
  onChange: (v: ReleaseInput) => void;
  onSubmit: () => void;
  loading: boolean;
}

export default function NotesForm({ values, onChange, onSubmit, loading }: Props) {
  const set = (k: keyof ReleaseInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    onChange({ ...values, [k]: e.target.value });

  const cls = 'w-full px-3.5 py-2.5 text-sm rounded-lg bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all';
  const lbl = 'block text-xs font-medium text-gray-700 mb-1.5';

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900">Release details</h2>
        <button onClick={() => onChange(SAMPLE_INPUT)}
          className="text-xs font-medium text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-300 rounded-lg px-3 py-1.5 transition-colors"
          data-tour="sample">
          ✨ Sample data
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={lbl}>Product name <span className="text-red-500">*</span></label>
          <input type="text" value={values.productName} onChange={set('productName')} placeholder="NovaPay" className={cls} />
        </div>
        <div>
          <label className={lbl}>Version <span className="text-red-500">*</span></label>
          <input type="text" value={values.version} onChange={set('version')} placeholder="v2.4.0" className={cls} />
        </div>
      </div>

      <div>
        <label className={lbl}>Release date <span className="text-red-500">*</span></label>
        <input type="text" value={values.releaseDate} onChange={set('releaseDate')} placeholder="2024-08-15" className={cls} />
      </div>

      <div>
        <label className={lbl}>Changes shipped <span className="text-red-500">*</span></label>
        <p className="text-xs text-gray-400 mb-2">Paste your list of features and fixes — any format works</p>
        <textarea value={values.changes} onChange={set('changes')} rows={9}
          placeholder={`- New bulk payment feature: upload up to 500 payments via CSV\n- Fix: duplicate payment detection improved\n- API: new /v2/payments endpoint with pagination`}
          className={cls + ' resize-none font-mono text-xs'} />
        <p className="text-xs text-gray-400 mt-1">{values.changes.split('\n').filter(Boolean).length} lines</p>
      </div>

      <div>
        <label className={lbl}>Product context <span className="text-gray-400 font-normal">(optional)</span></label>
        <textarea value={values.context ?? ''} onChange={set('context')} rows={2}
          placeholder="Who are your users? What does your product do? Helps the AI tailor the tone."
          className={cls + ' resize-none'} />
      </div>

      <button onClick={onSubmit}
        disabled={loading || !values.productName || !values.version || !values.changes}
        className="w-full bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-xl py-3 px-6 transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        data-tour="run">
        {loading
          ? <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>Generating 3 versions…</>
          : '✦ Generate release notes'}
      </button>
    </div>
  );
}
