import type { Metadata } from "next";
import ListsView from "@/components/lists/ListsView";

export const metadata: Metadata = { title: "My lists" };

export default function ListsPage() {
  return <ListsView />;
}
