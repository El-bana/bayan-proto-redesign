"use client";

import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const PAGE_SIZE = 10;
export function usePagination<T>(
  items: T[],
  resetKey = "",
  pageSize = PAGE_SIZE,
) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [resetKey]);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = items.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return {
    page: currentPage,
    setPage,
    totalPages,
    pageItems,
    total: items.length,
  };
}

// 1 2 3 ... 10  /  1 ... 4 5 6 ... 10  /  1 ... 8 9 10
function getPages(current: number, total: number): (number | "gap")[] {
  if (total <= 6) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, "gap", total];
  if (current >= total - 2) return [1, "gap", total - 2, total - 1, total];
  return [1, "gap", current - 1, current, current + 1, "gap", total];
}

const base =
  "min-w-7 h-7 px-1.5 inline-flex items-center justify-center rounded-lg border text-xs font-medium transition-colors";
const idle =
  "bg-white border-[#D3DEDB] text-[#10201C] hover:bg-[#ECF6F5] disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed";

export function TablePagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const pages = getPages(page, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className="mt-auto flex items-center justify-center gap-1.5 py-4"
    >
      <button
        type="button"
        onClick={() => onPageChange(1)}
        disabled={page === 1}
        aria-label="First page"
        className={cn(base, idle)}
      >
        <ChevronsLeft className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className={cn(base, idle)}
      >
        <ChevronLeft className="w-3.5 h-3.5" />
      </button>

      {pages.map((p, i) =>
        p === "gap" ? (
          <span
            key={`gap-${i}`}
            aria-hidden="true"
            className="px-1 text-xs text-[#7C8C87]"
          >
            ...
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            aria-label={`Page ${p}`}
            aria-current={p === page ? "page" : undefined}
            className={cn(
              base,
              p === page ? "bg-[#0D8C7C] border-[#0D8C7C] text-white" : idle,
            )}
          >
            {p}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
        className={cn(base, idle)}
      >
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={() => onPageChange(totalPages)}
        disabled={page === totalPages}
        aria-label="Last page"
        className={cn(base, idle)}
      >
        <ChevronsRight className="w-3.5 h-3.5" />
      </button>
    </nav>
  );
}
