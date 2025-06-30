// src/components/Form/FilterRangeDate.jsx

import { useState, useEffect } from "react";

const FilterRangeDate = ({ label }) => {
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    setSelectedDate(today);
  }, []);

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <label className="text-xs text-secondary">{label}</label>
        <button
          type="button"
          className="text-sm font-semibold text-primary-200"
        >
          Clear
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="relative space-y-2">
          <label className="text-sm font-semibold">From:</label>
          <input
            type="date"
            defaultValue={selectedDate}
            className={`w-full border border-neutral-400 text-sm rounded-lg p-4 bg-white focus:border-primary-300`}
          />
        </div>
        <div className="relative space-y-2">
          <label className="text-sm font-semibold">To:</label>
          <input
            type="date"
            defaultValue={selectedDate}
            className={`w-full border border-neutral-400 text-sm rounded-lg p-4 bg-white focus:border-primary-300`}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterRangeDate;
