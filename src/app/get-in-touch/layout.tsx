import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata("/get-in-touch", "Get in Touch | Pheron Agent", "Contact the Pheron Agent team.");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
