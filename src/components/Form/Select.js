// src/components/Form/Select.js

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const Select = ({
  label,
  options = [],
  selected,
  onChange,
  placeholder = "Select an option",
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");
  const ref = useRef(null);

  // Close dropdown saat klik di luar komponen
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold">
        {label}
        {required && <span className="text-danger-200">*</span>}
      </label>

      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full text-left bg-white border border-neutral-400 text-sm rounded-lg p-4 flex justify-between items-center"
        >
          <span className={selectedLabel ? "" : "text-secondary"}>
            {selectedLabel || placeholder}
          </span>
          <ChevronDown
            className={`size-4 transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {isOpen && (
          <ul className="absolute z-50 mt-1 w-full bg-white border border-neutral-400 rounded-lg shadow-md max-h-60 overflow-y-auto p-2">
            {options.map(({ value, label }) => (
              <li
                key={value}
                onClick={() => {
                  setSelectedLabel(label);
                  onChange(value);
                  setIsOpen(false);
                }}
                className={`p-2 text-sm hover:bg-neutral-300 cursor-pointer ${
                  value === selected ? "bg-neutral-200 font-semibold" : ""
                }`}
              >
                {label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Select;
