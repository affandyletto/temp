// src/components/Form/SingleSelect.js

import { useEffect, useRef, useState } from "react";
import { ChevronDown, X } from "lucide-react";

const SingleSelect = ({ label, options = [], selected, setSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value) => {
    setSelected(value);
    setIsOpen(false);
  };

  const selectedOption = options.find((o) => o.value === selected);

  return (
    <div className="relative space-y-2" ref={ref}>
      {label && <label className="text-sm font-semibold">{label}</label>}
      <div
        className={`w-full ${
          isOpen ? "border-primary-200" : "border-neutral-400"
        } bg-white border text-sm rounded-lg px-4 h-[54px] cursor-pointer flex items-center justify-between`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          {selectedOption ? (
            <span className="flex items-center gap-1 bg-primary-100 text-primary-200 text-xs px-2 py-1 rounded-full">
              {selectedOption.label}
              <X
                className="size-3 text-secondary cursor-pointer mr-1"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected("");
                }}
              />
            </span>
          ) : (
            <span className="text-secondary text-sm">Select option</span>
          )}
        </div>
        <ChevronDown
          className={`size-4 ml-2 shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      {isOpen && (
        <div className="mt-1 max-h-60 overflow-auto border border-neutral-400 rounded-lg bg-white shadow-md absolute z-50 w-full space-y-0.5 p-2">
          {options.map(({ value, label }) => (
            <div
              key={value}
              className={`flex items-center justify-between p-2 text-sm ${
                selected === value ? "bg-neutral-300" : ""
              } hover:bg-neutral-300 rounded-lg cursor-pointer`}
              onClick={() => handleSelect(value)}
            >
              <span>{label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleSelect;
