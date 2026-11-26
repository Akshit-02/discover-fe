"use client";

import { useState } from "react";
import { Check, Copy } from "@phosphor-icons/react";

/** Copies a template block's text. The text itself is server-rendered next to it, so this is progressive enhancement. */
const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be unavailable (insecure context, permissions); the text stays selectable.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 rounded-lg border border-sand-300 bg-white px-2.5 py-1.5 text-[12.5px] font-semibold text-charcoal-600 transition-colors hover:border-coral-300 hover:text-coral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50"
    >
      {copied ? <Check size={14} weight="bold" aria-hidden /> : <Copy size={14} weight="bold" aria-hidden />}
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
};

export default CopyButton;
