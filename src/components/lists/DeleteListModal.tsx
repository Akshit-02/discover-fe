"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toaster";
import { UserList } from "@/lib/models/list";
import { useAppDispatch } from "@/lib/store/hooks";
import { deleteList } from "@/lib/store/slices/listsSlice";

interface DeleteListModalProps {
  list: UserList | null;
  onClose: () => void;
  onDeleted?: () => void;
}

const DeleteListModal = ({ list, onClose, onDeleted }: DeleteListModalProps) => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!list) return;
    setDeleting(true);
    const result = await dispatch(deleteList(list.id));
    setDeleting(false);
    if (result.meta.requestStatus === "rejected") {
      toast(result.payload as string, "error");
      return;
    }
    toast(`Deleted “${list.name}”`, "info");
    onClose();
    onDeleted?.();
  };

  return (
    <Modal
      open={Boolean(list)}
      onClose={onClose}
      size="sm"
      title={`Delete “${list?.name ?? ""}”?`}
      description={
        list?.creatorCount
          ? `This removes the list and its ${list.creatorCount} saved ${list.creatorCount === 1 ? "creator" : "creators"}. The creators themselves aren't affected.`
          : "This list will be removed permanently."
      }
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            loading={deleting}
            className="!bg-none bg-red-600 !shadow-none hover:bg-red-700"
          >
            Delete list
          </Button>
        </>
      }
    />
  );
};

export default DeleteListModal;
