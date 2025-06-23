// src/components/Pagination.js

import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ current, total, onChange }) => {
  const maxPagesToShow = 3;

  const generatePages = () => {
    let pages = [];

    if (total <= maxPagesToShow) {
      // Total sedikit, tampil semua
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      const half = Math.floor(maxPagesToShow / 2);
      let start = Math.max(1, current - half);
      let end = Math.min(total, current + half);

      // Jika di awal
      if (current <= half) {
        start = 1;
        end = maxPagesToShow;
      }

      // Jika di akhir
      if (current >= total - half) {
        start = total - maxPagesToShow + 1;
        end = total;
      }

      // Push nomor
      for (let i = start; i <= end; i++) pages.push(i);

      // Tambah titik-titik jika perlu
      if (start > 1) {
        if (start > 2) pages.unshift("...");
        pages.unshift(1);
      }

      if (end < total) {
        if (end < total - 1) pages.push("...");
        pages.push(total);
      }
    }

    return pages;
  };

  const pages = generatePages();

  return (
    <div className="flex items-center gap-1 text-sm">
      <button
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
        className="flex items-center gap-0.5 px-2 py-1 rounded disabled:opacity-40 text-sm"
      >
        <ChevronLeft className="size-4" />
        <span>Previous</span>
      </button>

      {pages.map((page, i) =>
        page === "..." ? (
          <span key={`dot-${i}`} className="px-2 py-1">
            ...
          </span>
        ) : (
          <button
            key={page}
            className={`flex items-center justify-center size-8 rounded-md border ${
              current === page
                ? "bg-primary-200 text-white border-primary-200"
                : "border-none"
            }`}
            onClick={() => onChange(page)}
          >
            {page}
          </button>
        )
      )}

      <button
        disabled={current === total}
        onClick={() => onChange(current + 1)}
        className="flex items-center gap-0.5 px-2 py-1 rounded disabled:opacity-40 text-sm"
      >
        <span>Next</span>
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
};

export default Pagination;
