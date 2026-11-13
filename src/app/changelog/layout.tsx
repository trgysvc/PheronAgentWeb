import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata("/changelog", "Changelog | Pheron Agent", "All notable changes to Pheron Agent, release by release.");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
