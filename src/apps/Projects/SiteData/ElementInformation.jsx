// src/apps/Project/SiteData/SurveyInformation.jsx

import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { optionClassification, optionsInformation } from "@/data/dropdown";
import { Search } from "lucide-react";
import { useToast } from "@/context/ToastContext";
import { mockElementInformation } from "@/data/sitedata";
import DropdownMenu from "@/components/Dropdown/DropdownMenu";
import SelectRowsPerPage from "@/components/SelectRowsPerPage";
import Pagination from "@/components/Pagination";
import DropdownType from "@/components/Dropdown/DropdownType";
import TableDataElement from "@/components/Table/TableDataElement";
import ModalSubmitPartNumber from "@/components/Modal/ModalSubmitPartNumber";
import ModalSubmitAccessories from "@/components/Modal/ModalSubmitAccessories";
import ModalSubmitFields from "@/components/Modal/ModalSubmitFields";
import ModalSubmitClassification from "@/components/Modal/ModalSubmitClassification";
import ModalUpdate from "@/components/Modal/ModalUpdate";

const ElementInformation = () => {
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

  const filtered = useMemo(() => {
    return mockElementInformation.filter((c) => {
      const matchSearch = c.floorplan
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchStatus =
        filterStatus && filterStatus.value
          ? c.classification === filterStatus.label
          : true;

      return matchSearch && matchStatus;
    });
  }, [search, filterStatus]);

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

  const handleSavePdf = () => {
    showToast(
      "success",
      "Success",
      "Your file is being created. You can download it in the “Reports” tab"
    );
  };

  // Handle Edit Part Number
  const [isEditPartNumber, setIsEditPartNumber] = useState(false);

  // Handle Edit Accessories
  const [isEditAccessories, setIsEditAccessories] = useState(false);

  // Handle Edit Fields
  const [isEditFields, setIsEditFields] = useState(false);

  // Handle Classification
  const [isEditClassification, setIsEditClassification] = useState(false);

  // Handle Update
  const [isUpdate, setIsUpdate] = useState(false);

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
                {
                  id: uuidv4(),
                  name: "Edit Part Number",
                  onClick: () => setIsEditPartNumber(true),
                },
                {
                  id: uuidv4(),
                  name: "Edit Accessories",
                  onClick: () => setIsEditAccessories(true),
                },
                {
                  id: uuidv4(),
                  name: "Edit Fields",
                  onClick: () => setIsEditFields(true),
                },
                {
                  id: uuidv4(),
                  name: "Edit Classifications",
                  onClick: () => setIsEditClassification(true),
                },
                {
                  id: uuidv4(),
                  name: "Update Latest",
                  onClick: () => setIsUpdate(true),
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
                  { label: "Filter Classification", value: "" },
                  ...optionClassification,
                ]}
                value={filterStatus}
                onChange={handleChangeStatus}
              />
            </div>
          </div>
          <TableDataElement items={paginated} isLoading={isLoading} />
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
      

      <ModalSubmitPartNumber
        isOpen={isEditPartNumber}
        onClose={() => setIsEditPartNumber(false)}
        onSubmit={() => {}}
        data={{ price: "$300", totalPrice: "$1800" }}
      />
      <ModalSubmitAccessories
        isOpen={isEditAccessories}
        onClose={() => setIsEditAccessories(false)}
        onSubmit={() => {}}
      />
      <ModalSubmitFields
        isOpen={isEditFields}
        onClose={() => setIsEditFields(false)}
        onSubmit={() => {}}
      />
      <ModalSubmitClassification
        isOpen={isEditClassification}
        onClose={() => setIsEditClassification(false)}
        onSubmit={() => {}}
        data={{ value: "-" }}
      />
      <ModalUpdate isOpen={isUpdate} onClose={() => setIsUpdate(false)} />
    </>
  );
};

export default ElementInformation;
