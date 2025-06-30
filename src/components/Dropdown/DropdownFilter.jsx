// src/components/Dropdown/DropdownFilter.jsx

import { useEffect, useRef, useState } from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import {
  optionsElement,
  optionsElemetCategories,
  optionsFloorPlan,
  optionsImageType,
  optionsUser,
} from "@/data/dropdown";

import ButtonIcon from "../Button/ButtonIcon";
import ButtonPrimary from "../Button/ButtonPrimary";
import ButtonSecondary from "../Button/ButtonSecondary";
import FilterSelect from "../Form/FilterSelect";
import FilterSearch from "../Form/FilterSearch";
import FilterRangeDate from "../Form/FilterRangeDate";
import FilterRadio from "../Form/FilterRadio";

const DropdownFilter = ({ onChange = () => {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isApply, setIsApply] = useState(false);
  const dropdownRef = useRef(null);

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

  const handleApply = () => {
    setIsOpen(false);
    setIsApply(true);
    // dummy: kirim kondisi filter aktif
    onChange({
      floorplan: "filtered",
      imageType: "filtered",
      element: "filtered",
      category: "filtered",
      date: { start: "2025-01-01" },
      user: "filtered",
      search: "filtered",
    });
  };

  const handleReset = () => {
    setIsOpen(false);
    setIsApply(false);
    // dummy: kirim kondisi filter kosong
    onChange({
      floorplan: "",
      imageType: "",
      element: "",
      category: "",
      date: {},
      user: "",
      search: "",
    });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 w-full bg-white border rounded-full text-sm py-2 px-4 ${
          isOpen ? "border-primary-200" : "border-neutral-400"
        } ${
          isApply && !isOpen
            ? "!bg-primary-100 !border-primary-100 text-primary-200"
            : ""
        } `}
      >
        <div className="flex items-center gap-1">
          <SlidersHorizontal className="size-4" />
          <span>Filters</span>
        </div>
        <ChevronDown
          className={`size-5 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-[460px] bg-white border border-neutral-400 rounded-lg z-50 shadow-md overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between bg-neutral-200 border-b border-neutral-400 p-4">
            <h6 className="text-xl font-semibold">Filter</h6>
            <ButtonIcon
              icon={X}
              sizeIcon="size-4"
              sizeBtn="size-8"
              onClick={() => setIsOpen(false)}
            />
          </div>

          {/* Body */}
          <div className="h-[450px] space-y-4 py-3 px-4 overflow-y-scroll">
            <FilterSearch />

            <FilterSelect
              id="select_floorplan"
              label="Floor Plan"
              placeholder="Select floor plan"
              value=""
              options={[{ label: "All", value: "" }, ...optionsFloorPlan]}
            />

            <FilterSelect
              id="select_imagetype"
              label="Image Type"
              placeholder="Select image type"
              value=""
              options={[{ label: "All", value: "" }, ...optionsImageType]}
            />

            <FilterSelect
              id="select_element"
              label="Element"
              placeholder="Select element"
              value=""
              options={[{ label: "All", value: "" }, ...optionsElement]}
            />

            <FilterSelect
              id="select_category"
              label="Category"
              placeholder="Select category"
              value=""
              options={[
                { label: "All", value: "" },
                ...optionsElemetCategories,
              ]}
            />

            <FilterRangeDate id="select_date" label="Select Date" />

            <FilterSelect
              id="select_user"
              label="Taken By"
              placeholder="Select user"
              value=""
              options={[{ label: "All Users", value: "" }, ...optionsUser]}
            />

            <FilterRadio id="radio_stage" label="Stage" options={optionsUser} />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between bg-white border-t border-neutral-400 p-4">
            <ButtonSecondary
              type="reset"
              label="Reset All"
              onClick={handleReset}
            />
            <ButtonPrimary
              type="submit"
              label="Apply Now"
              onClick={handleApply}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownFilter;
