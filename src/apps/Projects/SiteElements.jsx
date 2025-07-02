// src/apps/Projects/SiteElements.jsx

import { useEffect, useState } from "react";
import { ChevronDown, Star } from "lucide-react";
import InputSearch from "@/components/Form/InputSearch";
import ToggleTabs from "@/components/Toggle/ToggleTabs";
import SkeletonDefault from "@/components/Skeleton/SkeletonDefault";

const SiteElements = () => {
  // Loading
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      {isLoading ? (
        <SkeletonDefault />
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Site Elements</h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  type="button"
                  className={`flex items-center gap-2 w-full bg-white border rounded-full text-sm py-2 px-4`}
                >
                  <div className="flex items-center gap-1">
                    <Star className="size-4" /> <span>Favorites (5/10)</span>
                  </div>
                  <ChevronDown
                    className={`size-5 transition-transform duration-300 `}
                  />
                </button>
              </div>
              <div className="w-[300px]">
                <InputSearch
                  placeholder={"Search element"}
                  search={search}
                  setSearch={setSearch}
                />
              </div>
            </div>
          </div>

          <div className="w-[366px]">
            <ToggleTabs
              tabs={["Available Elements", "Quick Elements"]}
              value={activeTab}
              onChange={setActiveTab}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SiteElements;
