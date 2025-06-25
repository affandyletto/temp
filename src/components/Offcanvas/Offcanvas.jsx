// src/components/Offcanvas.jsx

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

const Offcanvas = ({ isOpen, onClose, title, children }) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 !m-0 ${
        isOpen
          ? "pointer-events-auto bg-black/30"
          : "pointer-events-none bg-transparent"
      }`}
    >
      <div
        ref={ref}
        className={`fixed top-0 right-0 h-full flex flex-col w-[374px] bg-white shadow-lg transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-b-neutral-400">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center size-8 border border-neutral-400 hover:bg-primary-200 hover:bg-opacity-5 rounded-lg p-0.5"
          >
            <X className="size-4" />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Offcanvas;
