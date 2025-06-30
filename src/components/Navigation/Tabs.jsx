// src/components/Tabs.js

import { useEffect, useState } from "react";

export default function Tabs({ tabs = [], value = "surveys" }) {
  const [activeTab, setActiveTab] = useState(value);

  useEffect(() => {
    setActiveTab(value);
  }, [value]);

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="flex border-b border-neutral-400 space-x-6 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`pb-2 text-sm font-medium border-b-2 transition-all duration-200
              ${
                activeTab === tab.value
                  ? "border-primary-200 text-primary-200"
                  : "border-transparent hover:text-primary-200"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>{tabs.find((tab) => tab.value === activeTab)?.content}</div>
    </div>
  );
}
