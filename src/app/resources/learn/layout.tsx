import type { Metadata } from "next";
import { pageMetadata } from "../../../lib/seo";

export const metadata: Metadata = pageMetadata("/resources/learn", "Learn | Pheron Agent", "Learning resources for Pheron Agent, the native macOS AI agent.");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
