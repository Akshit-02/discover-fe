import { Suspense } from "react";
import type { Metadata } from "next";
import DiscoverView from "@/components/discover/DiscoverView";
import { TableSkeleton } from "@/components/discover/States";

export const metadata: Metadata = { title: "Discover" };

export default function DiscoverPage() {
  // DiscoverView reads filters from the URL (useSearchParams).
  return (
    <Suspense fallback={<TableSkeleton />}>
      <DiscoverView />
    </Suspense>
  );
}
