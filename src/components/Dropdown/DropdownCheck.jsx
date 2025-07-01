// src/components/Dropdown/DropdownCheck.js

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

const DropdownCheck = ({ label = "", options, checkbox = false }) => {
  const [selected, setSelected] = useState([]);
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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full space-x-2 border border-neutral-400 hover:bg-primary-200 hover:bg-opacity-5 rounded-full px-4 py-2"
      >
        <span className="text-sm ">{label || selected?.label}</span>
        <ChevronDown
          className={`size-5 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-14 w-full bg-white border border-neutral-400 rounded-lg p-2 z-50">
          {options.map((item) => (
            <div
              key={item.value}
              className="flex items-center justify-between px-2 py-1.5 cursor-pointer hover:bg-neutral-300 rounded-md"
            >
              <div className="w-full flex items-center gap-2">
                {checkbox && (
                  <input
                    type="checkbox"
                    id={item?.id}
                    defaultChecked={item?.value}
                    className="w-4 h-4 text-primary-600 bg-white border border-neutral-400 rounded-lg focus:ring-primary-300 focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                )}
                <label
                  htmlFor={item?.id}
                  className="block w-full text-sm cursor-pointer"
                >
                  {item.label}
                </label>
              </div>
              {selected.value === item.value && !checkbox && (
                <Check className="size-5" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownCheck;
