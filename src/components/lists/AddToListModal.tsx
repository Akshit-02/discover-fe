"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Check, FolderSimple, MagnifyingGlass, Plus } from "@phosphor-icons/react";
import CreatorAvatar from "@/components/creators/CreatorAvatar";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Spinner from "@/components/ui/Spinner";
import { useToast } from "@/components/ui/Toaster";
import { MAX_CREATORS_PER_LIST, UserList } from "@/lib/models/list";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  addCreatorToList,
  closeListPicker,
  createList,
  fetchCreatorListIds,
  fetchLists,
  removeCreatorFromList,
} from "@/lib/store/slices/listsSlice";
import { cn } from "@/lib/utils/cn";
import { displayName } from "@/lib/utils/format";
import { listGradient } from "./listVisuals";

const AddToListModal = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const creator = useAppSelector((s) => s.lists.pickerCreator);
  const { items: lists, loaded, loading, error } = useAppSelector((s) => s.lists);
  const membership = useAppSelector((s) => (creator ? s.lists.membership[creator.id] : undefined));
  const membershipLoading = useAppSelector((s) => (creator ? s.lists.membershipLoading[creator.id] : false));
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState<Record<string, boolean>>({});
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (!creator) return;
    setQuery("");
    if (!loaded && !loading) dispatch(fetchLists());
    dispatch(fetchCreatorListIds(creator.id));
  }, [creator, dispatch, loaded, loading]);

  const selected = useMemo(() => new Set(membership ?? []), [membership]);
  const trimmed = query.trim();
  const filtered = lists.filter((l) => l.name.toLowerCase().includes(trimmed.toLowerCase()));
  const exactMatch = lists.some((l) => l.name.toLowerCase() === trimmed.toLowerCase());

  if (!creator) return null;
  const name = displayName(creator);
  const close = () => dispatch(closeListPicker());

  const toggle = async (list: UserList) => {
    if (busy[list.id]) return;
    if (!selected.has(list.id) && list.creatorCount >= MAX_CREATORS_PER_LIST) {
      toast(`“${list.name}” is full (${MAX_CREATORS_PER_LIST} creators max)`, "error");
      return;
    }
    setBusy((b) => ({ ...b, [list.id]: true }));
    const isIn = selected.has(list.id);
    const result = isIn
      ? await dispatch(removeCreatorFromList({ listId: list.id, creatorId: creator.id }))
      : await dispatch(addCreatorToList({ listId: list.id, creator }));
    setBusy((b) => ({ ...b, [list.id]: false }));
    if (result.meta.requestStatus === "rejected") toast(result.payload as string, "error");
    else toast(isIn ? `Removed from “${list.name}”` : `Added to “${list.name}”`, isIn ? "info" : "success");
  };

  const createAndAdd = async () => {
    if (!trimmed || creating) return;
    setCreating(true);
    const created = await dispatch(createList({ name: trimmed }));
    if (created.meta.requestStatus === "rejected") {
      setCreating(false);
      toast(created.payload as string, "error");
      return;
    }
    const list = created.payload as UserList;
    const added = await dispatch(addCreatorToList({ listId: list.id, creator }));
    setCreating(false);
    setQuery("");
    if (added.meta.requestStatus === "rejected") toast(added.payload as string, "error");
    else toast(`Created “${list.name}” and added ${name}`);
  };

  const showSpinner = (loading && !loaded) || (membershipLoading && !membership);

  return (
    <Modal
      open
      onClose={close}
      title="Save to list"
      description={
        <span className="mt-1 flex items-center gap-2">
          <CreatorAvatar name={name} username={creator.username} size="sm" />
          <span className="min-w-0 truncate">
            <span className="font-semibold text-charcoal">{name}</span>{" "}
            <span className="text-charcoal-400">@{creator.username}</span>
          </span>
        </span>
      }
      footer={
        <>
          <Link
            href="/dashboard/lists"
            onClick={close}
            className="mr-auto inline-flex items-center text-[13px] font-semibold text-charcoal-400 hover:text-charcoal"
          >
            Manage lists
          </Link>
          <Button onClick={close}>Done</Button>
        </>
      }
    >
      <div className="flex h-11 items-center gap-2.5 rounded-xl border border-sand-200 bg-white px-3.5 transition-all focus-within:border-coral focus-within:ring-4 focus-within:ring-coral/15">
        <MagnifyingGlass size={17} weight="bold" className="text-charcoal-300" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && trimmed && !exactMatch) {
              e.preventDefault();
              createAndAdd();
            }
          }}
          placeholder={lists.length ? "Search lists or type a new name" : "Name your first list"}
          maxLength={80}
          className="h-full flex-1 bg-transparent text-[14.5px] placeholder:text-charcoal-300 focus:outline-none"
        />
      </div>

      <div className="mt-3 space-y-1">
        {trimmed && !exactMatch && (
          <button
            onClick={createAndAdd}
            disabled={creating}
            className="flex w-full items-center gap-3 rounded-2xl border border-dashed border-coral/40 bg-coral-50/50 px-3 py-2.5 text-left transition-colors hover:bg-coral-50"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-coral text-white">
              {creating ? <Spinner className="h-4 w-4" /> : <Plus size={18} weight="bold" />}
            </span>
            <span className="min-w-0 text-[14px] font-semibold text-coral-700">
              Create “<span className="truncate">{trimmed}</span>” and add
            </span>
          </button>
        )}

        {showSpinner ? (
          <div className="flex justify-center py-8">
            <Spinner className="h-5 w-5 text-coral" />
          </div>
        ) : error && !lists.length ? (
          <p className="py-6 text-center text-sm text-red-600">{error}</p>
        ) : !lists.length && !trimmed ? (
          <div className="flex flex-col items-center py-8 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-coral-50 text-coral">
              <FolderSimple size={24} weight="duotone" />
            </span>
            <p className="mt-3 text-sm font-semibold text-charcoal">No lists yet</p>
            <p className="mt-1 max-w-xs text-xs text-charcoal-400">
              Type a name above to create your first list and save {name} to it.
            </p>
          </div>
        ) : (
          filtered.map((list) => {
            const checked = selected.has(list.id);
            const full = !checked && list.creatorCount >= MAX_CREATORS_PER_LIST;
            return (
              <button
                key={list.id}
                onClick={() => toggle(list)}
                aria-pressed={checked}
                aria-disabled={full}
                title={full ? `This list is full (${MAX_CREATORS_PER_LIST} creators max)` : undefined}
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors",
                  checked ? "bg-coral-50/70" : full ? "cursor-not-allowed opacity-55" : "hover:bg-sand-50",
                )}
              >
                <span
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white",
                    listGradient(list.id),
                  )}
                >
                  <FolderSimple size={18} weight="fill" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14px] font-semibold text-charcoal">{list.name}</span>
                  <span className={cn("block text-xs", full ? "font-semibold text-red-500" : "text-charcoal-400")}>
                    {full ? "List full · " : ""}
                    {list.creatorCount}/{MAX_CREATORS_PER_LIST} creators
                  </span>
                </span>
                <span
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition-all",
                    checked ? "border-coral bg-coral text-white" : "border-sand-300 bg-white",
                  )}
                >
                  {busy[list.id] ? (
                    <Spinner className="h-3.5 w-3.5" />
                  ) : (
                    checked && <Check size={14} weight="bold" />
                  )}
                </span>
              </button>
            );
          })
        )}
      </div>
    </Modal>
  );
};

export default AddToListModal;
