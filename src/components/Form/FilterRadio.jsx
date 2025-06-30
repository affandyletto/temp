// src/components/Form/FilterRadio.jsx

import { useState } from "react";

const FilterRadio = ({ label = "", options = [] }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelect = (value) => {
    setSelectedValue(value);
  };

  const handleClear = () => {
    setSelectedValue("");
  };

  return (
    <div className="space-y-1 pb-1">
      <div className="flex items-center justify-between">
        <label className="text-xs text-secondary">{label}</label>
        <button
          type="button"
          className="text-sm font-semibold text-primary-200"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>

      <div className="relative flex flex-wrap gap-2">
        {options.map((item) => {
          const isSelected = selectedValue === item.value;
          return (
            <button
              key={item.value}
              type="button"
              onClick={() => handleSelect(item.value)}
              className={`flex items-center gap-2 rounded-full border py-2 px-4 text-sm transition
                ${
                  isSelected
                    ? "bg-primary-100 text-primary-200 border-primary-200"
                    : "bg-white text-neutral-800 border-neutral-400"
                }
              `}
            >
              <div
                className={`flex items-center justify-center size-4 rounded-full border ${
                  isSelected
                    ? "bg-primary-100 border-primary-200"
                    : "bg-white border-default"
                }`}
              >
                {isSelected && (
                  <span
                    className={`size-3 rounded-full border bg-primary-200 border-primary-200`}
                  />
                )}
              </div>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterRadio;
