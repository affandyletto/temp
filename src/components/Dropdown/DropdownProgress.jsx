// src/components/Dropdown/DropdownProgress.js

import { useEffect, useRef, useState } from "react";
import { useDropdown } from "@/context/DropdownContext";
import { Check, ChevronDown } from "lucide-react";

const DropdownProgress = () => {
  const { selected, setSelected, options } = useDropdown();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (item) => {
    setSelected(item);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center space-x-2 h-11 border border-neutral-400 hover:bg-primary-200 hover:bg-opacity-5 rounded-lg px-6"
      >
        <span className="text-sm font-semibold">{selected?.name}</span>
        <ChevronDown
          className={`size-5 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-14 w-72 bg-white border border-neutral-400 rounded-lg p-2 z-50">
          {options.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelect(item)}
              className="flex items-center justify-between px-2 py-2.5 cursor-pointer hover:bg-neutral-300 rounded-md"
            >
              <span className="text-sm">{item.name}</span>
              {selected.id === item.id && <Check className="size-5" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownProgress;
