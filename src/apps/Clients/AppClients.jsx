// src/apps/Client/AppClients.jsx

import { useState, useMemo, useEffect } from "react";
import TableClients from "@/components/Table/TableClients";
import Pagination from "@/components/Pagination";
import SelectRowsPerPage from "@/components/SelectRowsPerPage";
import { mockClients } from "@/data/clients";
import { Plus, Search } from "lucide-react";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import ModalSubmitClient from "@/components/Modal/ModalSubmitClient";
import SkeletonDefault from "@/components/Skeleton/SkeletonDefault";

const AppClients = () => {
  // Loading
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    return mockClients.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.number.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, currentPage, rowsPerPage]);

  // Handle Add
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleAddClient = () => {
    setIsAddOpen(false);
  };

  return (
    <>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Client List</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 w-[300px] border border-neutral-400 rounded-lg p-3">
                <Search className="size-5 text-secondary" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search client..."
                  className="text-sm placeholder:text-secondary focus:outline-none focus:ring-0 active:outline-none active:ring-0"
                />
              </div>
              <ButtonPrimary
                icon={Plus}
                label={"Add Client"}
                onClick={() => setIsAddOpen(true)}
              />
            </div>
          </div>

          <TableClients items={paginated} isLoading={isLoading} />

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

      <ModalSubmitClient
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAddClient}
      />
    </>
  );
};

export default AppClients;
