// src/apps/Clients/Projects.jsx

import { Plus, Search } from "lucide-react";
import { mockClients } from "@/data/clients";
import { mockProjects } from "@/data/projects";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Pagination from "@/components/Pagination";
import SelectRowsPerPage from "@/components/SelectRowsPerPage";
import TableClientProjects from "@/components/Table/TableClientProjects";
import ModalAddClientProject from "@/components/Modal/ModalAddClientProject";

const Projects = () => {
  const [dataClient, setDataClient] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    setDataClient(mockClients.find((item) => item.id === id));
  }, [id]);

  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    return mockProjects.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.number.toLowerCase().includes(search.toLowerCase()) ||
        c.stage.toLowerCase().includes(search.toLowerCase())
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
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Detail {dataClient?.name}</h2>
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
                placeholder="Search project..."
                className="text-sm placeholder:text-secondary focus:outline-none focus:ring-0 active:outline-none active:ring-0"
              />
            </div>
            <ButtonPrimary
              icon={Plus}
              label={"New Project"}
              onClick={() => setIsAddOpen(true)}
            />
          </div>
        </div>

        <TableClientProjects items={paginated} />

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

      <ModalAddClientProject
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAddClient}
      />
    </>
  );
};

export default Projects;
