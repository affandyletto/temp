// src/apps/Project/SiteData/BillOfMaterials.jsx

import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  optionsBillType,
  optionsFilterClassification,
  optionsFilterFloorplan,
  optionsInformation,
} from "@/data/dropdown";
import { Search } from "lucide-react";
import { useToast } from "@/context/ToastContext";
import { mockBillMaterials } from "@/data/sitedata";
import DropdownMenu from "@/components/Dropdown/DropdownMenu";
import DropdownCheck from "@/components/Dropdown/DropdownCheck";
import SelectRowsPerPage from "@/components/SelectRowsPerPage";
import Pagination from "@/components/Pagination";
import DropdownType from "@/components/Dropdown/DropdownType";
import Toggle from "@/components/Toggle/Toggle";
import TableDataBillMaterial from "@/components/Table/TableDataBillMaterial";

const BillOfMaterials = () => {
  // Loading
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const { showToast } = useToast();
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterAccessories, setFilterAccessories] = useState(true);
  const [filterType, setFilterType] = useState(null);
  const [filterElement, setFilterElement] = useState(null);

  const filtered = useMemo(() => {
    return mockBillMaterials.filter((c) => {
      const matchSearch =
        c.type.toLowerCase().includes(search.toLowerCase()) ||
        c.element.toLowerCase().includes(search.toLowerCase()) ||
        c.partNumber.toString().toLowerCase().includes(search.toLowerCase());

      const matchAccessories =
        filterAccessories && filterAccessories
          ? c.accessories === filterAccessories
          : true;
      const matchType =
        filterType && filterType.value ? c.type === filterType.label : true;
      const matchElement =
        filterElement && filterElement.value
          ? c.element === filterElement.label
          : true;

      return matchSearch && matchType && matchElement && matchAccessories;
    });
  }, [search, filterType, filterElement, filterAccessories]);

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, currentPage, rowsPerPage]);

  // Handle Change Status
  const handleChangeStatus = (item) => {
    setFilterType(item);
    setCurrentPage(1);
  };

  // Handle Change Category
  const handleChangeCategory = (item) => {
    setFilterElement(item);
    setCurrentPage(1);
  };

  const handleSavePdf = () => {
    showToast(
      "success",
      "Success",
      "Your file is being created. You can download it in the “Reports” tab"
    );
  };

  return (
    <>
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <p className="text-base font-semibold">Classification</p>
                <div className="w-[230px]">
                  <DropdownCheck
                    label="Filter Classifications"
                    options={optionsFilterClassification}
                    checkbox
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-base font-semibold">Floorplan</p>
                <div className="w-[230px]">
                  <DropdownCheck
                    label="Floorplan"
                    options={optionsFilterFloorplan}
                    checkbox
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <Toggle
                label={`Accessories`}
                value={filterAccessories}
                onChange={setFilterAccessories}
              />
              <DropdownMenu
                onOpen={() => {}}
                onClose={() => {}}
                width="w-[206px]"
                menu={[
                  {
                    id: uuidv4(),
                    name: "Save PDF Report",
                    onClick: handleSavePdf,
                  },
                ]}
              />
            </div>
          </div>
          <hr />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 w-[300px] border border-neutral-400 rounded-lg p-3">
              <Search className="size-5 text-secondary" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search..."
                className="text-sm placeholder:text-secondary focus:outline-none focus:ring-0 active:outline-none active:ring-0"
              />
            </div>
            <div className="relative flex items-center gap-3">
              <DropdownType
                position="right"
                options={[{ label: "All Type", value: "" }, ...optionsBillType]}
                value={filterType}
                onChange={handleChangeStatus}
              />
              <DropdownType
                position="right"
                options={[
                  { label: "All Element", value: "" },
                  ...optionsInformation,
                ]}
                value={filterElement}
                onChange={handleChangeCategory}
                withIcon
              />
            </div>
          </div>
          <TableDataBillMaterial items={paginated} isLoading={isLoading} />
          <div className="flex justify-between items-center p-4">
            <SelectRowsPerPage
              value={rowsPerPage}
              onChange={(val) => {
                setRowsPerPage(val);
                setCurrentPage(1);
              }}
            />
            <Pagination
              current={currentPage}
              total={totalPages}
              onChange={setCurrentPage}
            />
          </div>
        </div>      
    </>
  );
};

export default BillOfMaterials;
