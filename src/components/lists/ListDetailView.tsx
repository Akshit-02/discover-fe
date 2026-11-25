"use client";

import { useCallback, useDeferredValue, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowsDownUp,
  Compass,
  DownloadSimple,
  FolderSimple,
  MagnifyingGlass,
  PencilSimple,
  Rows,
  SquaresFour,
  Trash,
  X,
} from "@phosphor-icons/react";
import CreatorCard from "@/components/creators/CreatorCard";
import CreatorDrawer from "@/components/creators/CreatorDrawer";
import CreatorTable from "@/components/creators/CreatorTable";
import { CardSkeletons, LoadError, StatePanel } from "@/components/discover/States";
import Button from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import Spinner from "@/components/ui/Spinner";
import { useToast } from "@/components/ui/Toaster";
import { MAX_CREATORS_PER_LIST } from "@/lib/models/list";
import { Creator } from "@/lib/models/creator";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchListCreators, fetchLists, removeCreatorFromList } from "@/lib/store/slices/listsSlice";
import { cn } from "@/lib/utils/cn";
import { searchLoaded, SORT_OPTIONS, SortKey, sortLoaded } from "@/lib/utils/creatorFilters";

type ListSort = SortKey | "ADDED";
import { downloadCreatorsCsv } from "@/lib/utils/csv";
import { displayName, formatCompact, formatRelative } from "@/lib/utils/format";
import DeleteListModal from "./DeleteListModal";
import ListFormModal from "./ListFormModal";
import { listGradient } from "./listVisuals";

type View = "grid" | "table";

const ListDetailView = ({ listId }: { listId: string }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const toast = useToast();
  const { items: lists, loaded: listsLoaded, loading: listsLoading } = useAppSelector((s) => s.lists);
  const entry = useAppSelector((s) => s.lists.creators[listId]);
  const list = lists.find((l) => l.id === listId);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<ListSort>("ADDED");
  const [view, setView] = useState<View>("grid");
  const [selected, setSelected] = useState<Creator | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    if (!listsLoaded && !listsLoading) dispatch(fetchLists());
  }, [dispatch, listsLoaded, listsLoading]);

  useEffect(() => {
    dispatch(fetchListCreators({ listId }));
  }, [dispatch, listId]);

  const creators = useMemo(() => entry?.items ?? [], [entry?.items]);
  const deferredSearch = useDeferredValue(search);
  const results = useMemo(() => {
    const filtered = searchLoaded(creators, deferredSearch);
    return sort === "ADDED" ? filtered : sortLoaded(filtered, sort);
  }, [creators, deferredSearch, sort]);

  const closeDrawer = useCallback(() => setSelected(null), []);

  const remove = async (creator: Creator) => {
    const result = await dispatch(removeCreatorFromList({ listId, creatorId: creator.id }));
    if (result.meta.requestStatus === "rejected") toast(result.payload as string, "error");
    else toast(`Removed ${displayName(creator)}`, "info");
  };

  const renderRemove = (creator: Creator) => (
    <button
      onClick={(e) => {
        e.stopPropagation();
        remove(creator);
      }}
      aria-label={`Remove ${displayName(creator)} from list`}
      title="Remove from this list"
      className="flex h-9 w-9 items-center justify-center rounded-xl border border-sand-200 bg-white text-charcoal-300 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600"
    >
      <X size={16} weight="bold" />
    </button>
  );

  if (listsLoaded && !list) {
    return (
      <div className="mx-auto max-w-[1520px] space-y-6">
        <StatePanel
          icon={<FolderSimple size={30} weight="duotone" />}
          title="List not found"
          description="This list doesn't exist or may have been deleted."
          action={
            <Link href="/dashboard/lists">
              <Button variant="secondary" leftIcon={<ArrowLeft size={16} weight="bold" />}>
                Back to my lists
              </Button>
            </Link>
          }
        />
      </div>
    );
  }

  const reach = creators.reduce((sum, c) => sum + (c.followers ?? 0), 0);
  const initialLoading = !entry || (entry.loading && !entry.loaded);

  return (
    <div className="mx-auto max-w-[1520px] space-y-6">
      <Link
        href="/dashboard/lists"
        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-charcoal-400 transition-colors hover:text-charcoal"
      >
        <ArrowLeft size={15} weight="bold" /> My lists
      </Link>

      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex min-w-0 animate-fade-up items-start gap-4">
          <span
            className={cn(
              "flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-soft",
              list ? listGradient(list.id) : "from-sand-200 to-sand-300",
            )}
          >
            <FolderSimple size={30} weight="fill" />
          </span>
          <div className="min-w-0">
            <h1 className="truncate font-display text-[32px] font-medium leading-tight tracking-[-0.02em] text-charcoal sm:text-[38px]">
              {list?.name ?? "Loading…"}
            </h1>
            {list?.description && <p className="mt-1 max-w-2xl text-[15px] text-charcoal-400">{list.description}</p>}
            {list && (
              <p className="mt-2 text-[13px] font-medium text-charcoal-400">
                <span className="font-bold text-charcoal">
                  {list.creatorCount}/{MAX_CREATORS_PER_LIST}
                </span>{" "}
                creators
                {creators.length > 0 && <> · {formatCompact(reach)} combined reach</>} · Updated{" "}
                {formatRelative(list.updatedAt)}
              </p>
            )}
          </div>
        </div>
        {list && (
          <div className="flex flex-wrap gap-2">
            <Button variant="ghost" leftIcon={<Trash size={17} weight="bold" />} onClick={() => setDeleteOpen(true)}>
              Delete
            </Button>
            <Button variant="secondary" leftIcon={<PencilSimple size={17} weight="bold" />} onClick={() => setEditOpen(true)}>
              Edit
            </Button>
            <Button
              variant="dark"
              leftIcon={<DownloadSimple size={17} weight="bold" />}
              disabled={!creators.length}
              onClick={() => downloadCreatorsCsv(creators, `kudozz-${list.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.csv`)}
            >
              Export CSV
            </Button>
          </div>
        )}
      </div>

      {list && list.creatorCount >= MAX_CREATORS_PER_LIST && (
        <div className="flex animate-fade-up items-start gap-3 rounded-2xl border border-tangerine/40 bg-tangerine-50 px-4 py-3 text-[13.5px] font-medium text-charcoal-600">
          <FolderSimple size={18} weight="fill" className="mt-0.5 shrink-0 text-tangerine-600" />
          This list has reached the maximum of {MAX_CREATORS_PER_LIST} creators. Remove someone or start a new list
          to add more.
        </div>
      )}

      {creators.length > 0 && (
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="group flex h-[52px] flex-1 items-center gap-3 rounded-2xl border border-sand-200 bg-white px-4 shadow-soft transition-all focus-within:border-coral focus-within:ring-4 focus-within:ring-coral/15">
            <MagnifyingGlass size={20} weight="bold" className="text-charcoal-300 group-focus-within:text-coral" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search this list…"
              className="h-full flex-1 bg-transparent text-[15px] text-charcoal placeholder:text-charcoal-300 focus:outline-none"
              aria-label="Search this list"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="rounded-lg p-1 text-charcoal-300 hover:bg-sand-100 hover:text-charcoal"
                aria-label="Clear search"
              >
                <X size={16} weight="bold" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Dropdown
              value={sort}
              options={[{ value: "ADDED" as ListSort, label: "Recently added" }, ...SORT_OPTIONS]}
              onChange={setSort}
              prefix="Sort:"
              icon={<ArrowsDownUp size={16} weight="bold" className="text-charcoal-400" />}
            />
            <div className="flex h-10 items-center rounded-xl border border-sand-200 bg-white p-1 shadow-soft">
              {([
                ["grid", SquaresFour, "Grid view"],
                ["table", Rows, "Table view"],
              ] as const).map(([value, Icon, label]) => (
                <button
                  key={value}
                  onClick={() => setView(value)}
                  aria-label={label}
                  aria-pressed={view === value}
                  className={cn(
                    "flex h-8 w-9 items-center justify-center rounded-lg transition-all",
                    view === value ? "bg-charcoal text-white shadow-soft" : "text-charcoal-400 hover:text-charcoal",
                  )}
                >
                  <Icon size={17} weight={view === value ? "fill" : "bold"} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {initialLoading ? (
        <CardSkeletons count={4} />
      ) : entry?.error && !creators.length ? (
        <LoadError message={entry.error} onRetry={() => dispatch(fetchListCreators({ listId }))} />
      ) : !creators.length ? (
        <StatePanel
          icon={<Compass size={30} weight="duotone" />}
          title="No creators in this list yet"
          description="Head to Discover and use the folder button on any creator to add them here."
          action={
            <Button leftIcon={<Compass size={18} weight="bold" />} onClick={() => router.push("/dashboard/discover")}>
              Discover creators
            </Button>
          }
        />
      ) : !results.length ? (
        <StatePanel
          icon={<MagnifyingGlass size={30} weight="duotone" />}
          title="No matches in this list"
          description="Try a different name, handle, niche or city."
          action={
            <Button variant="secondary" onClick={() => setSearch("")}>
              Clear search
            </Button>
          }
        />
      ) : view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {results.map((creator, i) => (
            <CreatorCard key={creator.id} creator={creator} onOpen={setSelected} index={i} renderAction={renderRemove} />
          ))}
        </div>
      ) : (
        <CreatorTable creators={results} onOpen={setSelected} renderAction={renderRemove} />
      )}

      {entry?.nextToken && (
        <div className="flex justify-center py-4">
          {entry.loadingMore ? (
            <span className="inline-flex items-center gap-2 text-sm font-medium text-charcoal-400">
              <Spinner className="h-4 w-4 text-coral" /> Loading more…
            </span>
          ) : (
            <Button
              variant="secondary"
              onClick={() => dispatch(fetchListCreators({ listId, nextToken: entry.nextToken }))}
            >
              Load more creators
            </Button>
          )}
        </div>
      )}

      <ListFormModal open={editOpen} list={list} onClose={() => setEditOpen(false)} />
      <DeleteListModal
        list={deleteOpen ? list ?? null : null}
        onClose={() => setDeleteOpen(false)}
        onDeleted={() => router.replace("/dashboard/lists")}
      />
      <CreatorDrawer creator={selected} onClose={closeDrawer} />
    </div>
  );
};

export default ListDetailView;
