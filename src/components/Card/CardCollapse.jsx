// src/components/CardCollapse.jsx

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const CardCollapse = ({ title = "More Info", children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-white border border-neutral-400 rounded-lg shadow-sm overflow-hidden">
      <div className="flex items-center justify-between bg-neutral-200 p-3">
        <p className="text-base font-semibold">{title}</p>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center size-8 bg-white border border-neutral-400 hover:bg-primary-200 focus:border-primary-300 hover:bg-opacity-5 rounded-lg"
        >
          <ChevronDown
            className={`transition-transform duration-300 size-4 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-[1500px] border-t border-neutral-400 "
            : "max-h-0 overflow-hidden "
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default CardCollapse;
