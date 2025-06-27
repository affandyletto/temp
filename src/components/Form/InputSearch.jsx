import { Search } from "lucide-react";
import React from "react";

const InputSearch = ({ placeholder = "Search...", search, setSearch }) => {
  return (
    <div className="flex items-center gap-2 w-full bg-white border border-neutral-400 rounded-lg p-3">
      <Search className="size-5 text-secondary" />
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder={placeholder}
        className="text-sm placeholder:text-secondary focus:outline-none focus:ring-0 active:outline-none active:ring-0"
      />
    </div>
  );
};

export default InputSearch;
