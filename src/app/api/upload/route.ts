import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

import { analyzeContract } from "@/lib/contractParser";
import { computeContractDates } from "@/lib/contractDates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ================= HELPERS ================= */

function hashBuffer(buffer: Buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

/* ================= ROUTE ================= */

export async function POST(req: Request) {
  try {
    /* ================= AUTH ================= */

    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const accessToken = authHeader.replace("Bearer ", "");

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    /* ================= FILES ================= */

    const formData = await req.formData();
    const files = formData.getAll("files");

    if (!files.length) {
      return NextResponse.json(
        { error: "No files uploaded" },
        { status: 400 }
      );
    }

    /* ================= PROCESS ================= */

    for (const file of files) {
      if (!(file instanceof Blob)) continue;

      // Read once
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileHash = hashBuffer(buffer);

      /* ---------- DEDUP ---------- */

      const { data: existing } = await supabase
        .from("contracts")
        .select("id")
        .eq("user_id", user.id)
        .eq("file_hash", fileHash)
        .maybeSingle();

      if (existing) {
        continue;
      }

      /* ---------- STORAGE ---------- */

      const storagePath = `${user.id}/${crypto.randomUUID()}.pdf`;

      const { error: storageError } = await supabase.storage
        .from("contracts")
        .upload(storagePath, buffer, {
          contentType: "application/pdf",
          upsert: false,
        });

      if (storageError) {
        continue;
      }

      /* ---------- PARSER ---------- */

      const fd = new FormData();
      fd.append(
        "file",
        new Blob([buffer], { type: "application/pdf" }),
        file.name
      );

      const parserRes = await fetch(process.env.PARSER_URL!, {
        method: "POST",
        body: fd,
      });

      if (!parserRes.ok) {
        continue;
      }

      const parsed = await parserRes.json();

      /* ---------- ANALYSIS ---------- */

      const analysis = analyzeContract(parsed.text);

      /* ---------- DATES ---------- */

      const dates = computeContractDates(
        analysis.effectiveDate,
        analysis.termMonths,
        analysis.noticeDays
      );

      /* ---------- CONTRACT INSERT ---------- */

      const { data: contract, error: insertError } = await supabase
        .from("contracts")
        .insert({
          user_id: user.id,
          file_name: file.name,
          storage_path: storagePath,
          file_hash: fileHash,

          effective_date: analysis.effectiveDate,
          term_months: analysis.termMonths,
          auto_renew: analysis.autoRenew,
          notice_days: analysis.noticeDays,

          contract_end_date: dates?.endDate ?? null,
          notice_deadline: dates?.noticeDeadline ?? null,
          alerts: dates?.alerts ?? null,
        })
        .select()
        .single();

      if (insertError) {
        if (insertError.code === "23505") {
          continue;
        }
        throw insertError;
      }

      /* ---------- ALERT QUEUE (REAL ALERTS) ---------- */

      if (dates?.alerts?.length) {
        const alertRows = dates.alerts.map((a: any) => ({
          contract_id: contract.id,
          user_id: user.id,
          alert_date: a.date,
          days_before: a.daysBefore,
        }));

        await supabase.from("alert_queue").insert(alertRows);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Upload failed" },
      { status: 500 }
    );
  }
}
