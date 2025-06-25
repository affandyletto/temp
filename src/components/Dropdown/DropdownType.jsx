// src/components/Dropdown/DropdownType.jsx

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

const DropdownType = ({ options, onChange = () => {} }) => {
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    setSelected(options[0]);
  }, [options]);

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
    onChange(item); // kirim ke parent
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 w-full bg-white border ${
          isOpen ? "border-primary-200" : "border-neutral-400"
        } rounded-full text-sm py-2 px-4`}
      >
        <span>{selected?.label}</span>
        <ChevronDown
          className={`size-5 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-64 bg-white border border-neutral-400 rounded-lg p-2 z-50 shadow-md">
          {options.map((item) => (
            <div
              key={item.value}
              onClick={() => handleSelect(item)}
              className="flex items-center justify-between px-2 py-2.5 cursor-pointer hover:bg-neutral-300 rounded-md"
            >
              <span className="text-sm">{item.label}</span>
              {selected?.value === item.value && <Check className="size-5" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownType;
