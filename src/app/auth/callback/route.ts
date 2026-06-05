import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("[auth/callback] exchangeCodeForSession error:", error.message);
      return NextResponse.redirect(`${origin}/auth?error=${encodeURIComponent(error.message)}`);
    }

    return NextResponse.redirect(`${origin}/profile`);
  }

  console.error("[auth/callback] no code in URL");
  return NextResponse.redirect(`${origin}/auth?error=no_code`);
}
