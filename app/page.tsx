import Link from 'next/link';

const HOW_IT_WORKS = [
  { step: '01', title: 'Paste your changes', desc: 'Drop in your sprint features, bug fixes, and improvements in any format — bullet list, Jira export, or free text.' },
  { step: '02', title: 'Add context once', desc: 'Tell the tool who your users are and what your product does. This shapes the tone of all 3 versions.' },
  { step: '03', title: 'Get 3 versions in parallel', desc: 'End users get benefits, engineers get API details, executives get business impact — generated simultaneously.' },
];

const ROADMAP: { category: string; items: { label: string; desc: string; status: 'planned' | 'considering' }[] }[] = [
  {
    category: 'Input',
    items: [
      { label: 'Jira sprint import', desc: 'Pull closed issues from a Jira sprint directly and auto-format them as the changes list.', status: 'planned' },
      { label: 'GitHub PR import', desc: 'Connect a GitHub repo and import merged PRs from a date range as the change input.', status: 'considering' },
      { label: 'Version history', desc: 'Save past releases and browse them — never lose a version again.', status: 'planned' },
    ],
  },
  {
    category: 'Output',
    items: [
      { label: '4th audience: Sales', desc: 'Generate a sales-facing version highlighting competitive differentiators and new deal-closing capabilities.', status: 'planned' },
      { label: 'Localization', desc: 'Generate release notes in Spanish, French, German, or Portuguese alongside the English version.', status: 'considering' },
      { label: 'Changelog page', desc: 'Auto-generate a public changelog HTML page from all saved releases — ready to host on your docs site.', status: 'planned' },
    ],
  },
  {
    category: 'Integrations',
    items: [
      { label: 'Notion publish', desc: 'Push the release notes directly to a Notion page with one click, formatted with headings and bullets.', status: 'planned' },
      { label: 'Email template', desc: 'Export the end-user version as an HTML email template ready for Mailchimp or HubSpot.', status: 'considering' },
    ],
  },
];

const STATUS_BADGE: Record<string, string> = { planned: 'bg-blue-50 text-blue-700 border-blue-200', considering: 'bg-gray-100 text-gray-600 border-gray-200' };
const STATUS_LABEL: Record<string, string> = { planned: 'Planned', considering: 'Considering' };

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-brand-500 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 3h12v2H2zm0 4h8v2H2zm0 4h10v2H2z" fill="white"/></svg>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-900">Release Notes Generator</span>
              <span className="hidden sm:inline text-xs text-gray-500 ml-2">by <a href="https://xavimarin.net" target="_blank" rel="noopener noreferrer" className="hover:text-brand-600 transition-colors">Xavi Marín</a></span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="#roadmap" className="text-xs text-gray-500 hover:text-gray-700 transition-colors hidden sm:block">Roadmap</a>
            <a href="https://xavimarin.net" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-gray-700 transition-colors hidden sm:block">xavimarin.net</a>
            <a href="https://ai-po-xavi-marin-suite.vercel.app" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-gray-700 transition-colors hidden sm:block">← AI PO Suite</a>
            <Link href="/demo" className="text-xs font-semibold text-white bg-brand-500 hover:bg-brand-600 rounded-lg px-3.5 py-1.5 transition-colors">Try Demo</Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <section className="max-w-3xl mx-auto px-6 pt-24 pb-24 text-center">
          <p className="text-xs font-semibold text-brand-600 mb-5 tracking-widest uppercase">PO Toolkit · Tool #8 of 12</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-5 tracking-tight leading-tight">
            One sprint, three<br />release notes
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8 leading-relaxed">
            Paste your changes once. Get polished release notes for end users, your engineering team, and executives — each in the right tone and format.
          </p>

          {/* 3-audience side-by-side preview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto mb-10 text-left">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide mb-2">👤 End users</p>
              <p className="text-xs text-gray-700 font-medium mb-1">NovaPay v2.4 — What's new</p>
              <p className="text-xs text-gray-500 leading-relaxed">You can now approve expense reports from your phone in one tap. No more desktop logins mid-trip.</p>
              <p className="text-xs text-emerald-600 font-medium mt-2">Tone: friendly &amp; benefit-focused</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <p className="text-xs font-bold text-purple-700 uppercase tracking-wide mb-2">⚙️ Engineering</p>
              <p className="text-xs text-gray-700 font-medium mb-1">Release 2.4.0 — Technical notes</p>
              <p className="text-xs text-gray-500 leading-relaxed">New <code className="bg-purple-100 px-1 rounded">POST /approvals/mobile</code> endpoint. JWT auth via biometric. Breaking: removed legacy <code className="bg-purple-100 px-1 rounded">GET /approve</code>.</p>
              <p className="text-xs text-purple-600 font-medium mt-2">Tone: precise &amp; technical</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-2">📊 Executive</p>
              <p className="text-xs text-gray-700 font-medium mb-1">Sprint 24 — Business impact</p>
              <p className="text-xs text-gray-500 leading-relaxed">Mobile approval unblocks field teams. Expected: -40% approval latency, reducing cash flow risk for enterprise clients.</p>
              <p className="text-xs text-blue-600 font-medium mt-2">Tone: outcome &amp; metrics</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 -mt-6 mb-8">↑ Same sprint. Three audiences. Generated in parallel.</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/demo" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold transition-colors shadow-sm">
              ✨ Try with NovaPay v2.4
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor"><path fillRule="evenodd" d="M1 8a.75.75 0 01.75-.75h10.69L8.22 3.03a.75.75 0 111.06-1.06l5.25 5.25a.75.75 0 010 1.06l-5.25 5.25a.75.75 0 11-1.06-1.06l4.22-4.22H1.75A.75.75 0 011 8z"/></svg>
            </Link>
            <Link href="/demo" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors">Use my sprint changes</Link>
          </div>
          <p className="text-xs text-gray-400 mt-6">No login · 3 versions generated in parallel · Free forever</p>
        </section>

        <section className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 py-20">
            <div className="text-center mb-12"><h2 className="text-2xl font-bold text-gray-900 mb-2">How it works</h2><p className="text-sm text-gray-500">Write once, communicate to everyone</p></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {HOW_IT_WORKS.map(item => (
                <div key={item.step} className="bg-white rounded-xl border border-gray-200 p-6">
                  <span className="text-xs font-bold text-brand-500 font-mono">{item.step}</span>
                  <h3 className="text-sm font-semibold text-gray-900 mt-3 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="roadmap" className="border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-6 py-20">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Roadmap</h2>
              <p className="text-sm text-gray-500">What's coming next</p>
              <div className="flex items-center justify-center gap-4 mt-4">
                <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${STATUS_BADGE.planned}`}><span className="w-1.5 h-1.5 rounded-full bg-blue-500"/>Planned</span>
                <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${STATUS_BADGE.considering}`}><span className="w-1.5 h-1.5 rounded-full bg-gray-400"/>Considering</span>
              </div>
            </div>
            <div className="space-y-10">
              {ROADMAP.map(group => (
                <div key={group.category}>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{group.category}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {group.items.map(item => (
                      <div key={item.label} className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-3">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-semibold text-gray-900 leading-snug">{item.label}</p>
                          <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full border ${STATUS_BADGE[item.status]}`}>{STATUS_LABEL[item.status]}</span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-3xl mx-auto px-6 py-16">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 text-center">Why I built this</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Problem', text: 'POs write the same release in 3 different Slack messages, emails, and Confluence pages — each slightly inconsistent and all taking time they don\'t have.' },
                { label: 'Solution', text: 'One input produces three tailored outputs in parallel: benefits for users, API details for engineers, and business impact for executives.' },
                { label: 'Impact', text: 'Consistent, professional communication every sprint. What used to take 45 minutes now takes under a minute.' },
              ].map(item => (
                <div key={item.label} className="bg-white rounded-xl border border-gray-200 p-5">
                  <p className="text-xs font-semibold text-brand-600 uppercase tracking-wide mb-2">{item.label}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <span>Built by <a href="https://xavimarin.net" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">Xavi Marín</a> · No data stored on our servers</span>
          <span>PO Toolkit #8 of 12</span>
        </div>
      </footer>
    </div>
  );
}
