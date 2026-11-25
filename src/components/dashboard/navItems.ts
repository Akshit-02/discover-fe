import { ChartPieSlice, Compass, Folders, Icon, Lifebuoy, Megaphone } from "@phosphor-icons/react";

export interface NavItem {
  label: string;
  href: string;
  icon: Icon;
  soon?: boolean;
  description: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Discover",
    href: "/dashboard/discover",
    icon: Compass,
    description: "Search and filter creators by reach, engagement, niche and location.",
  },
  {
    label: "My lists",
    href: "/dashboard/lists",
    icon: Folders,
    description: "Your saved creator lists for campaigns and briefs.",
  },
  {
    label: "Help & support",
    href: "/dashboard/support",
    icon: Lifebuoy,
    description: "Contact the Kudozz team and send suggestions, feedback or queries.",
  },
];

export const UPCOMING_ITEMS: NavItem[] = [
  { label: "Campaigns", href: "#", icon: Megaphone, soon: true, description: "" },
  { label: "Reports", href: "#", icon: ChartPieSlice, soon: true, description: "" },
];

export const PAGE_TITLES: Record<string, string> = {
  "/dashboard/settings": "Account settings",
};

export const findNavItem = (pathname: string) =>
  NAV_ITEMS.find((item) => pathname.startsWith(item.href)) ??
  Object.entries(PAGE_TITLES)
    .filter(([href]) => pathname.startsWith(href))
    .map(([href, label]) => ({ label, href }))[0];
