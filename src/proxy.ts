import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SUPPORTED_LOCALES = ["en", "tr", "zh-CN", "ja", "zh-TW", "es", "fr", "pt", "ko", "de", "hi"];
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
        const acceptLang = (request.headers.get("accept-language") || "").toLowerCase();
        if (acceptLang.includes("tr")) locale = "tr";
        else if (acceptLang.includes("zh-tw") || acceptLang.includes("zh-hant") || acceptLang.includes("zh-hk")) locale = "zh-TW";
        else if (acceptLang.includes("zh")) locale = "zh-CN";
        else if (acceptLang.includes("ja")) locale = "ja";
        else if (acceptLang.includes("es")) locale = "es";
        else if (acceptLang.includes("fr")) locale = "fr";
        else if (acceptLang.includes("de")) locale = "de";
        else if (acceptLang.includes("pt")) locale = "pt";
        else if (acceptLang.includes("ko")) locale = "ko";
        else if (acceptLang.includes("hi")) locale = "hi";
        else locale = DEFAULT_LOCALE;
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
