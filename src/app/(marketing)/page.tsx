"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/* ===== SHARED ROI LOGIC ===== */
function calculateROI(employees: number) {
  const contractsPerEmployee = 3;
  const avgContractValue = 12000;
  const leakageRate = 0.06;

  const contracts = Math.round(employees * contractsPerEmployee);
  const annualSpend = contracts * avgContractValue;
  const estimatedLoss = Math.round(annualSpend * leakageRate);

  return { contracts, annualSpend, estimatedLoss };
}

/* ===== ANIMATED NUMBER HOOK ===== */
function useAnimatedNumber(value: number, duration = 400) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    let start = display;
    let startTime: number | null = null;

    function step(ts: number) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + (value - start) * eased));
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return display;
}

export default function MarketingHomePage() {
  /* ===== STATE ===== */
  const [employees, setEmployees] = useState(50);
  const [role, setRole] = useState<"founder" | "finance" | "ops">("founder");

  const roi = calculateROI(employees);

  const animatedContracts = useAnimatedNumber(roi.contracts);
  const animatedSpend = useAnimatedNumber(roi.annualSpend);
  const animatedLoss = useAnimatedNumber(roi.estimatedLoss);

  const signupHref = `/login?employees=${employees}&role=${role}`;

  return (
    <main className="bg-white text-slate-900">
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Contracts don’t forget.
            <span className="block text-indigo-600 mt-2">
              Teams don’t have to.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-lg text-slate-600">
            Oblix monitors what happens{" "}
            <span className="font-medium text-slate-800">after</span> contracts
            are signed. Renewal dates, notice periods, and risk triggers are
            tracked automatically so nothing slips through the cracks.
          </p>

          <p className="mt-4 text-sm text-slate-500">
            Built for operators, finance leaders, and founders managing real
            financial exposure.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <Link
              href={signupHref}
              className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-700 transition"
            >
              Start monitoring signed contracts
            </Link>

            <Link
              href="/how-it-works"
              className="rounded-md border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
            >
              How it works
            </Link>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            No per-seat pricing. Cancel anytime. Built for operators.
          </p>
        </div>

        {/* HERO VISUAL */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <div className="text-sm font-medium text-slate-700 mb-4">
            Continuous contract monitoring
          </div>

          <ul className="space-y-3 text-sm">
            <li className="flex justify-between">
              <span>Vendor Agreement</span>
              <span className="text-amber-600">
                Notice window in 15 days
              </span>
            </li>
            <li className="flex justify-between">
              <span>Cloud Services MSA</span>
              <span className="text-emerald-600">Renewal tracked</span>
            </li>
            <li className="flex justify-between">
              <span>Professional Services SOW</span>
              <span className="text-red-600">
                Termination clause flagged
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* ROI CALCULATOR */}
      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-semibold">
              What missed contracts actually cost
            </h2>
            <p className="mt-4 text-slate-600">
              Even disciplined teams leak money through auto-renewals and missed
              notice windows.
            </p>
          </div>

          {/* ROLE TOGGLE */}
          <div className="mt-8 flex justify-center gap-2 text-sm">
            {[
              { id: "founder", label: "Founder" },
              { id: "finance", label: "Finance" },
              { id: "ops", label: "Operations" },
            ].map((r) => (
              <button
                key={r.id}
                onClick={() => setRole(r.id as any)}
                className={`rounded-full px-4 py-1.5 border transition ${
                  role === r.id
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-slate-600 border-slate-300 hover:bg-slate-100"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-8">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-slate-700">
                Company size (employees)
              </span>
              <span className="text-slate-500">
                {employees} employees
              </span>
            </div>

            <input
              type="range"
              min={10}
              max={500}
              step={10}
              value={employees}
              onChange={(e) => setEmployees(Number(e.target.value))}
              className="mt-3 w-full"
            />

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="rounded-lg bg-slate-50 p-4 opacity-80">
                <p className="text-slate-500">Estimated contracts</p>
                <p className="mt-1 text-xl font-semibold">
                  {animatedContracts}
                </p>
              </div>

              <div className="rounded-lg bg-slate-50 p-4 opacity-80">
                <p className="text-slate-500">Annual contract spend</p>
                <p className="mt-1 text-xl font-semibold">
                  ${animatedSpend.toLocaleString()}
                </p>
              </div>

              <div className="rounded-lg bg-indigo-50 p-4 border border-indigo-200 shadow-sm">
                <p className="text-indigo-700 font-medium">
                  Estimated annual leakage
                </p>
                <p className="mt-1 text-2xl font-semibold text-indigo-700">
                  ${animatedLoss.toLocaleString()}
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm text-slate-600 text-center">
              Oblix helps teams catch this before it becomes real spend.
            </p>

            <p className="mt-2 text-xs text-slate-500 text-center">
              Oblix typically costs a fraction of this amount annually.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-indigo-600">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center text-white">
          <h2 className="text-3xl font-semibold">
            Never miss a renewal — or lose leverage — again.
          </h2>
          <p className="mt-4 text-indigo-100">
            Oblix gives teams clarity on what they signed, what’s coming up,
            and what actually matters.
          </p>

          <div className="mt-8">
            <Link
              href={signupHref}
              className="inline-block rounded-md bg-white px-8 py-3 text-sm font-medium text-indigo-700 hover:bg-indigo-50 transition"
            >
              Start monitoring signed contracts today
            </Link>
          </div>

          <p className="mt-4 text-xs text-indigo-200">
            SOC-2 ready · Encrypted at rest · Never used for model training
          </p>
        </div>
      </section>
    </main>
  );
}
