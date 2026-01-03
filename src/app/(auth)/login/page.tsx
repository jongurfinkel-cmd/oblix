"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendLink = async () => {
    if (!email) return;

    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/callback`,
      },
    });

    setLoading(false);

    if (error) {
      console.error(error);
      setError(error.message);
      return;
    }

    setSent(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6">
      {/* Brand */}
      <div className="mb-10 flex flex-col items-center">
        <div className="h-11 w-11 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-semibold shadow-sm">
          O
        </div>
        <span className="mt-3 text-lg font-semibold tracking-tight text-slate-900">
          Oblix
        </span>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.2)] p-8">
        {!sent ? (
          <>
            <h1 className="text-2xl font-semibold text-slate-900 text-center">
              Sign in to your workspace
            </h1>
            <p className="mt-2 text-sm text-slate-600 text-center">
              Secure access to contract monitoring and alerts.
            </p>

            {/* Email */}
            <div className="mt-8">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Work email
              </label>
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="
                  w-full rounded-lg border border-slate-300 px-4 py-3 text-sm
                  text-slate-900 placeholder:text-slate-400
                  bg-white
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                  disabled:opacity-60 disabled:cursor-not-allowed
                  transition
                "
              />
            </div>

            {/* Error */}
            {error && (
              <div className="mt-4 text-sm text-red-600 text-center">
                {error}
              </div>
            )}

            {/* CTA */}
            <button
              onClick={handleSendLink}
              disabled={loading}
              className="
                mt-6 w-full rounded-lg bg-indigo-600 py-3.5 text-sm font-medium text-white
                hover:bg-indigo-700 transition
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              {loading ? "Sending link…" : "Send magic link"}
            </button>

            <p className="mt-4 text-xs text-slate-500 text-center leading-relaxed">
              We’ll email you a secure, one-time sign-in link.
              <br />
              Check spam if you don’t see it.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-semibold text-slate-900 text-center">
              Check your email
            </h1>
            <p className="mt-3 text-sm text-slate-600 text-center leading-relaxed">
              We sent a secure sign-in link to
              <br />
              <span className="font-medium text-slate-900">{email}</span>
            </p>

            <div className="mt-8 rounded-lg bg-slate-50 border border-slate-200 p-4 text-sm text-slate-600 text-center">
              Open the link to finish signing in.
              <br />
              You can close this tab.
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="mt-8 flex flex-col items-center text-sm text-slate-500">
        <Link href="/" className="hover:text-slate-900 transition">
          ← Back to Oblix
        </Link>

        <p className="mt-4 text-xs text-slate-400 text-center">
          Encrypted at rest · Secure authentication
        </p>
      </div>
    </div>
  );
}
