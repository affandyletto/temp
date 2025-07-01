// src/components/Dropdown/DropdownType.jsx

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

const DropdownType = ({
  options,
  value = null,
  position = "left",
  widthFull = false,
  onChange = () => {},
  withIcon = false,
}) => {
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    if (value) {
      setSelected(options.find((item) => item.value === value.value));
    } else {
      setSelected(options[0]);
    }
  }, [options, value]);

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

  const getDropdownPosition = () => {
    if (position === "right") return "right-0";
    if (position === "left") return "left-0";
    return "right-0";
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between gap-2 w-full bg-white border ${
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
        <div
          className={`absolute ${getDropdownPosition()} top-full mt-2 ${
            widthFull ? "w-full" : "w-64"
          } bg-white border border-neutral-400 rounded-lg p-2 z-50 shadow-md`}
        >
          {options.map((item) => (
            <div
              key={item.value}
              onClick={() => handleSelect(item)}
              className="flex items-center justify-between px-2 py-2.5 cursor-pointer hover:bg-neutral-300 rounded-md"
            >
              <div className="flex items-center gap-2">
                {withIcon && item.value && (
                  <div className="size-7 rounded-full bg-neutral-400"></div>
                )}
                <span className="text-sm">{item.label}</span>
              </div>
              {selected?.value === item.value && <Check className="size-5" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownType;
