import { createBrowserClient } from "@supabase/ssr";

// Browser client — stores session & PKCE verifier in cookies (accessible server-side)
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
