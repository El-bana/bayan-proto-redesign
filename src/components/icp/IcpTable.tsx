"use client";
import { useAppStore, ICP } from "@/lib/store";
import {
  Archive,
  ArchiveRestore,
  Columns3,
  Edit,
  Filter,
  GraduationCap,
  Plus,
  Search,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { IcpCreationModal } from "./IcpCreationModal";
import ProgressBar from "../lists/ProgressBar";
import { useColumnVisibility } from "@/lib/useColumnVisibility";
import ColumnVisibilityModal from "../layout/ColumnVisibilityModal";
import { IcpIcon } from "../layout/CustomIcons";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function getIcpMeta(icp: ICP) {
  return {
    createdBy: icp.createdBy,
    lastUsedDays: icp.lastUsedDays,
    leadsFound: icp.leadsFound,
    status: icp.isArchived ? ("Archived" as const) : ("Active" as const),
  };
}

function formatLastUsed(days: number | null) {
  if (days === null) return "Never";
  if (days < 30) return `${days} ${days === 1 ? "day" : "days"}`;
  const months = Math.round(days / 30);
  return `${months} ${months === 1 ? "Month" : "Months"}`;
}

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/* ------------------------------------------------------------------ */
/* Filters                                                             */
/* ------------------------------------------------------------------ */

type Filters = {
  status: string;
  owner: string;
  industry: string;
  size: string;
  region: string;
};
const EMPTY_FILTERS: Filters = {
  status: "",
  owner: "",
  industry: "",
  size: "",
  region: "",
};

function FilterSelect({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-[#10201C] mb-1">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-[#D3DEDB] rounded-lg bg-white px-3 py-2 text-sm text-[#10201C] outline-none focus:border-[#0D8C7C]"
      >
        {children}
      </select>
    </label>
  );
}

/* ------------------------------------------------------------------ */
/* Decision maker titles: first chip + "+n" with hover tooltip         */
/* ------------------------------------------------------------------ */

function TitlesCell({ titles }: { titles: string[] }) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  if (titles.length === 0) return <span className="text-[#7C8C87]">-</span>;

  const show = (e: React.SyntheticEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setPos({ x: r.left + 16, y: r.bottom - 8 });
  };

  return (
    <div
      tabIndex={titles.length > 1 ? 0 : -1}
      onMouseEnter={titles.length > 1 ? show : undefined}
      onFocus={titles.length > 1 ? show : undefined}
      onMouseLeave={() => setPos(null)}
      onBlur={() => setPos(null)}
      className="-my-3 -mx-4 py-3 px-4 outline-none"
    >
      <div className="flex items-center gap-2">
        <span className="px-3 py-1 bg-[#6F3FFF]/10 text-[#8000FF] rounded font-mono font-semibold text-xs whitespace-nowrap">
          {titles[0]}
        </span>
        {titles.length > 1 && (
          <span className="px-2 py-1 bg-gray-200 text-gray-600 rounded font-mono font-semibold text-xs">
            +{titles.length - 1}
          </span>
        )}
      </div>

      {pos && (
        <div
          role="tooltip"
          style={{ position: "fixed", left: pos.x, top: pos.y }}
          className="z-50 min-w-40 max-w-64 rounded-lg border border-[#D3DEDB] bg-white p-3 shadow-xl pointer-events-none"
        >
          <p className="text-xs font-bold text-[#10201C] mb-1.5">
            {titles.length} decision maker titles
          </p>
          <ul className="space-y-1">
            {titles.map((t) => (
              <li
                key={t}
                className="flex items-center gap-2 text-xs text-[#10201C]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#8000FF] shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Table                                                               */
/* ------------------------------------------------------------------ */

export function IcpTable() {
  const { icps, archiveIcp } = useAppStore();
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const uniq = (get: (i: ICP) => string) =>
    Array.from(new Set(icps.map(get))).sort();
  const owners = useMemo(
    () => uniq((i) => getIcpMeta(i).createdBy),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [icps],
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const industries = useMemo(() => uniq((i) => i.industry), [icps]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sizes = useMemo(() => uniq((i) => i.size), [icps]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const regions = useMemo(() => uniq((i) => i.region), [icps]);

  const trimmedQuery = query.trim().toLowerCase();
  const filteredIcps = icps.filter((i) => {
    const meta = getIcpMeta(i);
    if (
      trimmedQuery &&
      ![i.name, i.industry, i.size, i.region, meta.createdBy, ...i.titles].some(
        (f) => f.toLowerCase().includes(trimmedQuery),
      )
    )
      return false;
    if (filters.status && meta.status !== filters.status) return false;
    if (filters.owner && meta.createdBy !== filters.owner) return false;
    if (filters.industry && i.industry !== filters.industry) return false;
    if (filters.size && i.size !== filters.size) return false;
    if (filters.region && i.region !== filters.region) return false;
    return true;
  });

  const activeFilterCount = Object.values(filters).filter(Boolean).length;
  const setFilter = (key: keyof Filters, value: string) =>
    setFilters((f) => ({ ...f, [key]: value }));

  const handleRunClick = () => {
    router.push("/lead-locator?run=true");
  };

  const handleBulkArchive = () => {
    selectedIds.forEach((id) => archiveIcp(id));
    setSelectedIds(new Set());
  };

  const handleArchiveOne = (id: string) => {
    archiveIcp(id);
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedIds.size === filteredIcps.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(filteredIcps.map((i) => i.id)));
  };

  const toggleOne = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const columnManager = useColumnVisibility([
    { key: "name", label: "ICP Name", isVisible: true },
    { key: "industry", label: "Industry", isVisible: true },
    { key: "size", label: "Size", isVisible: true },
    { key: "region", label: "Region", isVisible: true },
    { key: "titles", label: "Decision Maker Title", isVisible: true },
    { key: "status", label: "Status", isVisible: true },
    { key: "creator", label: "Creator", isVisible: true },
    { key: "lastUsed", label: "Last Used", isVisible: true },
    { key: "leadsFound", label: "Leads Found", isVisible: true },
  ]);

  const th = "py-2 px-4 border-y border-[#D3DEDB]";
  const visibleColCount =
    columnManager.columns.filter((c) => columnManager.isVisible(c.key)).length +
    2; // checkbox + action

  return (
    <div className="min-h-screen relative bg-[#F6F8F7] p-8 flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <IcpIcon className="w-8 h-8 text-[#0D8C7C]" />
        <h1 className="text-2xl font-bold">ICP Library</h1>
      </div>
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-[#D3DEDB] rounded-lg px-3 py-2 bg-white w-[242px]">
            <Search
              className="w-5 h-5 text-[#7C8C87] mr-2"
              aria-hidden="true"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for ICP...."
              aria-label="Search ICPs"
              className="bg-transparent border-none outline-none text-[14px] text-[#10201C] w-full placeholder:text-[#7C8C87]"
            />
          </div>

          {/* Columns Toggle Button */}
          <button
            onClick={columnManager.openModal}
            aria-label="Manage columns"
            className="py-2 px-4 border border-[#0D8C7C] rounded-lg bg-white text-[#0D8C7C] hover:bg-[#0D8C7C]/5 transition-colors"
          >
            <Columns3 className="w-5 h-5" />
          </button>

          {/* Selected State & Archive Action */}
          {selectedIds.size > 0 && (
            <div className="flex items-center gap-3 ml-1">
              <span className="text-[#10201C] text-sm font-medium">
                {selectedIds.size} selected
              </span>
              <button
                onClick={handleBulkArchive}
                className="flex items-center gap-1.5 text-sm bg-black/20 text-black/80 font-semibold px-3 py-1.5 rounded-md hover:bg-black/5 transition-colors"
              >
                <Archive className="w-4 h-4" aria-hidden="true" /> Archive
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Filter button + panel */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsFilterOpen((o) => !o)}
              aria-expanded={isFilterOpen}
              aria-label="Filters"
              className={cn(
                "relative py-2 px-4 border border-[#0D8C7C] rounded-lg transition-colors",
                isFilterOpen || activeFilterCount > 0
                  ? "bg-[#0D8C7C] text-white"
                  : "bg-white text-[#0D8C7C] hover:bg-[#0D8C7C]/5",
              )}
            >
              <Filter className="w-5 h-5" />
              {activeFilterCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#10201C] text-white text-[11px] font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {isFilterOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setIsFilterOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 z-30 w-80 bg-white border border-[#D3DEDB] rounded-lg shadow-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-bold text-[#10201C]">
                      Filters
                    </h2>
                    <button
                      type="button"
                      onClick={() => setIsFilterOpen(false)}
                      aria-label="Close filters"
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <FilterSelect
                    label="Status"
                    value={filters.status}
                    onChange={(v) => setFilter("status", v)}
                  >
                    <option value="">All statuses</option>
                    <option>Active</option>
                    <option>Archived</option>
                  </FilterSelect>

                  <FilterSelect
                    label="Created By"
                    value={filters.owner}
                    onChange={(v) => setFilter("owner", v)}
                  >
                    <option value="">All owners</option>
                    {owners.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </FilterSelect>

                  <FilterSelect
                    label="Industry"
                    value={filters.industry}
                    onChange={(v) => setFilter("industry", v)}
                  >
                    <option value="">All industries</option>
                    {industries.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </FilterSelect>

                  <FilterSelect
                    label="Company Size"
                    value={filters.size}
                    onChange={(v) => setFilter("size", v)}
                  >
                    <option value="">All sizes</option>
                    {sizes.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </FilterSelect>

                  <FilterSelect
                    label="Region"
                    value={filters.region}
                    onChange={(v) => setFilter("region", v)}
                  >
                    <option value="">All regions</option>
                    {regions.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </FilterSelect>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      type="button"
                      disabled={activeFilterCount === 0}
                      onClick={() => setFilters(EMPTY_FILTERS)}
                      className="bg-white border border-red-400 text-red-500 hover:bg-red-50 disabled:opacity-50 text-xs font-semibold px-4 py-1.5 rounded-md transition-colors"
                    >
                      Clear all
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsFilterOpen(false)}
                      className="bg-[#0D8C7C] hover:bg-[#0a7366] text-white text-xs font-semibold px-4 py-1.5 rounded-md transition-colors"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#0D8C7C] text-white rounded-lg text-sm font-medium hover:bg-[#14B39F] transition-colors"
          >
            <Plus className="w-4 h-4" /> New ICP
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className="bg-[#ECF6F5] text-sm font-semibold text-[#10201C]">
              <th className="py-2 px-4 rounded-l-lg border-y border-l border-[#D3DEDB] w-12 align-middle">
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 accent-blue-600 cursor-pointer"
                    aria-label="Select all ICPs"
                    checked={
                      selectedIds.size === filteredIcps.length &&
                      filteredIcps.length > 0
                    }
                    onChange={toggleAll}
                  />
                </div>
              </th>
              {columnManager.isVisible("name") && (
                <th className={th}>ICP Name</th>
              )}
              {columnManager.isVisible("industry") && (
                <th className={th}>Industry</th>
              )}
              {columnManager.isVisible("size") && <th className={th}>Size</th>}
              {columnManager.isVisible("region") && (
                <th className={th}>Region</th>
              )}
              {columnManager.isVisible("titles") && (
                <th className={th}>Decision Maker Title</th>
              )}
              {columnManager.isVisible("status") && (
                <th className={th}>Status</th>
              )}
              {columnManager.isVisible("creator") && (
                <th className={th}>Creator</th>
              )}
              {columnManager.isVisible("lastUsed") && (
                <th className={th}>Last Used</th>
              )}
              {columnManager.isVisible("leadsFound") && (
                <th className={th}>Leads Found</th>
              )}
              <th className="py-2 px-4 rounded-r-lg border-y border-r border-[#D3DEDB] text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-sm text-[#10201C]">
            {[...filteredIcps]
              .sort((a, b) => {
                if (a.isArchived === b.isArchived) return 0;
                return a.isArchived ? 1 : -1;
              })
              .map((icp) => {
                const meta = getIcpMeta(icp);
                return (
                  <tr
                    key={icp.id}
                    className={`transition-colors group ${
                      icp.isArchived
                        ? "opacity-50 grayscale bg-gray-50/50"
                        : "hover:bg-black/5"
                    }`}
                  >
                    <td className="py-3 px-4 border-b border-[#D3DEDB] align-middle">
                      <div className="flex items-center justify-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-gray-300 accent-blue-600 cursor-pointer"
                          aria-label={`Select ${icp.name}`}
                          checked={selectedIds.has(icp.id)}
                          onChange={() => toggleOne(icp.id)}
                        />
                      </div>
                    </td>
                    {columnManager.isVisible("name") && (
                      <td className="py-3 px-4 font-semibold border-b border-[#D3DEDB]">
                        {icp.name}
                      </td>
                    )}
                    {columnManager.isVisible("industry") && (
                      <td className="py-3 px-4 border-b border-[#D3DEDB] text-gray-700">
                        {icp.industry}
                      </td>
                    )}
                    {columnManager.isVisible("size") && (
                      <td className="py-3 px-4 border-b border-[#D3DEDB] text-gray-700">
                        {icp.size}
                      </td>
                    )}
                    {columnManager.isVisible("region") && (
                      <td className="py-3 px-4 border-b border-[#D3DEDB] text-gray-700">
                        {icp.region}
                      </td>
                    )}
                    {columnManager.isVisible("titles") && (
                      <td className="py-3 px-4 border-b border-[#D3DEDB]">
                        <TitlesCell titles={icp.titles} />
                      </td>
                    )}
                    {columnManager.isVisible("status") && (
                      <td className="py-3 px-4 border-b border-[#D3DEDB]">
                        <span
                          className={cn(
                            "inline-flex min-w-[76px] items-center justify-center rounded px-3 py-1 text-xs font-medium",
                            icp.isArchived
                              ? "bg-[#C4C4C4] text-white"
                              : "bg-[#00C11A]/20 text-[#00B218]",
                          )}
                        >
                          {meta.status}
                        </span>
                      </td>
                    )}
                    {columnManager.isVisible("creator") && (
                      <td className="py-3 px-4 border-b border-[#D3DEDB]">
                        <div
                          title={meta.createdBy}
                          aria-label={`Created by ${meta.createdBy}`}
                          className="w-8 h-8 rounded-full bg-[#8000FF]/50 flex items-center justify-center text-white font-bold text-xs"
                        >
                          {initials(meta.createdBy)}
                        </div>
                      </td>
                    )}
                    {columnManager.isVisible("lastUsed") && (
                      <td className="py-3 px-4 border-b border-[#D3DEDB] font-medium">
                        {formatLastUsed(meta.lastUsedDays)}
                      </td>
                    )}
                    {columnManager.isVisible("leadsFound") && (
                      <td className="py-3 px-4 border-b border-[#D3DEDB] font-mono font-medium">
                        {meta.leadsFound}
                      </td>
                    )}
                    <td className="py-3 px-4 border-b border-[#D3DEDB]">
                      <div className="flex items-center justify-center gap-2">
                        {icp.isArchived ? (
                          <button
                            onClick={() => handleArchiveOne(icp.id)}
                            className="px-3 py-1 bg-[#C4C4C4] text-[#10201C] rounded shadow-sm hover:bg-[#B0B0B0] transition-colors font-medium text-xs"
                          >
                            Restore
                          </button>
                        ) : (
                          <button
                            onClick={handleRunClick}
                            className="flex items-center gap-1.5 px-3 py-1 bg-[#0D8C7C] text-white rounded shadow-sm hover:bg-[#14B39F] transition-colors font-medium text-xs"
                          >
                            Find leads
                          </button>
                        )}
                        <button
                          onClick={() => handleArchiveOne(icp.id)}
                          aria-label={`${icp.isArchived ? "Restore" : "Archive"} ${icp.name}`}
                          className="p-1.5 hover:bg-black/10 rounded-md text-[#445751]"
                        >
                          {icp.isArchived ? (
                            <ArchiveRestore
                              className="w-4 h-4"
                              aria-hidden="true"
                            />
                          ) : (
                            <Archive className="w-4 h-4" aria-hidden="true" />
                          )}
                        </button>
                        <button
                          aria-label={`Edit ${icp.name}`}
                          className="p-1.5 hover:bg-black/10 rounded-md text-[#445751]"
                          onClick={() => setIsModalOpen(true)}
                        >
                          <Edit className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            {filteredIcps.length === 0 && (
              <tr>
                <td
                  colSpan={visibleColCount}
                  className="py-8 text-center text-[#7C8C87]"
                >
                  {icps.length === 0
                    ? "No ICPs found. Create one!"
                    : "No ICPs match your search or filters."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <IcpCreationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="sticky bottom-0 z-20 w-full">
        <ProgressBar />
      </div>
      <ColumnVisibilityModal
        isOpen={columnManager.isOpen}
        onClose={columnManager.closeModal}
        columns={columnManager.columns}
        onToggleColumn={columnManager.toggleColumn}
        onShowAll={columnManager.showAll}
        onHideAll={columnManager.hideAll}
      />
    </div>
  );
}
