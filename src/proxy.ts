import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SUPPORTED_LOCALES = ["en", "tr", "zh-CN", "ja", "zh-TW", "es", "fr", "pt", "ko", "de", "hi"];
const DEFAULT_LOCALE = "en";

/**
 * Builds a strict, nonce-based Content Security Policy.
 * - No 'unsafe-inline' in script-src (Mozilla Observatory requirement).
 * - 'strict-dynamic' lets nonce-trusted scripts (Next.js runtime, GTM, GA,
 *   Vercel Analytics) load their own dependencies.
 * - Host allowlist is kept as a fallback for older browsers without CSP3.
 */
function buildCsp(nonce: string): string {
  const isDev = process.env.NODE_ENV === "development";
  return `
    default-src 'none';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://vercel.live https://www.googletagmanager.com https://www.google-analytics.com${isDev ? " 'unsafe-eval'" : ""};
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https://www.google-analytics.com https://www.googletagmanager.com;
    font-src 'self' data: https://fonts.gstatic.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    connect-src 'self' https://vercel.live wss://ws-us3.pusher.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://stats.g.doubleclick.net;
    manifest-src 'self';
    media-src 'self';
    worker-src 'self';
    upgrade-insecure-requests;
  `
    .replace(/\s{2,}/g, " ")
    .trim();
}

function getDocsLocaleRedirect(request: NextRequest): URL | null {
  const { pathname } = request.nextUrl;

  // Match /resources/docs routes
  if (pathname !== "/resources/docs" && !pathname.startsWith("/resources/docs/")) {
    return null;
  }

  const segments = pathname.split("/").filter(Boolean);
  // segments[0] = 'resources', segments[1] = 'docs'
  const firstSubSegment = segments[2];

  // Check if first subsegment is already a supported locale code
  if (firstSubSegment && SUPPORTED_LOCALES.includes(firstSubSegment)) {
    return null;
  }

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
  return new URL(`/resources/docs/${locale}${restOfPath ? `/${restOfPath}` : ""}`, request.url);
}

export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const csp = buildCsp(nonce);

  const redirectUrl = getDocsLocaleRedirect(request);
  if (redirectUrl) {
    const redirect = NextResponse.redirect(redirectUrl, 307);
    redirect.headers.set("Content-Security-Policy", csp);
    return redirect;
  }

  // Next.js reads the nonce from the request CSP header during rendering
  // and applies it to its own scripts automatically.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all page requests except:
     * - api routes
     * - _next/static, _next/image (build assets)
     * - static files in /public (images, icons, manifest, etc.)
     */
    "/((?!api|_next/static|_next/image|.*\\.(?:ico|png|jpg|jpeg|gif|webp|avif|svg|webmanifest|xml|txt|woff2?|ttf|mp4|webm|dmg|zip)$).*)",
  ],
};
