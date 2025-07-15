// src/apps/Project/SiteData/InstallationInformation.jsx

import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { optionsType, optionsUser, optionsInformation } from "@/data/dropdown";
import { useToast } from "@/context/ToastContext";
import { Search } from "lucide-react";
import { mockInstallationInformation } from "@/data/sitedata";
import DropdownMenu from "@/components/Dropdown/DropdownMenu";
import SelectRowsPerPage from "@/components/SelectRowsPerPage";
import Pagination from "@/components/Pagination";
import DropdownType from "@/components/Dropdown/DropdownType";
import TableDataInstallation from "@/components/Table/TableDataInstallation";
import SkeletonDefault from "@/components/Skeleton/SkeletonDefault";

const InstallationInformation = () => {
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
  const [filterElement, setFilterElement] = useState(null);
  const [filterStatus, setFilterStatus] = useState(null);
  const [filterCategory, setFilterCategory] = useState(null);

  const filtered = useMemo(() => {
    return mockInstallationInformation.filter((c) => {
      const matchSearch = c.floorplan
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchStatus =
        filterStatus && filterStatus.value
          ? c.status === filterStatus.label
          : true;
      const matchCategory =
        filterCategory && filterCategory.value
          ? c.category === filterCategory.label
          : true;

      return matchSearch && matchStatus && matchCategory;
    });
  }, [search, filterStatus, filterCategory]);

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, currentPage, rowsPerPage]);

  // Handle Change Element
  const handleChangeElement = (item) => {
    setFilterElement(item);
    setCurrentPage(1);
  };

  // Handle Change Status
  const handleChangeStatus = (item) => {
    setFilterStatus(item);
    setCurrentPage(1);
  };

  // Handle Change Category
  const handleChangeCategory = (item) => {
    setFilterCategory(item);
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
            <div className="flex items-center gap-4">
              <p className="text-base font-semibold">Element Name</p>
              <div className="w-[230px]">
                <DropdownType
                  options={optionsInformation}
                  value={filterElement}
                  onChange={handleChangeElement}
                  withIcon
                />
              </div>
            </div>
            <DropdownMenu
              onOpen={() => {}}
              onClose={() => {}}
              width="w-[206px]"
              menu={[
                {
                  id: uuidv4(),
                  name: "Save Spreadsheet Report",
                  onClick: () => {},
                },
                {
                  id: uuidv4(),
                  name: "Save PDF Report",
                  onClick: handleSavePdf,
                },
              ]}
            />
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
                options={[
                  { label: "Installed By All", value: "" },
                  ...optionsUser,
                ]}
                value={filterStatus}
                onChange={handleChangeStatus}
              />
              <DropdownType
                position="right"
                options={[
                  { label: "All Types of Necessary Technology", value: "" },
                  ...optionsType,
                ]}
                value={filterCategory}
                onChange={handleChangeCategory}
                widthFull
              />
            </div>
          </div>
          <TableDataInstallation items={paginated} isLoading={isLoading} />
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

export default InstallationInformation;
