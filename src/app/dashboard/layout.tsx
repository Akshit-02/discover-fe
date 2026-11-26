"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";
import AuthGuard from "@/components/guards/AuthGuard";
import Sidebar, { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import AddToListModal from "@/components/lists/AddToListModal";
import BuyCreditsModal from "@/components/credits/BuyCreditsModal";
import PurchaseCelebration from "@/components/credits/PurchaseCelebration";

const COLLAPSED_KEY = "kudozz.sidebarCollapsed";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // Remember the desktop preference per browser.
  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem(COLLAPSED_KEY) === "1");
    } catch {
      /* storage unavailable */
    }
  }, []);

  const toggleCollapsed = useCallback(() => {
    setCollapsed((value) => {
      try {
        localStorage.setItem(COLLAPSED_KEY, value ? "0" : "1");
      } catch {
        /* storage unavailable */
      }
      return !value;
    });
  }, []);

  // "[" toggles the sidebar, except while typing.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "[" || e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) || target.isContentEditable) return;
      e.preventDefault();
      toggleCollapsed();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [toggleCollapsed]);

  const sidebarWidth = collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH;

  return (
    <AuthGuard>
      <div className="min-h-screen bg-cream" style={{ ["--sidebar-w" as string]: `${sidebarWidth}px` }}>
        <Sidebar
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          collapsed={collapsed && !menuOpen}
          onToggleCollapsed={toggleCollapsed}
        />
        <div className="transition-[padding] duration-300 ease-out lg:pl-[var(--sidebar-w)]">
          <Topbar onMenu={() => setMenuOpen(true)} />
          <main className="px-4 pb-16 pt-6 sm:px-8">{children}</main>
        </div>
        <AddToListModal />
        <BuyCreditsModal />
        <PurchaseCelebration />
      </div>
    </AuthGuard>
  );
}
