"use client";

import { useState } from "react";

export default function PricingPage() {
  const [contractValue, setContractValue] = useState(18000);
  const [termMonths, setTermMonths] = useState(12);

  const costOfMiss = Math.round(contractValue * (termMonths / 12));

  return (
    <main className="bg-slate-50">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
          Simple, transparent pricing
        </h1>
        <p className="mt-4 text-slate-700 max-w-2xl mx-auto">
          Pay for contract monitoring — not seats, not noise. Oblix scales with
          your contracts, not your headcount.
        </p>
      </section>

      {/* Pricing Tiers */}
      <section className="max-w-6xl mx-auto px-6 pb-20 grid gap-6 md:grid-cols-4">
        {/* Starter */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-medium text-slate-900">Starter</h3>
          <p className="text-sm text-slate-700 mt-1">
            For small teams getting visibility.
          </p>

          <p className="text-3xl font-semibold mt-4 text-slate-900">$49</p>
          <p className="text-sm text-slate-600">per month</p>

          <ul className="mt-6 space-y-2 text-sm text-slate-700">
            <li>• Up to 25 active contracts</li>
            <li>• Renewal & notice alerts</li>
            <li>• Key obligation extraction</li>
            <li>• Email notifications</li>
          </ul>

          <button className="mt-6 w-full border border-slate-300 rounded-md py-2 text-sm font-medium text-slate-900 hover:bg-slate-100 transition">
            Get started
          </button>

          <p className="mt-3 text-xs text-slate-600 text-center">
            Best for founders and lean ops teams
          </p>
        </div>

        {/* Growth */}
        <div className="bg-white rounded-xl border-2 border-indigo-600 p-6 shadow-lg relative">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
            Most popular
          </span>

          <h3 className="font-medium text-slate-900">Growth</h3>
          <p className="text-sm text-slate-700 mt-1">
            For teams managing real financial exposure.
          </p>

          <p className="text-3xl font-semibold mt-4 text-slate-900">$149</p>
          <p className="text-sm text-slate-600">per month</p>

          <ul className="mt-6 space-y-2 text-sm text-slate-700">
            <li>• Up to 250 active contracts</li>
            <li>• Advanced clause extraction</li>
            <li>• Custom alert schedules</li>
            <li>• Priority support</li>
          </ul>

          <p className="mt-4 text-sm text-slate-700">
            One missed notice period often costs more than a year of Oblix.
          </p>

          <button className="mt-6 w-full bg-indigo-600 text-white rounded-md py-2 text-sm font-medium hover:bg-indigo-700 transition">
            Start monitoring contracts
          </button>
        </div>

        {/* Scale */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-medium text-slate-900">Scale</h3>
          <p className="text-sm text-slate-700 mt-1">
            For operators managing growing portfolios.
          </p>

          <p className="text-3xl font-semibold mt-4 text-slate-900">$499</p>
          <p className="text-sm text-slate-600">per month</p>

          <ul className="mt-6 space-y-2 text-sm text-slate-700">
            <li>• Up to 2,000 active contracts</li>
            <li>• Advanced clause detection</li>
            <li>• Custom workflows & alerts</li>
            <li>• Dedicated success support</li>
          </ul>

          <button className="mt-6 w-full border border-slate-300 rounded-md py-2 text-sm font-medium text-slate-900 hover:bg-slate-100 transition">
            Start monitoring contracts
          </button>

          <p className="mt-3 text-xs text-slate-600 text-center">
            Built for serious contract exposure
          </p>
        </div>

        {/* Enterprise */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-medium text-slate-900">Enterprise</h3>
          <p className="text-sm text-slate-700 mt-1">
            For legal & finance teams at scale.
          </p>

          <p className="text-2xl font-semibold mt-6 text-slate-900">Custom</p>

          <ul className="mt-6 space-y-2 text-sm text-slate-700">
            <li>• Unlimited contracts</li>
            <li>• Custom workflows & alerts</li>
            <li>• Dedicated onboarding</li>
            <li>• SLA & security reviews</li>
          </ul>

          <button className="mt-6 w-full border border-slate-300 rounded-md py-2 text-sm font-medium text-slate-900 hover:bg-slate-100 transition">
            Talk to sales
          </button>

          <p className="mt-3 text-xs text-slate-600 text-center">
            Used by regulated finance teams
          </p>
        </div>
      </section>

      {/* Trust Line */}
      <p className="text-center text-sm text-slate-600 pb-20">
        SOC-2 ready · Contracts encrypted at rest · Never used for model training
      </p>

      {/* ROI Calculator */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-center text-slate-900">
            What one missed clause can cost
          </h2>
          <p className="mt-3 text-slate-700 text-center max-w-2xl mx-auto">
            Most teams don’t lose money because they sign bad contracts. They lose
            money because renewal windows, notice deadlines, or buried obligations
            go unseen.
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-900">
                Average contract value
              </label>
              <input
                type="range"
                min={5000}
                max={100000}
                step={1000}
                value={contractValue}
                onChange={(e) => setContractValue(Number(e.target.value))}
                className="w-full mt-2"
              />
              <p className="mt-1 text-sm text-slate-700">
                ${contractValue.toLocaleString()}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-900">
                Auto-renewal term (months)
              </label>
              <input
                type="range"
                min={6}
                max={36}
                step={6}
                value={termMonths}
                onChange={(e) => setTermMonths(Number(e.target.value))}
                className="w-full mt-2"
              />
              <p className="mt-1 text-sm text-slate-700">
                {termMonths} months
              </p>
            </div>
          </div>

          <div className="mt-10 bg-indigo-50 rounded-lg p-6 text-center">
            <p className="text-sm text-indigo-700">
              Illustrative cost of missing notice
            </p>
            <p className="text-3xl font-semibold text-indigo-800 mt-2">
              ${costOfMiss.toLocaleString()}
            </p>
            <p className="mt-3 text-sm text-slate-700">
              Oblix exists to make sure this never happens quietly.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-indigo-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold">
            Never miss a renewal — or lose leverage — again.
          </h2>
          <p className="mt-4 text-indigo-100 max-w-2xl mx-auto">
            Oblix gives teams clarity on what they signed, what’s coming up, and
            what actually matters — without adding overhead.
          </p>

          <div className="mt-8">
            <button className="rounded-md bg-white text-indigo-700 px-6 py-3 text-sm font-medium hover:bg-indigo-50 transition">
              Start monitoring contracts
            </button>
          </div>

          <p className="mt-4 text-xs text-indigo-200">
            Cancel anytime · No per-seat pricing · No long-term contracts
          </p>
        </div>
      </section>
    </main>
  );
}
