import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  // AUTH CHECK
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // USER-SCOPED QUERY
  const { data, error } = await supabase
    .from("contracts")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
