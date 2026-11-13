import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata("/pricing", "Pricing | Pheron Agent", "Pheron Agent runs fully on-device on Apple Silicon. Select a plan that matches your memory allocation and workflow needs.");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
