import type { Metadata } from "next";
import ListDetailView from "@/components/lists/ListDetailView";

export const metadata: Metadata = { title: "List" };

export default function ListDetailPage({ params }: { params: { id: string } }) {
  return <ListDetailView listId={params.id} />;
}
