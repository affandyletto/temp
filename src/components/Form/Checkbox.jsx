// src/components/Form/Checkbox.jsx

import { Info } from "lucide-react";
import { Tooltip } from "react-tooltip";

const Checkbox = ({
  id,
  label,
  checked = false,
  onChange = () => {},
  disabled = false,
  isInfo = false,
  info = "",
}) => {
  return (
    <>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="w-4 h-4 text-primary-600 bg-white border border-neutral-400 rounded-lg focus:ring-primary-300 focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        {label && (
          <label
            htmlFor={id}
            className="flex items-center gap-1 text-sm cursor-pointer select-none"
          >
            {label}
            {isInfo && (
              <Info data-tooltip-id={id} className="size-4 cursor-pointer" />
            )}
          </label>
        )}
      </div>
      <Tooltip
        id={id}
        place="top"
        content={info}
        style={{ backgroundColor: "#3F444D", borderRadius: "8px" }}
      />
    </>
  );
};

export default Checkbox;
