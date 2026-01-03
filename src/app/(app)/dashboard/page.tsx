"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

/* ================= TYPES ================= */

type Status = "action_needed" | "auto_renewal_risk" | "safe";

type Contract = {
  id: string;
  file_name: string;
  organization: string | null;
  created_at: string;

  effective_date: string | null;
  contract_end_date: string | null;
  notice_deadline: string | null;
  auto_renew: boolean | null;
  notice_days: number | null;

  status: Status;

  archived_at?: string | null;
  file_path?: string | null;
};

/* ================= PAGE ================= */

export default function DashboardPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);

  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [parsing, setParsing] = useState(false);

  const [selectedContract, setSelectedContract] =
    useState<Contract | null>(null);

  const [statusFilter, setStatusFilter] =
    useState<Status | "all">("all");

  const [editingName, setEditingName] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ================= SESSION HELPERS ================= */

  async function getValidSession() {
    let { data } = await supabase.auth.getSession();

    if (!data.session?.access_token) {
      await supabase.auth.refreshSession();
      data = await supabase.auth.getSession();
    }

    return data.session;
  }

  /* ================= DATA ================= */

  async function fetchContracts() {
    setLoading(true);

    const session = await getValidSession();
    if (!session?.access_token) {
      setLoading(false);
      return;
    }

    const res = await fetch("/api/contracts", {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    if (!res.ok) {
      setLoading(false);
      return;
    }

    const data = await res.json();
    if (Array.isArray(data)) {
      setContracts(data);

    }

    setLoading(false);
  }

  /* ================= AUTH AWARE FETCH ================= */

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        fetchContracts();
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) fetchContracts();
    });

    return () => subscription.unsubscribe();
  }, []);

  /* ================= UPLOAD ================= */

  async function handleUpload(selectedFiles?: File[]) {
    const uploadFiles = selectedFiles ?? files;
    if (!uploadFiles.length) return;

    const session = await getValidSession();
    if (!session?.access_token) return;

    setUploading(true);
    setParsing(true);

    const formData = new FormData();
    uploadFiles.forEach((f) => formData.append("files", f));

    await fetch("/api/upload", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    setUploading(false);
    setParsing(false);
    setFiles([]);

    await fetchContracts();
  }

  /* ================= ACTION HELPERS ================= */

  async function updateContract(
    id: string,
    updates: Partial<Contract>
  ) {
    await supabase.from("contracts").update(updates).eq("id", id);
    fetchContracts();
  }

  async function archiveContract(id: string) {
    await updateContract(id, {
      archived_at: new Date().toISOString(),
    });
    setSelectedContract(null);
  }

  async function viewPdf(path?: string | null) {
  if (!path) return;

  const { data, error } = await supabase.storage
    .from("contracts")
    .createSignedUrl(path, 300);

  if (error || !data?.signedUrl) {
    console.error("PDF access failed", error);
    return;
  }

  window.open(data.signedUrl, "_blank");
}


  const isEmpty = !loading && contracts.length === 0;

  /* ================= STATS ================= */

  const actionNeeded = contracts.filter(
    (c) => c.status === "action_needed"
  ).length;

  const autoRenewRisk = contracts.filter(
    (c) => c.status === "auto_renewal_risk"
  ).length;

  /* ================= UI ================= */

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* HEADER */}
      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4 flex justify-between items-center">
          <span className="font-semibold tracking-tight">Oblix</span>
          <button
            onClick={() => supabase.auth.signOut()}
            className="text-sm text-slate-600 hover:text-slate-900"
          >
            Sign out
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10 space-y-10">
        {/* STATS */}
        <div>
          <div className="grid grid-cols-4 gap-6">
            <StatCard label="Active Contracts" value={contracts.length} />
            <StatCard
              label="Action Needed"
              value={actionNeeded}
              sub="Upcoming notice deadlines"
            />
            <StatCard
              label="Auto-Renewal Risk"
              value={autoRenewRisk}
              sub="Silent renewals"
            />
            <StatCard
              label="Safe"
              value={contracts.length - actionNeeded - autoRenewRisk}
            />
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Based on analyzed contracts.
          </p>
        </div>

        {/* PRIMARY ACTION */}
        <div className="rounded-xl bg-white border p-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              Upload a signed contract
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Oblix continuously monitors contracts to prevent silent
              auto-renewals and missed notice deadlines.
            </p>
          </div>

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-6 py-3 rounded-md bg-slate-900 text-white text-sm hover:bg-slate-800 disabled:opacity-50"
          >
            {uploading ? "Analyzing…" : "Upload & analyze contract"}
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            hidden
            onChange={async (e) => {
              const selected = Array.from(e.target.files || []);
              if (!selected.length) return;

              setFiles(selected);
              await new Promise((r) => setTimeout(r, 0));
              handleUpload(selected);
            }}
          />
        </div>

        <div className="grid grid-cols-12 gap-10">
          {/* LEFT */}
          <div className="col-span-7 space-y-6">
            <h1 className="text-2xl font-semibold">Contracts</h1>

            <div className="flex gap-2">
              {(
                ["all", "action_needed", "auto_renewal_risk", "safe"] as const
              ).map((f) => (
                <button
                  key={f}
                  onClick={() => setStatusFilter(f)}
                  className={`px-3 py-1 rounded text-sm capitalize ${
                    statusFilter === f
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {f.replace("_", " ")}
                </button>
              ))}
            </div>

            <p className="text-sm text-slate-500">
              Click a contract to view details
            </p>

            {loading ? (
              <p className="text-slate-500">Loading…</p>
            ) : isEmpty ? (
              <div className="rounded-xl bg-white border p-12 text-center">
                No contracts yet
              </div>
            ) : (
              <div className="rounded-xl bg-white border overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="px-6 py-4 text-left">Contract</th>
                      <th className="px-6 py-4 text-left">Organization</th>
                      <th className="px-6 py-4 text-left">Renewal</th>
                      <th className="px-6 py-4 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contracts
                      .filter((c) =>
                        statusFilter === "all"
                          ? true
                          : c.status === statusFilter
                      )
                      .map((c) => (
                        <tr
                          key={c.id}
                          onClick={() => setSelectedContract(c)}
                          className={`border-t cursor-pointer hover:bg-slate-50 ${
                            selectedContract?.id === c.id
                              ? "bg-slate-100"
                              : ""
                          }`}
                        >
                          <td className="px-6 py-4 font-medium">
                            {c.file_name}
                          </td>
                          <td className="px-6 py-4 text-slate-600">
                            {c.organization || "—"}
                          </td>
                          <td className="px-6 py-4 text-slate-600">
                            {c.contract_end_date
                              ? new Date(
                                  c.contract_end_date
                                ).toLocaleDateString()
                              : "—"}
                          </td>
                          <td className="px-6 py-4 font-medium">
                            {c.status === "action_needed" && (
                              <span className="text-red-700">
                                Action needed
                              </span>
                            )}
                            {c.status === "auto_renewal_risk" && (
                              <span className="text-amber-700">
                                Auto-renewal risk
                              </span>
                            )}
                            {c.status === "safe" && (
                              <span className="text-slate-500">
                                Safe
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="col-span-5 space-y-6">
            <div
              className={`rounded-xl bg-white border p-6 min-h-[220px] ${
                selectedContract ? "ring-1 ring-slate-200" : ""
              }`}
            >
              {parsing ? (
                <>
                  <h3 className="font-medium">Analyzing contract</h3>
                  <p className="text-sm text-slate-600 mt-2">
                    Extracting renewals and notice deadlines.
                  </p>
                </>
              ) : !selectedContract ? (
                <>
                  <h3 className="font-medium">What Oblix is watching</h3>
                  <ul className="mt-3 text-sm text-slate-700 space-y-2">
                    <li>• Auto-renewals</li>
                    <li>• Notice deadlines</li>
                    <li>• End dates</li>
                    <li>• Risk windows</li>
                  </ul>
                </>
              ) : (
                <>
                  {/* RENAME */}
                  {editingName ? (
                    <input
                      className="border px-2 py-1 text-sm w-full"
                      defaultValue={selectedContract.file_name}
                      autoFocus
                      onBlur={(e) => {
                        updateContract(selectedContract.id, {
                          file_name: e.target.value,
                        });
                        setEditingName(false);
                      }}
                    />
                  ) : (
                    <h3
                      className="font-semibold text-lg cursor-pointer"
                      onClick={() => setEditingName(true)}
                    >
                      {selectedContract.file_name}
                    </h3>
                  )}

                  {/* ACTIONS */}
                  <div className="mt-3 flex gap-4 text-sm">
                    <button
                      onClick={() =>
                        viewPdf(selectedContract.file_path)
                      }
                      className="underline"
                    >
                      View PDF
                    </button>
                    <button
                      onClick={() =>
                        archiveContract(selectedContract.id)
                      }
                      className="text-red-600 underline"
                    >
                      Archive
                    </button>
                  </div>

                  {/* MANUAL OVERRIDES */}
                  <div className="mt-6 space-y-3 text-sm">
                    <label className="block">
                      End date
                      <input
                        type="date"
                        className="block w-full border px-2 py-1"
                        value={
                          selectedContract.contract_end_date || ""
                        }
                        onChange={(e) =>
                          updateContract(selectedContract.id, {
                            contract_end_date: e.target.value,
                          })
                        }
                      />
                    </label>

                    <label className="block">
                      Notice deadline
                      <input
                        type="date"
                        className="block w-full border px-2 py-1"
                        value={
                          selectedContract.notice_deadline || ""
                        }
                        onChange={(e) =>
                          updateContract(selectedContract.id, {
                            notice_deadline: e.target.value,
                          })
                        }
                      />
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={!!selectedContract.auto_renew}
                        onChange={(e) =>
                          updateContract(selectedContract.id, {
                            auto_renew: e.target.checked,
                          })
                        }
                      />
                      Auto-renew enabled
                    </label>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: number;
  sub?: string;
}) {
  return (
    <div className="rounded-xl bg-white border p-6">
      <p className="text-sm text-slate-600">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-900">
        {value}
      </p>
      {sub && <p className="mt-1 text-xs text-slate-500">{sub}</p>}
    </div>
  );
}
