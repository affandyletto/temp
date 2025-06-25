// src/components/LastLoginDisplay.jsx

import { Info } from "lucide-react";
import { useMemo } from "react";
import { Tooltip } from "react-tooltip";

const getRandomColor = () => {
  const colors = ["bg-success-200", "bg-danger-200"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const LastLoginDisplay = ({ value }) => {
  const dotColor = useMemo(getRandomColor, []);

  return (
    <>
      <div className="flex items-center gap-2 text-sm">
        <span className={`w-2 h-2 rounded-full ${dotColor}`} />
        <span>{value}</span>
        <Info
          data-tooltip-id="info-tooltip"
          className="size-4 cursor-pointer"
        />
      </div>
      <Tooltip
        id="info-tooltip"
        place="top"
        content={
          <p>
            <strong>Platform</strong>: Mobile <br />
            <strong>Operationg System</strong>: MacOS <br />
            <strong>Browser</strong>: Safari
          </p>
        }
        style={{ backgroundColor: "#3F444D", borderRadius: "8px" }}
      />
    </>
  );
};

export default LastLoginDisplay;
