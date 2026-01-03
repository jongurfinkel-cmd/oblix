import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendAlertEmail } from "@/lib/email";

export const runtime = "nodejs";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const now = new Date().toISOString();

  const { data: alerts } = await supabase
    .from("alert_queue")
    .select(`
      id,
      alert_date,
      days_before,
      contract:contracts (
        file_name,
        auto_renew,
        contract_end_date
      ),
      user:users (
        email
      )
    `)
    .lte("alert_date", now)
    .eq("sent", false);

  // 🔹 Cast once to satisfy TypeScript
  const typedAlerts = alerts as any[];

  if (!typedAlerts?.length) {
    return NextResponse.json({ sent: 0 });
  }

  for (const alert of typedAlerts) {
    if (!alert.user?.email) continue;

    await sendAlertEmail({
      contractName: alert.contract.file_name,
      endDate: new Date(alert.contract.contract_end_date),
      autoRenew: alert.contract.auto_renew,
      alerts: [
        {
          daysBefore: alert.days_before,
          date: new Date(alert.alert_date),
        },
      ],
      to: alert.user.email,
    });

    await supabase
      .from("alert_queue")
      .update({
        sent: true,
        sent_at: new Date().toISOString(),
      })
      .eq("id", alert.id);
  }

  return NextResponse.json({ sent: typedAlerts.length });
}
