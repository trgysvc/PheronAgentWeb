import type { Metadata } from "next";
import { pageMetadata } from "../../../lib/seo";

export const metadata: Metadata = pageMetadata("/product/agent", "Under the Hood | Pheron Agent", "A hardware-native autonomous AI agent for macOS, built on Swift 6 UNO architecture and running entirely on Apple Silicon via local MLX inference.");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
