import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SUPPORTED_LOCALES = ["en", "tr"];
const DEFAULT_LOCALE = "en";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Match /resources/docs routes
  if (pathname === "/resources/docs" || pathname.startsWith("/resources/docs/")) {
    const segments = pathname.split("/").filter(Boolean);
    // segments[0] = 'resources', segments[1] = 'docs'
    const firstSubSegment = segments[2];

    // Check if first subsegment is already a supported locale code
    if (!firstSubSegment || !SUPPORTED_LOCALES.includes(firstSubSegment)) {
      // Determine preferred locale from cookie or accept-language
      let locale = request.cookies.get("pheron_language")?.value;
      if (!locale || !SUPPORTED_LOCALES.includes(locale)) {
        const acceptLang = request.headers.get("accept-language") || "";
        locale = acceptLang.toLowerCase().includes("tr") ? "tr" : DEFAULT_LOCALE;
      }

      const restOfPath = segments.slice(2).join("/");
      const redirectUrl = new URL(
        `/resources/docs/${locale}${restOfPath ? `/${restOfPath}` : ""}`,
        request.url
      );
      return NextResponse.redirect(redirectUrl, 307);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/resources/docs", "/resources/docs/:path*"],
};
