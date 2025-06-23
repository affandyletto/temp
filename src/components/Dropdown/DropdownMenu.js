// src/components/Dropdown/DropdownMenu.js

import { useEffect, useRef, useState } from "react";
import ButtonIcon from "../Button/ButtonIcon";
import { EllipsisVertical } from "lucide-react";

const DropdownMenu = ({ menu = [], onOpen, onClose }) => {
  const dropdownRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    const next = !isOpen;
    next ? onOpen?.() : onClose?.();
    setIsOpen(next);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose?.();
        setIsOpen(false);
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
    <div className="relative size-8" ref={dropdownRef}>
      <ButtonIcon
        icon={EllipsisVertical}
        sizeIcon={"size-4"}
        sizeBtn={"size-8"}
        onClick={toggle}
      />
      {isOpen && (
        <div className="absolute right-0 top-10 w-48 bg-white border border-neutral-400 rounded-lg p-2 z-50">
          {menu.map(({ id, name, icon: Icon, onClick, isRed = false }) => (
            <button
              key={id}
              onClick={() => {
                onClick?.();
                onClose?.();
                setIsOpen(false);
              }}
              className={`w-full flex items-center hover:bg-neutral-300 text-sm space-x-2 rounded-lg py-2.5 px-2 ${
                isRed ? "text-danger-300" : ""
              }`}
            >
              <Icon className="size-5" />
              <span>{name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
