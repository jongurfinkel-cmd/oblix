import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="bg-white text-slate-900">
      {/* HEADER */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Support from people who understand
            <span className="block text-indigo-600 mt-2">contract risk</span>
          </h1>

          <p className="mt-6 text-lg text-slate-600">
            Questions about contracts, alerts, billing, or onboarding?
            You’ll reach a real person who understands how Oblix works —
            and how contracts quietly create financial exposure.
          </p>

          <p className="mt-3 text-sm text-slate-500">
            Sales inquiries, onboarding questions, and support requests welcome.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* LEFT CONTEXT */}
          <div className="hidden md:block">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-8">
              <h3 className="text-sm font-medium text-slate-900">
                What we typically help with
              </h3>

              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li>• Contract uploads and parsing questions</li>
                <li>• Alert timing and renewal logic</li>
                <li>• Billing, plans, and account setup</li>
                <li>• Evaluating Oblix for your team</li>
              </ul>

              <p className="mt-6 text-xs text-slate-500">
                This message goes directly to the Oblix team — not a bot.
              </p>
            </div>
          </div>

          {/* FORM */}
          <div className="rounded-xl border border-slate-200 bg-white p-8">
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Company <span className="text-slate-400">(optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Company name"
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us what you’re trying to solve or what you need help with."
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition"
              >
                Send to Oblix support
              </button>

              <p className="text-xs text-slate-500 text-center">
                We usually respond within one business day.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER TRUST */}
      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-12 text-center text-sm text-slate-500">
          <p>
            Prefer email? Reach us directly at{" "}
            <a
              href="mailto:support@oblix.app"
              className="text-indigo-600 hover:underline"
            >
              support@oblix.app
            </a>
          </p>
          <p className="mt-2">
            Support handled by the Oblix team — not bots.
            Contracts are encrypted and never used for model training.
          </p>
        </div>
      </section>
    </main>
  );
}
