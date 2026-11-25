import type { Metadata } from "next";
import SupportView from "@/components/support/SupportView";

export const metadata: Metadata = { title: "Help & support" };

export default function SupportPage() {
  return <SupportView />;
}
