// src/components/Form/FilterSelect.jsx

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const FilterSelect = ({
  label = "",
  options = [],
  value,
  onChange = () => {},
  placeholder = "Select an option",
  readOnly = false,
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

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
      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={() => !readOnly && setIsOpen((prev) => !prev)}
          className={`w-full text-left border-neutral-400 focus:outline-none focus:ring-0 active:outline-none active:ring-0 transition-all duration-300 text-sm rounded-lg p-4 flex justify-between items-center ${
            readOnly
              ? "bg-neutral-200 text-secondary"
              : "bg-white focus:border-primary-200 "
          }`}
        >
          <span className={selectedOption ? "" : "text-secondary"}>
            {selectedOption?.label || placeholder}
          </span>
          <ChevronDown
            className={`size-4 transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {isOpen && !readOnly && (
          <ul className="absolute z-50 mt-1 w-full bg-white border border-neutral-400 rounded-lg shadow-md max-h-60 overflow-y-auto p-2">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`p-2 text-sm hover:bg-neutral-300 cursor-pointer ${
                  option.value === value ? "bg-neutral-200 font-semibold" : ""
                }`}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FilterSelect;
