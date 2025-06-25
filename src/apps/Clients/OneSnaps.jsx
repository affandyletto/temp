// src/apps/Clients/OneSnaps.jsx

import { useEffect, useMemo, useState } from "react";
import { mockClients, mockSnaps } from "@/data/clients";
import { useParams } from "react-router-dom";
import Pagination from "@/components/Pagination";
import SelectRowsPerPage from "@/components/SelectRowsPerPage";
import TableClientSnap from "@/components/Table/TableClientSnap";

const OneSnaps = () => {
  const [dataClient, setDataClient] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    setDataClient(mockClients.find((item) => item.id === id));
  }, [id]);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(mockSnaps.length / rowsPerPage);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return mockSnaps.slice(start, start + rowsPerPage);
  }, [currentPage, rowsPerPage]);

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Detail {dataClient?.name}</h2>
        </div>

        <TableClientSnap items={paginated} />

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

export default OneSnaps;
