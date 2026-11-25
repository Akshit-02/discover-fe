"use client";

import { MouseEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { DotsThree, FolderSimple, PencilSimple, Plus, Trash, UsersThree } from "@phosphor-icons/react";
import { LoadError, StatePanel } from "@/components/discover/States";
import Button from "@/components/ui/Button";
import Skeleton from "@/components/ui/Skeleton";
import { MAX_CREATORS_PER_LIST, UserList } from "@/lib/models/list";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchLists } from "@/lib/store/slices/listsSlice";
import { cn } from "@/lib/utils/cn";
import { formatRelative } from "@/lib/utils/format";
import DeleteListModal from "./DeleteListModal";
import ListFormModal from "./ListFormModal";
import { listGradient } from "./listVisuals";

const ListMenu = ({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: globalThis.MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const item = (handler: () => void) => (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);
    handler();
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        aria-label="List options"
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-xl text-charcoal-300 transition-colors hover:bg-sand-100 hover:text-charcoal"
      >
        <DotsThree size={22} weight="bold" />
      </button>
      {open && (
        <div className="absolute right-0 z-20 mt-1 w-44 animate-fade-up overflow-hidden rounded-2xl border border-sand-200 bg-white p-1.5 shadow-lift">
          <button
            onClick={item(onEdit)}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13.5px] font-medium text-charcoal-600 hover:bg-sand-50"
          >
            <PencilSimple size={16} weight="bold" />
            Edit details
          </button>
          <button
            onClick={item(onDelete)}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13.5px] font-semibold text-red-600 hover:bg-red-50"
          >
            <Trash size={16} weight="bold" />
            Delete list
          </button>
        </div>
      )}
    </div>
  );
};

const ListCard = ({
  list,
  index,
  onEdit,
  onDelete,
}: {
  list: UserList;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
}) => (
  <Link
    href={`/dashboard/lists/${list.id}`}
    style={{ animationDelay: `${Math.min(index, 12) * 30}ms` }}
    className="group relative flex animate-fade-up flex-col rounded-3xl border border-sand-200/80 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-coral/30 hover:shadow-lift focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-coral/20"
  >
    <div className="flex items-start justify-between gap-3">
      <span
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-soft",
          listGradient(list.id),
        )}
      >
        <FolderSimple size={24} weight="fill" />
      </span>
      <ListMenu onEdit={onEdit} onDelete={onDelete} />
    </div>
    <h3 className="mt-4 truncate text-[17px] font-bold tracking-tight text-charcoal">{list.name}</h3>
    <p className="mt-1 line-clamp-2 min-h-[40px] text-[13.5px] leading-relaxed text-charcoal-400">
      {list.description || "No description"}
    </p>
    <div className="mt-5 flex items-center justify-between border-t border-sand-100 pt-4 text-[12.5px] font-medium">
      <span className="flex items-center gap-1.5 text-charcoal">
        <UsersThree size={16} weight="duotone" className="text-coral" />
        {list.creatorCount}/{MAX_CREATORS_PER_LIST} creators
        {list.creatorCount >= MAX_CREATORS_PER_LIST && (
          <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10.5px] font-bold text-red-600">Full</span>
        )}
      </span>
      <span className="text-charcoal-400">Updated {formatRelative(list.updatedAt)}</span>
    </div>
  </Link>
);

const ListsView = () => {
  const dispatch = useAppDispatch();
  const { items, loading, loaded, error } = useAppSelector((s) => s.lists);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<UserList | null>(null);
  const [deleting, setDeleting] = useState<UserList | null>(null);

  useEffect(() => {
    dispatch(fetchLists());
  }, [dispatch]);

  const totalCreators = items.reduce((sum, l) => sum + l.creatorCount, 0);

  return (
    <div className="mx-auto max-w-[1520px] space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="animate-fade-up">
          <h1 className="font-display text-[34px] font-medium leading-tight tracking-[-0.02em] text-charcoal sm:text-[40px]">
            My <span className="italic text-coral">lists</span>
          </h1>
          <p className="mt-1.5 max-w-xl text-[15px] text-charcoal-400">
            Organise creators into lists for each campaign, brand or brief.
            {loaded && items.length > 0 && (
              <>
                {" "}
                {items.length} {items.length === 1 ? "list" : "lists"} · {totalCreators} saved creators.
              </>
            )}
          </p>
        </div>
        <Button
          leftIcon={<Plus size={18} weight="bold" />}
          onClick={() => {
            setEditing(null);
            setFormOpen(true);
          }}
        >
          New list
        </Button>
      </div>

      {!loaded && loading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-[214px] rounded-3xl" />
          ))}
        </div>
      ) : error && !items.length ? (
        <LoadError message={error} onRetry={() => dispatch(fetchLists())} />
      ) : !items.length ? (
        <StatePanel
          icon={<FolderSimple size={30} weight="duotone" />}
          title="Create your first list"
          description="Lists help you group creators for a campaign. Add creators from Discover with the folder button on any profile."
          action={
            <Button leftIcon={<Plus size={18} weight="bold" />} onClick={() => setFormOpen(true)}>
              New list
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {items.map((list, i) => (
            <ListCard
              key={list.id}
              list={list}
              index={i}
              onEdit={() => {
                setEditing(list);
                setFormOpen(true);
              }}
              onDelete={() => setDeleting(list)}
            />
          ))}
        </div>
      )}

      <ListFormModal open={formOpen} list={editing} onClose={() => setFormOpen(false)} />
      <DeleteListModal list={deleting} onClose={() => setDeleting(null)} />
    </div>
  );
};

export default ListsView;
