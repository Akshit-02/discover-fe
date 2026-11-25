"use client";

import { FormEvent, useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toaster";
import { UserList } from "@/lib/models/list";
import { useAppDispatch } from "@/lib/store/hooks";
import { createList, updateList } from "@/lib/store/slices/listsSlice";

const MAX_NAME = 80;
const MAX_DESCRIPTION = 300;

interface ListFormModalProps {
  open: boolean;
  onClose: () => void;
  list?: UserList | null;
  onSaved?: (list: UserList) => void;
}

const ListFormModal = ({ open, onClose, list, onSaved }: ListFormModalProps) => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const editing = Boolean(list);

  useEffect(() => {
    if (!open) return;
    setName(list?.name ?? "");
    setDescription(list?.description ?? "");
    setError(null);
  }, [open, list]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Give your list a name");
      return;
    }
    setSaving(true);
    setError(null);
    const input = { name: trimmed, description: description.trim() };
    const result = list
      ? await dispatch(updateList({ id: list.id, input }))
      : await dispatch(createList(input));
    setSaving(false);
    if (result.meta.requestStatus === "rejected") {
      setError(result.payload as string);
      return;
    }
    const saved = result.payload as UserList;
    toast(editing ? "List updated" : `Created “${saved.name}”`);
    onSaved?.(saved);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="sm"
      title={editing ? "Edit list" : "Create a new list"}
      description={editing ? undefined : "Group creators by campaign, niche or brief."}
    >
      <form id="list-form" onSubmit={handleSubmit} className="space-y-4 pb-2" noValidate>
        <Input
          label="List name"
          name="listName"
          placeholder="e.g. Diwali campaign – beauty"
          value={name}
          maxLength={MAX_NAME}
          onChange={(e) => setName(e.target.value)}
          error={error}
          autoFocus
        />
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="listDescription" className="text-[13px] font-semibold text-charcoal-700">
              Description <span className="font-medium text-charcoal-300">(optional)</span>
            </label>
            <span className="text-xs text-charcoal-300">
              {description.length}/{MAX_DESCRIPTION}
            </span>
          </div>
          <textarea
            id="listDescription"
            rows={3}
            maxLength={MAX_DESCRIPTION}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What's this list for?"
            className="w-full resize-none rounded-xl border border-sand-200 bg-white px-3.5 py-3 text-[15px] text-charcoal placeholder:text-charcoal-300 transition-all hover:border-sand-300 focus:border-coral focus:outline-none focus:ring-4 focus:ring-coral/15"
          />
        </div>
        <div className="flex justify-end gap-2.5 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={saving}>
            {editing ? "Save changes" : "Create list"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ListFormModal;
