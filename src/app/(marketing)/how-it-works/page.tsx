export default function HowItWorksPage() {
  return (
    <main className="bg-white text-slate-900">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16">
        <h1 className="text-4xl font-semibold tracking-tight">
          How Oblix works
        </h1>

        <p className="mt-4 max-w-2xl text-slate-600 text-lg">
          Oblix monitors what happens <span className="font-medium text-slate-900">after</span> contracts are signed.
          No drafting. No negotiation. Just clarity, alerts, and risk prevention —
          so you can focus on running your business.
        </p>
      </section>

      {/* Step 1 */}
      <section className="border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <span className="text-sm font-medium text-indigo-600">Step 1</span>
            <h2 className="mt-2 text-2xl font-semibold">
              Upload executed contracts
            </h2>

            <p className="mt-3 text-slate-600">
              Upload signed PDFs, MSAs, amendments, and service agreements.
              Oblix works with real contracts — not templates or drafts.
            </p>

            <ul className="mt-4 space-y-2 text-slate-600 text-sm">
              <li>• PDFs, scans, and amendments supported</li>
              <li>• Contracts stored securely and encrypted</li>
              <li>• No changes to your existing workflows</li>
            </ul>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
            <h4 className="text-sm font-medium text-slate-700 mb-3">
              Common uploads
            </h4>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• SaaS vendor agreements</li>
              <li>• Cloud services contracts</li>
              <li>• Professional services MSAs</li>
              <li>• Long-term supplier agreements</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Step 2 – VALUE CORE */}
      <section className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <span className="text-sm font-medium text-indigo-600">Step 2</span>
            <h2 className="mt-2 text-2xl font-semibold">
              Oblix extracts what actually matters
            </h2>

            <p className="mt-3 text-slate-600">
              Oblix analyzes each contract to surface the clauses that create
              financial and operational risk — automatically.
            </p>

            <ul className="mt-4 space-y-2 text-slate-600 text-sm">
              <li>• Auto-renewal and renewal clauses</li>
              <li>• Notice periods and hard deadlines</li>
              <li>• Termination and negotiation rights</li>
              <li>• Fees, escalators, and minimum spend clauses</li>
            </ul>

            <p className="mt-4 text-sm text-slate-500 italic">
              This is where teams lose leverage — and where Oblix pays for itself.
            </p>
          </div>

          <div className="rounded-lg border border-indigo-200 bg-white p-6 shadow-sm">
            <h4 className="text-sm font-medium text-slate-700 mb-3">
              Example extracted insight
            </h4>

            <p className="text-sm text-slate-700 leading-relaxed">
              “This agreement auto-renews annually unless written notice is sent
              at least <span className="font-medium">60 days before renewal</span> —
              locking in another year of spend.”
            </p>

            <span className="inline-block mt-4 text-xs font-medium text-indigo-600">
              Notice window closing
            </span>
          </div>
        </div>
      </section>

      {/* Step 3 */}
      <section className="border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <span className="text-sm font-medium text-indigo-600">Step 3</span>
            <h2 className="mt-2 text-2xl font-semibold">
              Get alerts before risk hits
            </h2>

            <p className="mt-3 text-slate-600">
              Oblix tracks every critical date and alerts you well before
              deadlines close or contracts auto-renew.
            </p>

            <ul className="mt-4 space-y-2 text-slate-600 text-sm">
              <li>• Renewal reminders</li>
              <li>• Notice deadline warnings</li>
              <li>• Upcoming termination windows</li>
              <li>• Custom alert schedules</li>
            </ul>

            <p className="mt-4 text-sm text-slate-500 italic">
              This runs quietly in the background — so contracts don’t steal your attention.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
            <h4 className="text-sm font-medium text-slate-700 mb-3">
              Typical alert timing
            </h4>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• 90 days before renewal</li>
              <li>• 60 days before notice cutoff</li>
              <li>• 30 days before final deadline</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-semibold">Why teams use Oblix</h2>

          <p className="mt-3 max-w-2xl text-slate-600">
            Contract risk isn’t dramatic. It’s silent, compounding,
            and easy to miss.
          </p>

          <ul className="mt-4 space-y-2 text-slate-600 text-sm">
            <li>• Missed renewals lead to silent overpayments</li>
            <li>• Expired termination rights remove leverage</li>
            <li>• Buried clauses create unexpected obligations</li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center text-white">
          <h2 className="text-3xl font-semibold">
            Never miss what matters
          </h2>

          <p className="mt-3 text-indigo-100 max-w-2xl mx-auto">
            Oblix gives teams clarity on what they signed, what’s coming up,
            and what actually matters — without adding overhead.
          </p>

          <button className="mt-8 inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-50">
            Start monitoring contracts
          </button>

          <p className="mt-4 text-xs text-indigo-200">
            SOC-2 ready · Encrypted at rest · Never used for model training
          </p>
        </div>
      </section>
    </main>
  );
}
