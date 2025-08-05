// src/apps/Projects/Gallery.jsx
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ArrowUpDown, Trash2, Eye, Download, Pencil } from "lucide-react";
import { reportItems } from "@/data/floorplan";
import ModalConfirm from "@/components/Modal/ModalConfirm";
import ButtonDownload from "@/components/Button/ButtonDownload";
import DropdownMenu from "@/components/Dropdown/DropdownMenu";
import { SkeletonTable } from "@/components/Skeleton/SkeletonTable";

export const OneSnapReports = () => {
  // Loading
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const [reports, setReports] = useState(reportItems);
  const [activeRowId, setActiveRowId] = useState(null);

  // Handle Delete
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [targetDeleteId, setTargetDeleteId] = useState(null);

  const handleDelete = (id) => {
    setTargetDeleteId(id);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    setReports((prev) => prev.filter((item) => item.id !== targetDeleteId));
  };

  return (
    <>      
    	<div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <h2 className="text-xl font-semibold">Reports</h2>
                  <div data-option="Default" data-show-action-arrow_up-outline="true" data-show-icon="true" data-truncate="false" data-type="Secondary" data-variant="Opsi 1" className="px-2 py-0.5 bg-blue-50 rounded-[999px] inline-flex justify-center items-center gap-2.5">
                    <div className="justify-start text-primary-200 text-[10px] font-normal font-['Inter'] leading-none tracking-tight">{reports?.length} Photos</div>
                  </div>
                </div>
              </div>
            </div>
        <table className="table mt-4">
          <thead>
            <tr>
              <th>Report Details</th>
              <th>Type</th>
              <th>
                <div className="flex items-center space-x-1">
                  <span>Date & TIme</span>
                  <ArrowUpDown className="size-4" />
                </div>
              </th>
              <th>
                <div className="flex items-center space-x-1">
                  <span>Created By</span>
                  <ArrowUpDown className="size-4" />
                </div>
              </th>
              <th>Download</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                      <SkeletonTable key={index} headerCount={6}/>
                    ))
              ) : 
              reports.map(
              ({
                id,
                detail,
                type,
                dateTime,
                createdBy,
                fileName,
                fileUrl,
              }) => (
                <tr
                  key={id}
                  className={`border-t border-neutral-300 hover:bg-neutral-200 ${
                    activeRowId === id ? "!bg-primary-100" : ""
                  }`}
                >
                  <td className="flex items-center gap-2">
                    <span>{detail}</span>
                  </td>
                  <td className="uppercase">
                    <span className="bg-primary-200 py-1 px-2 rounded-full text-[10px] text-white">
                      {type}
                    </span>
                  </td>
                  <td>{dateTime}</td>
                  <td>{createdBy}</td>
                  <td>
                    <ButtonDownload
                      sizeIcon={"size-4"}
                      sizeBtn={"size-8"}
                      fileUrl={fileUrl}
                      fileName={fileName}
                    />
                  </td>
                  <td>
                    <DropdownMenu
                      onOpen={() => setActiveRowId(id)}
                      onClose={() => setActiveRowId(null)}
                      menu={[
                      	{
                          id: uuidv4(),
                          name: "Preview",
                          icon: Eye,
                          onClick: () => handleDelete(id),
                        },
                        {
                          id: uuidv4(),
                          name: "Download",
                          icon: Download,
                          onClick: () => handleDelete(id),
                        },
                        {
                          id: uuidv4(),
                          name: "Edit",
                          icon: Pencil,
                          onClick: () => handleDelete(id),
                        },
                        {
                          id: uuidv4(),
                          name: "Delete",
                          icon: Trash2,
                          isRed: true,
                          onClick: () => handleDelete(id),
                        },
                      ]}
                    />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      
      <ModalConfirm
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        title={`Do you want to delete this report?`}
        message="This file will be permanently deleted. You will not be able to recover it."
      />
    </>
  );
};