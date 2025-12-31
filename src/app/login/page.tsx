"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "http://localhost:3000",
      },
    });

    setSent(true);
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="border p-6 rounded w-96 space-y-4"
      >
        <h1 className="text-xl font-semibold">Sign in to LEGEND</h1>

        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2"
          required
        />

        <button className="w-full bg-black text-white py-2">
          Send magic link
        </button>

        {sent && (
          <p className="text-sm text-gray-600">
            Check your email for the login link.
          </p>
        )}
      </form>
    </main>
  );
}
