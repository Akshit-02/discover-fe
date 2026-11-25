"use client";

import { FocusEvent, MouseEvent, ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowSquareOut,
  SidebarSimple,
  SignOut,
  X,
} from "@phosphor-icons/react";
import { PARENT_SITE_LABEL, PARENT_SITE_URL } from "@/config/brand";
import Avatar from "@/components/ui/Avatar";
import Logo from "@/components/ui/Logo";
import Spinner from "@/components/ui/Spinner";
import { useSignOut } from "@/lib/hooks/useSignOut";
import { useAppSelector } from "@/lib/store/hooks";
import { cn } from "@/lib/utils/cn";
import { NAV_ITEMS, UPCOMING_ITEMS } from "./navItems";

export const SIDEBAR_WIDTH = 272;
export const SIDEBAR_COLLAPSED_WIDTH = 84;

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  /** Desktop icon-rail mode. The layout passes false while the mobile drawer is open. */
  collapsed: boolean;
  onToggleCollapsed: () => void;
}

const SectionLabel = ({
  collapsed,
  children,
}: {
  collapsed: boolean;
  children: ReactNode;
}) =>
  collapsed ? (
    <div className="mx-auto mb-2 h-px w-8 bg-white/10" aria-hidden />
  ) : (
    <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/35">
      {children}
    </p>
  );

const Sidebar = ({
  open,
  onClose,
  collapsed,
  onToggleCollapsed,
}: SidebarProps) => {
  const pathname = usePathname();
  const user = useAppSelector((s) => s.userDetails.user);
  const listCount = useAppSelector((s) =>
    s.lists.loaded ? s.lists.items.length : 0,
  );
  const badges: Record<string, number> = { "My lists": listCount };
  const { signOut, signingOut } = useSignOut();
  const displayName = user?.name || user?.email?.split("@")[0] || "You";
  const [tooltip, setTooltip] = useState<{ label: string; top: number } | null>(
    null,
  );

  // The rail scrolls (so it clips overflow); tooltips render as a fixed layer beside it.
  const tip = (label: string) => {
    if (!collapsed) return {};
    const show = (e: MouseEvent<HTMLElement> | FocusEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setTooltip({ label, top: rect.top + rect.height / 2 });
    };
    const hide = () => setTooltip(null);
    return {
      onMouseEnter: show,
      onMouseLeave: hide,
      onFocus: show,
      onBlur: hide,
      "aria-label": label,
    };
  };

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-charcoal/40 backdrop-blur-sm transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
      />
      <aside
        style={{ width: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH }}
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-charcoal text-white transition-[transform,width] duration-300 ease-out lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-coral/25 blur-[90px]" />
        </div>

        <div
          className={cn(
            "relative flex h-[72px] shrink-0 items-center",
            collapsed ? "justify-center px-3" : "justify-between px-6",
          )}
        >
          <Link
            href="/dashboard/discover"
            onClick={onClose}
            {...tip("Discover")}
          >
            <Logo tone="light" showWordmark={!collapsed} />
          </Link>
          {!collapsed && (
            <>
              <button
                onClick={onToggleCollapsed}
                className="hidden rounded-lg p-1.5 text-white/45 transition-colors hover:bg-white/10 hover:text-white lg:block"
                aria-label="Collapse sidebar"
                title="Collapse sidebar ( [ )"
              >
                <SidebarSimple size={20} weight="duotone" />
              </button>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-white/60 hover:bg-white/10 hover:text-white lg:hidden"
                aria-label="Close menu"
              >
                <X size={20} weight="bold" />
              </button>
            </>
          )}
        </div>

        <nav
          className={cn(
            "scrollbar-thin relative flex-1 space-y-8 overflow-y-auto overflow-x-hidden pt-4",
            collapsed ? "px-3" : "px-4",
          )}
        >
          {collapsed && (
            <button
              onClick={() => {
                setTooltip(null);
                onToggleCollapsed();
              }}
              className="mx-auto -mt-2 flex h-10 w-10 items-center justify-center rounded-xl text-white/45 transition-colors hover:bg-white/[0.06] hover:text-white"
              {...tip("Expand sidebar ( [ )")}
            >
              <SidebarSimple
                size={20}
                weight="duotone"
                className="-scale-x-100"
              />
            </button>
          )}

          <div>
            <SectionLabel collapsed={collapsed}>Workspace</SectionLabel>
            <ul className="space-y-1">
              {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
                const active = pathname.startsWith(href);
                const badge = badges[label] > 0 ? badges[label] : 0;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={onClose}
                      {...tip(badge ? `${label} · ${badge}` : label)}
                      className={cn(
                        "group relative flex items-center rounded-xl py-2.5 text-[14px] font-semibold transition-all",
                        collapsed ? "justify-center" : "gap-3 px-3",
                        active
                          ? "bg-white/[0.08] text-white"
                          : "text-white/55 hover:bg-white/[0.05] hover:text-white",
                      )}
                    >
                      {active && (
                        <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-brand-gradient" />
                      )}
                      <span className="relative">
                        <Icon
                          size={20}
                          weight={active ? "fill" : "duotone"}
                          className={
                            active
                              ? "text-coral"
                              : "text-white/55 group-hover:text-white"
                          }
                        />
                        {collapsed && badge > 0 && (
                          <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-coral px-1 text-[9.5px] font-bold leading-none text-white ring-2 ring-charcoal">
                            {badge > 99 ? "99+" : badge}
                          </span>
                        )}
                      </span>
                      {!collapsed && (
                        <>
                          <span className="truncate">{label}</span>
                          {badge > 0 && (
                            <span className="ml-auto rounded-full bg-coral px-2 py-0.5 text-[11px] font-bold text-white">
                              {badge}
                            </span>
                          )}
                        </>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <SectionLabel collapsed={collapsed}>Coming soon</SectionLabel>
            <ul className="space-y-1">
              {UPCOMING_ITEMS.map(({ label, icon: Icon }) => (
                <li
                  key={label}
                  {...tip(`${label} · coming soon`)}
                  className={cn(
                    "flex cursor-not-allowed items-center rounded-xl py-2.5 text-[14px] font-semibold text-white/30",
                    collapsed ? "justify-center" : "gap-3 px-3",
                  )}
                >
                  <Icon size={20} weight="duotone" />
                  {!collapsed && (
                    <>
                      {label}
                      <span className="ml-auto rounded-full border border-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/40">
                        Soon
                      </span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div
          className={cn(
            "relative border-t border-white/10",
            collapsed ? "p-3" : "p-4",
          )}
        >
          <div
            className={cn(
              "flex items-center gap-1 rounded-xl",
              collapsed && "flex-col",
            )}
          >
            <Link
              href="/dashboard/settings"
              onClick={onClose}
              {...tip("Account settings")}
              title={collapsed ? undefined : "Account settings"}
              className={cn(
                "flex min-w-0 items-center rounded-xl p-2 transition-colors hover:bg-white/[0.06]",
                collapsed ? "justify-center" : "flex-1 gap-3",
                pathname.startsWith("/dashboard/settings") && "bg-white/[0.08]",
              )}
            >
              <Avatar name={displayName} seed={user?.id} size="md" />
              {!collapsed && (
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">
                    {displayName}
                  </p>
                  <p className="truncate text-xs text-white/45">
                    {user?.email}
                  </p>
                </div>
              )}
            </Link>
            <button
              onClick={signOut}
              disabled={signingOut}
              {...tip("Sign out")}
              className="rounded-lg p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Sign out"
              title={collapsed ? undefined : "Sign out"}
            >
              {signingOut ? (
                <Spinner className="h-[18px] w-[18px]" />
              ) : (
                <SignOut size={18} weight="bold" />
              )}
            </button>
          </div>
        </div>
      </aside>

      {collapsed && tooltip && (
        <div
          role="tooltip"
          style={{ top: tooltip.top, left: SIDEBAR_COLLAPSED_WIDTH + 10 }}
          className="pointer-events-none fixed z-[70] hidden -translate-y-1/2 whitespace-nowrap rounded-lg bg-charcoal px-2.5 py-1.5 text-[12.5px] font-semibold text-white shadow-lift ring-1 ring-white/10 lg:block"
        >
          {tooltip.label}
        </div>
      )}
    </>
  );
};

export default Sidebar;
