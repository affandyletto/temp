// src/components/Toggle/ToggleView.jsx

import { AlignJustify, LayoutGrid } from "lucide-react";

const ToggleView = ({ value, onChange }) => {
  const isActive = value;

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onChange(!isActive)}
        type="button"
        className={`w-[146px] h-9 flex items-center justify-between rounded-lg p-1 bg-neutral-300`}
      >
        <div
          className={`flex items-center justify-center w-[66px] h-7 rounded-lg
          ${isActive ? "bg-white shadow-sm" : "bg-transparet"}
        `}
        >
          <AlignJustify className="size-5" />
        </div>
        <div
          className={`flex items-center justify-center w-[66px] h-7 rounded-lg
          ${isActive ? "bg-transparent" : "bg-white shadow-sm"}
        `}
        >
          <LayoutGrid className="size-5" />
        </div>
      </button>
    </div>
  );
};

export default ToggleView;
