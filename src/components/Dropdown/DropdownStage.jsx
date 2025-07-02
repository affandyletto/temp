// src/components/Dropdown/DropdownStage.jsx

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { dropdownProgress } from "@/data/dropdown";

const DropdownStage = ({
  position = "right",
  stage_id = "",
  onChange = () => {},
}) => {
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const found = dropdownProgress.find((item) => item.id === stage_id);
    setSelected(found || dropdownProgress[0]);
  }, [stage_id]);

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
        className="flex items-center gap-2 w-full text-sm"
      >
        <span>{selected?.name}</span>
        <ChevronDown
          className={`size-5 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute ${getDropdownPosition()} top-full mt-2 w-72 bg-white border border-neutral-400 rounded-lg p-2 z-50 shadow-md`}
        >
          {dropdownProgress.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelect(item)}
              className="flex items-center justify-between px-2 py-2.5 cursor-pointer hover:bg-neutral-300 rounded-md"
            >
              <span className="text-sm">{item.name}</span>
              {selected?.id === item.id && <Check className="size-5" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownStage;
