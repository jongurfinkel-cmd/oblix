import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { classifyContractStatus } from "@/lib/contractStatus";

export const runtime = "nodejs";

export async function GET(req: Request) {
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

  /* ================= QUERY ================= */

  const { data: contracts, error } = await supabase
    .from("contracts")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  /* ================= STATUS ================= */

  const enriched = (contracts ?? []).map((c) => ({
    ...c,
    status: classifyContractStatus({
      auto_renew: c.auto_renew,
      notice_deadline: c.notice_deadline,
      contract_end_date: c.contract_end_date,
    }),
  }));

  return NextResponse.json(enriched);
}
