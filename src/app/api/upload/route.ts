import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { analyzeContract } from "@/lib/contractParser";
import { computeContractDates } from "@/lib/contractDates";
import { sendAlertEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file" }, { status: 400 });
    }

    const uint8Array = new Uint8Array(await file.arrayBuffer());
    const filePath = `${Date.now()}-${file.name}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("contracts")
      .upload(filePath, uint8Array, {
        contentType: file.type || "application/pdf",
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // Send PDF to Python parser
    const fd = new FormData();
    fd.append("file", new Blob([uint8Array]), file.name);

    const parserRes = await fetch(process.env.PARSER_URL!, {
      method: "POST",
      body: fd,
    });

    if (!parserRes.ok) {
      return NextResponse.json({ error: "Parser failed" }, { status: 500 });
    }

    const parsed = await parserRes.json();

    // Analyze contract
    const analysis = analyzeContract(parsed.text);

    // Compute dates
    const dates = computeContractDates(
      analysis.effectiveDate,
      analysis.termMonths,
      analysis.noticeDays
    );

    // SAVE TO DATABASE
    await supabase.from("contracts").insert({
      file_name: file.name,
      storage_path: filePath,

      effective_date: analysis.effectiveDate,
      term_months: analysis.termMonths,
      auto_renew: analysis.autoRenew,
      notice_days: analysis.noticeDays,

      contract_end_date: dates?.endDate ?? null,
      notice_deadline: dates?.noticeDeadline ?? null,
      alerts: dates?.alerts ?? null,
    });

    // Send email alert
    if (dates) {
      await sendAlertEmail({
        contractName: file.name,
        endDate: new Date(dates.endDate),
        autoRenew: analysis.autoRenew,
        alerts: dates.alerts.map((a: any) => ({
          daysBefore: a.daysBefore,
          date: new Date(a.date),
        })),
      });
    }

    return NextResponse.json({
      success: true,
      preview: parsed.preview,
      analysis,
      dates,
    });
  } catch (err: any) {
    console.error("UPLOAD ERROR:", err);
    return NextResponse.json(
      { error: err.message || "Upload failed" },
      { status: 500 }
    );
  }
}
