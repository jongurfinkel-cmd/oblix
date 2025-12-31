import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendAlertEmail } from "@/lib/email";

function isSameDay(a: Date, b: Date) {
  return (
    a.getUTCFullYear() === b.getUTCFullYear() &&
    a.getUTCMonth() === b.getUTCMonth() &&
    a.getUTCDate() === b.getUTCDate()
  );
}

export async function GET() {
  const today = new Date();

  const { data: contracts, error } = await supabase
    .from("contracts")
    .select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  for (const c of contracts ?? []) {
    if (!c.alerts || !Array.isArray(c.alerts)) continue;

    for (const alert of c.alerts) {
      const alertDate = new Date(alert.date);

      if (isSameDay(alertDate, today)) {
        await sendAlertEmail({
          contractName: c.file_name,
          endDate: new Date(c.contract_end_date),
          autoRenew: c.auto_renew,
          alerts: c.alerts.map((a: any) => ({
            daysBefore: a.daysBefore,
            date: new Date(a.date),
          })),
        });
      }
    }
  }

  return NextResponse.json({ success: true });
}
