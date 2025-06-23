// src/components/SelectRowsPerPage.js

import { ChevronDown } from "lucide-react";

const SelectRowsPerPage = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span>Rows per page:</span>
      <div className="relative">
        <select
          className="appearance-none border border-neutral-400 rounded px-3 py-1 pr-5 bg-white focus:border-primary-300 focus:outline-none focus:ring-0"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
        >
          {[5, 10, 20, 50].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none size-4 text-secondary" />
      </div>
    </div>
  );
};

export default SelectRowsPerPage;
