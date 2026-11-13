import type { Metadata } from "next";
import { pageMetadata } from "../../../lib/seo";

export const metadata: Metadata = pageMetadata("/resources/help", "Help & Support | Pheron Agent", "Help and support for Pheron Agent.");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
