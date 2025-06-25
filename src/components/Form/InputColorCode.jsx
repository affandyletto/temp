// src/components/Form/InputColorCode.jsx

import { useState } from "react";

const InputColorCode = ({
  label = "Color Code",
  id = "colorCode",
  value = "#1D2433",
  onChange = () => {},
  required = false,
}) => {
  const stripHash = (v) => v.replace(/^#/, "");

  const [colorCode, setColorCode] = useState(stripHash(value));

  const fullColor = `#${colorCode}`;
  const isValidHex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(fullColor);

  const handleChange = (e) => {
    let val = e.target.value.replace(/[^0-9a-fA-F]/g, ""); // only allow hex chars
    if (val.length > 6) val = val.slice(0, 6); // max 6 chars
    setColorCode(val);
    onChange(`#${val}`);
  };

  return (
    <div className="space-y-1">
      <label htmlFor={id} className="text-sm">
        {label}
        {required && <span className="text-danger-200">*</span>}
      </label>
      <div className="flex items-center border border-neutral-400 focus-within:border-primary-200 rounded-lg overflow-hidden">
        <div className="shrink-0 flex items-center justify-center size-12 border-r border-neutral-400">
          <div
            className={`size-8 rounded-md ${
              isValidHex ? "" : "border-red-300"
            }`}
            style={{ backgroundColor: isValidHex ? fullColor : "#fff" }}
            title={isValidHex ? fullColor : "Invalid HEX"}
          />
        </div>
        <div className="relative w-full">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 select-none">
            #
          </span>
          <input
            id={id}
            type="text"
            value={colorCode}
            onChange={handleChange}
            placeholder="FFFFFF"
            required={required}
            className="pl-6 pr-3 py-3 w-full text-sm placeholder:text-secondary focus:border-none focus:outline-none focus:ring-0"
          />
        </div>
      </div>
      {!isValidHex && colorCode !== "" && (
        <p className="text-xs text-danger-200">Invalid HEX color code</p>
      )}
    </div>
  );
};

export default InputColorCode;
