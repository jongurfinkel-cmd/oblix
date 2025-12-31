"use client";

import { useState, useEffect } from "react";

export default function DashboardPage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [contracts, setContracts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setResult(null);

    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: fd,
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);

    fetchContracts();
  }

  function fetchContracts() {
    fetch("/api/contracts")
      .then((res) => res.json())
      .then(setContracts);
  }

  useEffect(() => {
    fetchContracts();
  }, []);

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">LEGEND Dashboard</h1>

      <form onSubmit={handleSubmit} className="mt-6 flex gap-4">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button className="bg-black text-white px-4 py-2 rounded">
          Upload
        </button>
      </form>

      {loading && <p className="mt-4">Parsing contract…</p>}

      {result?.preview && (
        <div className="mt-6 border p-4">
          <pre className="text-sm whitespace-pre-wrap">
            {result.preview}
          </pre>
        </div>
      )}

      {contracts.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Saved Contracts</h2>
          <ul className="space-y-2 text-sm">
            {contracts.map((c) => (
              <li key={c.id} className="border p-3 rounded">
                <strong>{c.file_name}</strong>
                <div>End date: {c.contract_end_date}</div>
                <div>Auto-renew: {c.auto_renew ? "Yes" : "No"}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
