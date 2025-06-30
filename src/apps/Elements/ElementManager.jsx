// src/apps/Elements/ElementManager.jsx

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import {
  mocksSuperCategories,
  mocksUniversalElements,
} from "@/data/elementManager";
import GridUniversalElements from "@/components/Grid/GridUniversalElements";
import ToggleTabs from "@/components/Toggle/ToggleTabs";
import InputSearch from "@/components/Form/InputSearch";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import GridMyLibrary from "@/components/Grid/GridMyLibrary";
import ModalSubmitSuperCategory from "@/components/Modal/ModalSubmitSuperCategory";

const ElementManager = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  const paginatedElements = useMemo(() => {
    return mocksUniversalElements.filter((c) => {
      const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());

      return matchSearch;
    });
  }, [search]);

  const paginatedMyLibary = useMemo(() => {
    return mocksSuperCategories.filter((c) => {
      const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());

      return matchSearch;
    });
  }, [search]);

  // Handle Add
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleAddSuperCategory = () => {
    setIsAddOpen(false);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Element Manager</h2>
          <div className="flex items-center gap-4">
            <div className="w-[300px]">
              <InputSearch
                placeholder={
                  activeTab === 0
                    ? "Search universal element"
                    : "Search my library"
                }
                search={search}
                setSearch={setSearch}
              />
            </div>
            {activeTab !== 0 && (
              <ButtonPrimary
                icon={Plus}
                label={"Add Super Category"}
                onClick={() => setIsAddOpen(true)}
              />
            )}
          </div>
        </div>

        <div className="w-[366px]">
          <ToggleTabs
            tabs={["Universal Elements", "My Library"]}
            value={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {activeTab === 0 ? (
          <GridUniversalElements items={paginatedElements} />
        ) : (
          <GridMyLibrary items={paginatedMyLibary} />
        )}
      </div>
      <div className="h-20"></div>

      <ModalSubmitSuperCategory
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAddSuperCategory}
      />
    </>
  );
};

export default ElementManager;
