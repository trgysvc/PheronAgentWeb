import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata("/download", "Download Pheron Agent for macOS", "Requires macOS 26.0+ and Apple Silicon (16 GB RAM minimum). Download and install free; purchase a license when the app asks.");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
