// src/components/CardCollapseElement.jsx

import { useEffect, useState } from "react";
import {
  ChevronDown,
  CircleDollarSign,
  Pencil,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import DropdownMenu from "@/components/Dropdown/DropdownMenu";

const CardCollapseSiteElement = ({
  title = "More Info",
  items,
  total = 0,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [element, setElement] = useState([]);

  useEffect(() => {
    setElement(items);
  }, [items]);

  const [targetDeleteId, setTargetDeleteId] = useState(null);

  const handleDelete = (id) => {
    setTargetDeleteId(id);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    console.log(targetDeleteId);
  };

  return (
    <>
      <div className="bg-white border border-neutral-400 rounded-lg">
        <div className={`flex items-center justify-between p-3`}>
          <div className="flex items-center gap-4">
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
            <div className="flex items-center gap-2">
              <div className="size-8 bg-gray-300 rounded-lg "></div>
              <p className="text-base">{title}</p>
              <span
                className={`bg-primary-100 text-xs text-primary-200 px-2 py-0.5 rounded-full `}
              >
                {total} Items
              </span>
            </div>
          </div>
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
    </>
  );
};

export default CardCollapseSiteElement;
