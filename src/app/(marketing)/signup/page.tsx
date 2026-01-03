"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async () => {
    if (!email) return;
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Brand + Value */}
        <div className="mb-8 text-center">
          <div className="mx-auto h-11 w-11 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-semibold shadow-sm">
            O
          </div>

          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">
            Oblix
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            Never miss a contract obligation again.
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Upload contracts. Oblix tracks renewals, deadlines, and risk
            automatically.
          </p>
        </div>

        {/* Signup Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.18)] p-8">
          {!sent ? (
            <>
              <h2 className="text-lg font-semibold text-slate-900">
                Get started free
              </h2>

              <p className="mt-1 text-sm text-slate-600">
                Secure magic link login. No password. No credit card.
              </p>

              <div className="mt-6 space-y-4">
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />

                {error && (
                  <p className="text-sm text-red-600">{error}</p>
                )}

                <button
                  onClick={handleSignup}
                  disabled={loading || !email}
                  className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-medium text-white hover:bg-indigo-700 transition disabled:opacity-50"
                >
                  {loading ? "Sending magic link…" : "Continue →"}
                </button>

                <p className="text-xs text-slate-500 text-center">
                  Free up to 5 contracts. No credit card.
                </p>
              </div>

              <div className="mt-6 text-xs text-slate-500 text-center">
                Next: upload your first contract. Alerts activate automatically.
              </div>

              <div className="mt-4 text-[11px] text-slate-400 text-center">
                By continuing, you agree to the{" "}
                <span className="underline cursor-pointer">Terms</span> and{" "}
                <span className="underline cursor-pointer">Privacy Policy</span>.
              </div>
            </>
          ) : (
            <div className="text-center py-10">
              <h2 className="text-lg font-semibold text-slate-900">
                Check your email
              </h2>

              <p className="mt-2 text-sm text-slate-600">
                A secure login link was sent to
              </p>

              <p className="mt-1 text-sm font-medium text-slate-900">
                {email}
              </p>

              <p className="mt-4 text-xs text-slate-500">
                After login, you’ll upload your first contract and set alerts in
                under two minutes.
              </p>
            </div>
          )}
        </div>

        {/* Micro proof */}
        <p className="mt-6 text-center text-xs text-slate-400">
          Built for operators managing real obligations
        </p>
      </div>
    </div>
  );
}
