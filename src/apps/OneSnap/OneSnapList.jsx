import { useState, useMemo, useEffect } from "react";
import { mockOneSnap } from "@/data/oneSnaps";
import { Plus, Search } from "lucide-react";
import {TableOneSnap} from "@/components/Table/TableOneSnap";
import Pagination from "@/components/Pagination";
import SelectRowsPerPage from "@/components/SelectRowsPerPage";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import {ModalSubmitOneSnap} from "@/components/Modal/ModalSubmitOneSnap";
import Toggle from "@/components/Toggle/Toggle";

export const OneSnapList=()=>{
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
	const timer = setTimeout(() => setIsLoading(false), 2000);
	return () => clearTimeout(timer);
  }, []);

  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [isEnabled, setIsEnabled] = useState(false);

  const filtered = useMemo(() => {
	return mockOneSnap.filter(
	  (c) =>
		c.name.toLowerCase().includes(search.toLowerCase())
	);
  }, [search, isEnabled]);

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginated = useMemo(() => {
	const start = (currentPage - 1) * rowsPerPage;
	return filtered.slice(start, start + rowsPerPage);
  }, [filtered, currentPage, rowsPerPage]);

  // Handle Add
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleAddProject = () => {
	setIsAddOpen(false);
  };

	return(
	<>
		<div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">OneSnap</h2>
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
                  placeholder="Search galleries"
                  className="text-sm placeholder:text-secondary focus:outline-none focus:ring-0 active:outline-none active:ring-0"
                />
              </div>
              <ButtonPrimary
                icon={Plus}
                label={"Add OneSnap"}
                onClick={() => setIsAddOpen(true)}
              />
            </div>
          </div>

          <TableOneSnap items={paginated} isLoading={isLoading} />

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
      

      <ModalSubmitOneSnap
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAddProject}
      />
	</>
	)
}