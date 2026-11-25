"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowsDownUp, MagnifyingGlass, SlidersHorizontal, X } from "@phosphor-icons/react";
import CreatorDrawer from "@/components/creators/CreatorDrawer";
import CreatorTable from "@/components/creators/CreatorTable";
import OutOfCredits from "@/components/credits/OutOfCredits";
import { INSUFFICIENT_CREDITS } from "@/lib/graphql/handleApi";
import Button from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import Spinner from "@/components/ui/Spinner";
import { Creator } from "@/lib/models/creator";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchCreators, fetchFilterOptions } from "@/lib/store/slices/creatorsSlice";
import { cn } from "@/lib/utils/cn";
import {
  AdvancedFilters,
  countActiveFilters,
  countAdvancedFilters,
  CreatorFilters,
  DEFAULT_FILTERS,
  filtersToQuery,
  pickAdvanced,
  queryToFilters,
  SORT_OPTIONS,
  SortKey,
  toFilterInput,
} from "@/lib/utils/creatorFilters";
import ActiveFilters from "./ActiveFilters";
import AdvancedFiltersDrawer from "./filters/AdvancedFiltersDrawer";
import FollowerRangeFilter from "./filters/FollowerRangeFilter";
import { LoadError, NoResults, TableSkeleton } from "./States";

const SEARCH_DEBOUNCE_MS = 350;

const DiscoverView = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { items, nextToken, totalCount, loading, loadingMore, hasLoaded, error, errorType, options, optionsLoading } =
    useAppSelector((s) => s.creators);
  const outOfCredits = errorType === INSUFFICIENT_CREDITS;

  // Filters and sort live in the URL so searches can be bookmarked and shared.
  const initial = useMemo(() => queryToFilters(new URLSearchParams(searchParams.toString())), []); // eslint-disable-line react-hooks/exhaustive-deps
  const [filters, setFilters] = useState<CreatorFilters>(initial.filters);
  const [sort, setSort] = useState<SortKey>(initial.sort);
  const [search, setSearch] = useState(initial.filters.search);
  const [selected, setSelected] = useState<Creator | null>(null);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Debounce typing into the search box.
  useEffect(() => {
    if (search === filters.search) return;
    const t = setTimeout(() => setFilters((f) => ({ ...f, search })), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [search, filters.search]);

  const filterInput = useMemo(() => toFilterInput(filters), [filters]);
  const advanced = useMemo(() => pickAdvanced(filters), [filters]);
  const advancedCount = countAdvancedFilters(advanced);

  useEffect(() => {
    dispatch(fetchFilterOptions());
  }, [dispatch]);
  const queryKey = JSON.stringify({ filterInput, sort });

  useEffect(() => {
    dispatch(fetchCreators({ filter: filterInput, sort }));
    const qs = filtersToQuery(filters, sort);
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    // queryKey captures filterInput + sort
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, queryKey]);

  const activeCount = countActiveFilters(filters);
  const isFiltering = activeCount > 0 || Boolean(filters.search.trim());
  const initialLoading = !hasLoaded || (loading && !items.length);
  const refreshing = loading && items.length > 0;

  const loadMore = useCallback(() => {
    if (nextToken && !loadingMore && !loading) {
      dispatch(fetchCreators({ filter: filterInput, sort, nextToken }));
    }
  }, [dispatch, filterInput, loading, loadingMore, nextToken, sort]);

  const retry = () => dispatch(fetchCreators({ filter: filterInput, sort }));

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !nextToken || error) return;
    const observer = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && loadMore(),
      { rootMargin: "600px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [error, loadMore, nextToken]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (e.key === "/" && !["INPUT", "TEXTAREA"].includes(target.tagName)) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const closeDrawer = useCallback(() => setSelected(null), []);
  const closeAdvanced = useCallback(() => setAdvancedOpen(false), []);
  const applyAdvanced = useCallback((value: AdvancedFilters) => setFilters((f) => ({ ...f, ...value })), []);
  const clearAdvanced = () => setFilters((f) => ({ ...f, ...pickAdvanced(DEFAULT_FILTERS) }));
  const resetFilters = () => {
    setSearch("");
    setFilters(DEFAULT_FILTERS);
  };
  const shown = totalCount ?? items.length;

  return (
    <div className="mx-auto max-w-[1520px] space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="animate-fade-up">
          <h1 className="font-display text-[34px] font-medium leading-tight tracking-[-0.02em] text-charcoal sm:text-[40px]">
            Discover <span className="italic text-coral">creators</span>
          </h1>
          <p className="mt-1.5 max-w-xl text-[15px] text-charcoal-400">
            Find the right voices for your brand — filter by reach, engagement, niche and location.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="group flex h-[52px] flex-1 items-center gap-3 rounded-2xl border border-sand-200 bg-white px-4 shadow-soft transition-all focus-within:border-coral focus-within:ring-4 focus-within:ring-coral/15">
          <MagnifyingGlass size={20} weight="bold" className="text-charcoal-300 group-focus-within:text-coral" />
          <input
            ref={searchRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setFilters((f) => ({ ...f, search }))}
            placeholder="Search by name or @username…"
            className="h-full flex-1 bg-transparent text-[15px] text-charcoal placeholder:text-charcoal-300 focus:outline-none"
            aria-label="Search creators"
          />
          {loading && search !== "" ? (
            <Spinner className="h-4 w-4 text-coral" />
          ) : search ? (
            <button
              onClick={() => {
                setSearch("");
                setFilters((f) => ({ ...f, search: "" }));
              }}
              className="rounded-lg p-1 text-charcoal-300 hover:bg-sand-100 hover:text-charcoal"
              aria-label="Clear search"
            >
              <X size={16} weight="bold" />
            </button>
          ) : (
            <kbd className="hidden rounded-lg border border-sand-200 bg-sand-50 px-2 py-0.5 text-xs font-semibold text-charcoal-400 sm:block">
              /
            </kbd>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <FollowerRangeFilter
            value={{
              followerBands: filters.followerBands,
              followersMin: filters.followersMin,
              followersMax: filters.followersMax,
            }}
            onChange={(v) => setFilters((f) => ({ ...f, ...v }))}
          />
          <button
            type="button"
            onClick={() => setAdvancedOpen(true)}
            className={cn(
              "inline-flex h-[52px] items-center gap-2 rounded-2xl border px-4 text-[13.5px] font-semibold shadow-soft transition-colors",
              advancedCount
                ? "border-charcoal bg-charcoal text-white hover:bg-charcoal-800"
                : "border-sand-200 bg-white text-charcoal hover:border-sand-300",
            )}
          >
            <SlidersHorizontal size={18} weight="duotone" className={advancedCount ? "text-tangerine" : "text-coral"} />
            Advanced filters
            {advancedCount > 0 && (
              <span className="rounded-full bg-coral px-1.5 py-0.5 text-[10.5px] font-bold leading-none text-white">
                {advancedCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="min-w-0 space-y-4">
        <div className="flex min-h-10 flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-charcoal-400">
            {initialLoading ? (
              "Loading creators…"
            ) : (error && !items.length) || outOfCredits ? null : (
              <>
                <span className="font-bold text-charcoal">{shown.toLocaleString()}</span>{" "}
                {shown === 1 ? "creator" : "creators"}
                {isFiltering ? " match your filters" : " in the database"}
                {items.length < shown && <> · showing {items.length.toLocaleString()}</>}
              </>
            )}
          </p>
          <Dropdown
            value={sort}
            options={SORT_OPTIONS}
            onChange={setSort}
            prefix="Sort:"
            icon={<ArrowsDownUp size={16} weight="bold" className="text-charcoal-400" />}
          />
        </div>
        <ActiveFilters filters={filters} onChange={setFilters} />

        {initialLoading ? (
          <TableSkeleton />
        ) : outOfCredits ? (
          <OutOfCredits
            title="Not enough credits for these filters"
            description={`${error} Basic search and follower filters stay free.`}
            action={
              <Button variant="secondary" onClick={clearAdvanced}>
                Clear advanced filters
              </Button>
            }
          />
        ) : error && !items.length ? (
          <LoadError message={error} onRetry={retry} />
        ) : !items.length ? (
          <NoResults onReset={isFiltering ? resetFilters : retry} />
        ) : (
          <div className={cn("transition-opacity", refreshing && "opacity-50")}>
            <CreatorTable creators={items} onOpen={setSelected} showNiches={false} showLocation={false} />
          </div>
        )}

        <div ref={sentinelRef} className="flex justify-center py-6">
          {outOfCredits ? null : loadingMore ? (
            <span className="inline-flex items-center gap-2 text-sm font-medium text-charcoal-400">
              <Spinner className="h-4 w-4 text-coral" /> Loading more creators…
            </span>
          ) : nextToken && !initialLoading ? (
            <Button variant="secondary" onClick={loadMore}>
              Load more creators
            </Button>
          ) : error && items.length ? (
            <Button variant="secondary" onClick={loadMore}>
              Retry loading more
            </Button>
          ) : hasLoaded && items.length > 0 ? (
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-charcoal-300">
              You&apos;ve reached the end
            </span>
          ) : null}
        </div>
      </div>

      <AdvancedFiltersDrawer
        open={advancedOpen}
        value={advanced}
        options={options}
        optionsLoading={optionsLoading}
        onApply={applyAdvanced}
        onClose={closeAdvanced}
      />
      <CreatorDrawer creator={selected} onClose={closeDrawer} />
    </div>
  );
};

export default DiscoverView;
