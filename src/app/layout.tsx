import type { Metadata, Viewport } from "next";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import ClientProviders from "../context/ClientProviders";
import "./globals.css";

const outfit = { variable: "font-outfit" };
const inter = { variable: "font-inter" };
const jetbrainsMono = { variable: "font-jetbrains-mono" };

export const metadata: Metadata = {
  title: "Pheron Agent | Native Autonomous AI Agent for macOS",
  description: "A fully autonomous, hardware-native AI agent running entirely on your Apple Silicon. Local MLX inference, ANE acceleration, and 62 integrated native tools. Privacy by design, autonomy by nature.",
  keywords: ["AI Agent", "macOS Agent", "Apple Silicon", "MLX Inference", "Local LLM", "Autonomous Agent", "Privacy AI", "Swift 6"],
  authors: [{ name: "Pheron Team" }],
  openGraph: {
    title: "Pheron Agent | Native Autonomous AI Agent for macOS",
    description: "Fully autonomous AI running entirely on Apple Silicon. Privacy by design. Zero cloud inference.",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#06060a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Outfit:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ClientProviders>
          {children}
        </ClientProviders>
        <GoogleAnalytics gaId="G-X27N6PXYTL" />
        <GoogleTagManager gtmId="GTM-5HWMNTDM" />
        <Analytics />
      </body>
    </html>
  );
}
