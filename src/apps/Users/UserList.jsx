// src/apps/Client/UserList.jsx

import { useState, useMemo, useEffect } from "react";
import { mockUsers } from "@/data/users";
import { Plus, Search } from "lucide-react";
import { optionsUserApps, optionsUserTypes } from "@/data/dropdown";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import TableUserList from "@/components/Table/TableUserList";
import DropdownType from "@/components/Dropdown/DropdownType";
import Pagination from "@/components/Pagination";
import SelectRowsPerPage from "@/components/SelectRowsPerPage";
import CardCollapse from "@/components/Card/CardCollapse";
import ProgressBarSeatUsage from "@/components/ProgressBar/ProgressBarSeatUsage";
import ModalSubmitUser from "@/components/Modal/ModalSubmitUser";
import SkeletonDefault from "@/components/Skeleton/SkeletonDefault";

const UserList = () => {
  // Loading
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState(null);
  const [filterApp, setFilterApp] = useState(null);

  const filtered = useMemo(() => {
    return mockUsers.filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.type.toLowerCase().includes(search.toLowerCase());

      const matchType =
        filterType && filterType.value ? c.type === filterType.value : true;
      const matchApp =
        filterApp && filterApp.value ? c.app === filterApp.value : true;

      return matchSearch && matchType && matchApp;
    });
  }, [search, filterType, filterApp]);

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

  // Handle Change Type
  const handleChangeType = (item) => {
    setFilterType(item);
    setCurrentPage(1);
  };

  // Handle Change App
  const handleChangeApp = (item) => {
    setFilterApp(item);
    setCurrentPage(1);
  };

  return (
    <>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">User List</h2>
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
                  placeholder="Search user..."
                  className="text-sm placeholder:text-secondary focus:outline-none focus:ring-0 active:outline-none active:ring-0"
                />
              </div>
              <ButtonPrimary
                icon={Plus}
                label={"Add User"}
                onClick={() => setIsAddOpen(true)}
              />
            </div>
          </div>

          <div className="relative flex items-center gap-3">
            <DropdownType
              options={[{ label: "All Types", value: "" }, ...optionsUserTypes]}
              value={filterType}
              onChange={handleChangeType}
            />
            <DropdownType
              options={[{ label: "All Apps", value: "" }, ...optionsUserApps]}
              value={filterApp}
              onChange={handleChangeApp}
            />
          </div>

          <TableUserList items={paginated} isLoading={isLoading} />

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

          <CardCollapse title="Total Usage">
            <div className="space-y-3 text-sm text-neutral-700 p-4">
              <ProgressBarSeatUsage
                name="OneSurvey"
                totalSeats={20}
                usedSeats={6}
                isLoading={isLoading}
              />
              <ProgressBarSeatUsage
                name="OneSnap"
                totalSeats={15}
                usedSeats={6}
                isLoading={isLoading}
              />
            </div>
          </CardCollapse>
        </div>

      <div className="h-20"></div>

      <ModalSubmitUser
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAddClient}
      />
    </>
  );
};

export default UserList;
