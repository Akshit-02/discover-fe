"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CaretDown, Folders, List, SignOut, UserCircle } from "@phosphor-icons/react";
import Avatar from "@/components/ui/Avatar";
import CreditsMenu from "@/components/credits/CreditsMenu";
import { useSignOut } from "@/lib/hooks/useSignOut";
import { useAppSelector } from "@/lib/store/hooks";

const Topbar = ({ onMenu }: { onMenu: () => void }) => {
  const user = useAppSelector((s) => s.userDetails.user);
  const listCount = useAppSelector((s) => (s.lists.loaded ? s.lists.items.length : 0));
  const { signOut } = useSignOut();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const displayName = user?.name || user?.email?.split("@")[0] || "You";

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-30 border-b border-sand-200/70 bg-cream/80 backdrop-blur-xl">
      <div className="flex h-[72px] items-center gap-4 px-4 sm:px-8">
        <button
          onClick={onMenu}
          className="rounded-xl border border-sand-200 bg-white p-2 text-charcoal shadow-soft lg:hidden"
          aria-label="Open menu"
        >
          <List size={20} weight="bold" />
        </button>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <CreditsMenu />
          <Link
            href="/dashboard/lists"
            className="relative inline-flex h-10 items-center gap-2 rounded-xl border border-sand-200 bg-white px-3 text-[13px] font-semibold text-charcoal shadow-soft transition-colors hover:border-sand-300"
          >
            <Folders size={18} weight="duotone" className="text-coral" />
            <span className="hidden sm:inline">My lists</span>
            {listCount > 0 && (
              <span className="rounded-full bg-coral px-1.5 py-0.5 text-[10.5px] font-bold leading-none text-white">
                {listCount}
              </span>
            )}
          </Link>

          <div ref={menuRef} className="relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center gap-2 rounded-xl p-1 pr-2 transition-colors hover:bg-white"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
            >
              <Avatar name={displayName} seed={user?.id} size="sm" />
              <span className="hidden text-[13px] font-semibold text-charcoal md:inline">{displayName}</span>
              <CaretDown size={13} weight="bold" className="text-charcoal-400" />
            </button>
            {menuOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-64 animate-fade-up overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-lift"
              >
                <div className="flex items-center gap-3 border-b border-sand-100 p-4">
                  <Avatar name={displayName} seed={user?.id} size="md" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-charcoal">{displayName}</p>
                    <p className="truncate text-xs text-charcoal-400">{user?.email}</p>
                  </div>
                </div>
                <div className="p-1.5">
                  <Link
                    href="/dashboard/settings"
                    role="menuitem"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13.5px] font-medium text-charcoal-600 transition-colors hover:bg-sand-50"
                  >
                    <UserCircle size={18} weight="duotone" />
                    Account settings
                  </Link>
                  <button
                    role="menuitem"
                    onClick={signOut}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13.5px] font-semibold text-red-600 transition-colors hover:bg-red-50"
                  >
                    <SignOut size={18} weight="bold" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
