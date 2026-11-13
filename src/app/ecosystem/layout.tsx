import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata("/ecosystem", "Native Tool Ecosystem | Pheron Agent", "96 integrated native tools across file management, system automation, web, communication, vision, and developer workflows.");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
