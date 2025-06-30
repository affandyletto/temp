// src/components/Form/FilterSearch.jsx

import { Search } from "lucide-react";

const FilterSearch = () => {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <label htmlFor="" className="text-xs text-secondary">
          Search by Label
        </label>
        <button
          type="button"
          className="text-sm font-semibold text-primary-200"
        >
          Clear
        </button>
      </div>
      <div className="flex items-center gap-2 w-full bg-white border border-neutral-400 rounded-xl p-4">
        <Search className="size-5 text-secondary" />
        <input
          type="text"
          placeholder="Search"
          className="text-sm placeholder:text-secondary focus:outline-none focus:ring-0 active:outline-none active:ring-0"
        />
      </div>
    </div>
  );
};

export default FilterSearch;
