"use client";

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils/cn";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md";
}

const Modal = ({ open, onClose, title, description, children, footer, size = "md" }: ModalProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-[2px]" onClick={onClose} />
      <div
        className={cn(
          "relative flex max-h-[90vh] w-full animate-fade-up flex-col overflow-hidden rounded-t-[28px] bg-white shadow-lift sm:rounded-3xl",
          size === "sm" ? "sm:max-w-[420px]" : "sm:max-w-[520px]",
        )}
      >
        <div className="flex items-start justify-between gap-4 px-6 pb-2 pt-6">
          <div className="min-w-0">
            <h2 className="text-lg font-bold tracking-tight text-charcoal">{title}</h2>
            {description && <div className="mt-1 text-sm text-charcoal-400">{description}</div>}
          </div>
          <button
            onClick={onClose}
            className="-mr-2 -mt-1 rounded-xl p-2 text-charcoal-300 transition-colors hover:bg-sand-100 hover:text-charcoal"
            aria-label="Close"
          >
            <X size={18} weight="bold" />
          </button>
        </div>
        {children && <div className="scrollbar-thin flex-1 overflow-y-auto px-6 py-4">{children}</div>}
        {footer && <div className="flex justify-end gap-2.5 border-t border-sand-100 px-6 py-4">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
