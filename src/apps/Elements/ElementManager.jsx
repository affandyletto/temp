// src/apps/Elements/ElementManager.jsx

import { useMemo, useState } from "react";
import { mocksUniversalElements } from "@/data/elementManager";
import { Search } from "lucide-react";
import GridUniversalElements from "@/components/Grid/GridUniversalElements";
import ToggleTabs from "@/components/Toggle/ToggleTabs";

const ElementManager = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  const paginated = useMemo(() => {
    return mocksUniversalElements.filter((c) => {
      const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());

      return matchSearch;
    });
  }, [search]);

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Element Manager</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 w-[300px] border border-neutral-400 rounded-lg p-3">
              <Search className="size-5 text-secondary" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                placeholder="Search universal element"
                className="text-sm placeholder:text-secondary focus:outline-none focus:ring-0 active:outline-none active:ring-0"
              />
            </div>
          </div>
        </div>

        <div className="w-[366px]">
          <ToggleTabs
            tabs={["Universal Elements", "My Library"]}
            value={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {activeTab === 0 && <GridUniversalElements items={paginated} />}
      </div>
      <div className="h-20"></div>
    </>
  );
};

export default ElementManager;
