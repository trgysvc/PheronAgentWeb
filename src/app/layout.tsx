import type { Metadata, Viewport } from "next";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { Outfit, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Pheron Agent | Native Autonomous AI Agent for macOS",
  description: "A fully autonomous, hardware-native AI agent running entirely on your Apple Silicon. Local MLX inference, ANE acceleration, and 50+ native tools. Privacy by design, autonomy by nature.",
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
      <body>
        {children}
        <GoogleAnalytics gaId="G-X27N6PXYTL" />
        <GoogleTagManager gtmId="GTM-5HWMNTDM" />
        <Analytics />
      </body>
    </html>
  );
}
