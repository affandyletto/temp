// src/apps/Projects/Gallery.jsx
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ArrowUpDown, Trash2, Eye, Download, Pencil } from "lucide-react";
import { reportItems } from "@/data/floorplan";
import ModalConfirm from "@/components/Modal/ModalConfirm";
import ButtonDownload from "@/components/Button/ButtonDownload";
import DropdownMenu from "@/components/Dropdown/DropdownMenu";
import { SkeletonTable } from "@/components/Skeleton/SkeletonTable";
import ButtonPrimary from "@/components/Button/ButtonPrimary";

import { FileText, Clock, User, MoreHorizontal, GitBranch, LayoutPanelTop } from "lucide-react";

const CleanCard=()=> {
  return (
    <div className="w-full p-4 bg-white rounded-2xl border border-slate-200 flex justify-between items-center gap-5">
      {/* Icon */}
      <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.25 5.5C20.25 4.80964 19.6904 4.25 19 4.25H5C4.30964 4.25 3.75 4.80964 3.75 5.5V19.5C3.75 20.1904 4.30964 20.75 5 20.75H19C19.6904 20.75 20.25 20.1904 20.25 19.5V5.5ZM21.75 19.5C21.75 21.0188 20.5188 22.25 19 22.25H5C3.48122 22.25 2.25 21.0188 2.25 19.5V5.5C2.25 3.98122 3.48122 2.75 5 2.75H19C20.5188 2.75 21.75 3.98122 21.75 5.5V19.5Z" fill="#2C6499"/>
          <path d="M21 8.75C21.4142 8.75 21.75 9.08579 21.75 9.5C21.75 9.91421 21.4142 10.25 21 10.25H3C2.58579 10.25 2.25 9.91421 2.25 9.5C2.25 9.08579 2.58579 8.75 3 8.75H21Z" fill="#2C6499"/>
          <path d="M8.25 21.5V9.5C8.25 9.08579 8.58579 8.75 9 8.75C9.41421 8.75 9.75 9.08579 9.75 9.5V21.5C9.75 21.9142 9.41421 22.25 9 22.25C8.58579 22.25 8.25 21.9142 8.25 21.5Z" fill="#2C6499"/>
        </svg>
      </div>
      
      {/* Content */}
      <div className="flex-1 flex flex-col gap-2">
        {/* Title and Version */}
        <div className="flex items-center gap-3">
          <h3 className="text-gray-800 text-base font-semibold">25M316-Test</h3>
          <div className="px-3 py-1 bg-blue-50 rounded-full flex items-center gap-1">
            <GitBranch className="w-3 h-3 text-primary-200" />
            <span className="text-primary-200 text-xs font-semibold">Version A</span>
          </div>
        </div>
        
        {/* Metadata */}
        <div className="flex items-center gap-2 text-zinc-500 text-xs">
          <span>25 Mauchly STE316</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>05/21/2025 11:37 AM</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <User className="w-3.5 h-3.5" />
            <span>River Stewart</span>
          </div>
        </div>
      </div>
      
      {/* Action Button */}
      <button className="p-2 bg-white rounded-lg border border-slate-200 hover:bg-gray-50 flex-shrink-0">
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.5 6.5V3H10C9.72386 3 9.5 2.77614 9.5 2.5C9.5 2.22386 9.72386 2 10 2H14C14.2761 2 14.5 2.22386 14.5 2.5V6.5C14.5 6.77614 14.2761 7 14 7C13.7239 7 13.5 6.77614 13.5 6.5Z" fill="#1D2433"/>
          <path d="M13.6438 2.14645C13.8391 1.95118 14.1556 1.95118 14.3509 2.14645C14.5461 2.34171 14.5461 2.65822 14.3509 2.85348L7.01754 10.1868C6.82228 10.3821 6.50577 10.3821 6.31051 10.1868C6.11525 9.99155 6.11525 9.67504 6.31051 9.47978L13.6438 2.14645Z" fill="#1D2433"/>
          <path d="M1.5 13.1667V5.83333C1.5 5.3471 1.69329 4.88093 2.03711 4.53711C2.38093 4.19329 2.8471 4 3.33333 4H7.33333C7.60948 4 7.83333 4.22386 7.83333 4.5C7.83333 4.77614 7.60948 5 7.33333 5H3.33333C3.11232 5 2.90042 5.08786 2.74414 5.24414C2.58786 5.40042 2.5 5.61232 2.5 5.83333V13.1667C2.5 13.3877 2.58786 13.5996 2.74414 13.7559C2.90042 13.9121 3.11232 14 3.33333 14H10.6667C10.8877 14 11.0996 13.9121 11.2559 13.7559C11.4121 13.5996 11.5 13.3877 11.5 13.1667V9.16667C11.5 8.89052 11.7239 8.66667 12 8.66667C12.2761 8.66667 12.5 8.89052 12.5 9.16667V13.1667C12.5 13.6529 12.3067 14.1191 11.9629 14.4629C11.6191 14.8067 11.1529 15 10.6667 15H3.33333C2.8471 15 2.38093 14.8067 2.03711 14.4629C1.69329 14.1191 1.5 13.6529 1.5 13.1667Z" fill="#1D2433"/>
        </svg>
      </button>
    </div>
  );
}

export const FloorplanBuilder = () => {
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
           <h2 className="text-xl font-semibold">Floor Plan Builder</h2>
           <div data-option="Default" data-show-action-arrow_up-outline="true" data-show-icon="true" data-truncate="false" data-type="Secondary" data-variant="Opsi 1" className="px-2 py-0.5 bg-blue-50 rounded-[999px] inline-flex justify-center items-center gap-2.5">
             <div className="justify-start text-primary-200 text-[10px] font-normal font-['Inter'] leading-none tracking-tight">{reports?.length} Photos</div>
           </div>
         </div>
       </div>
       <ButtonPrimary
         svg={
           <svg width="24" height="23" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.25 5.5C20.25 4.80964 19.6904 4.25 19 4.25H5C4.30964 4.25 3.75 4.80964 3.75 5.5V19.5C3.75 20.1904 4.30964 20.75 5 20.75H19C19.6904 20.75 20.25 20.1904 20.25 19.5V5.5ZM21.75 19.5C21.75 21.0188 20.5188 22.25 19 22.25H5C3.48122 22.25 2.25 21.0188 2.25 19.5V5.5C2.25 3.98122 3.48122 2.75 5 2.75H19C20.5188 2.75 21.75 3.98122 21.75 5.5V19.5Z" fill="white"/>
            <path d="M21 8.75C21.4142 8.75 21.75 9.08579 21.75 9.5C21.75 9.91421 21.4142 10.25 21 10.25H3C2.58579 10.25 2.25 9.91421 2.25 9.5C2.25 9.08579 2.58579 8.75 3 8.75H21Z" fill="white"/>
            <path d="M8.25 21.5V9.5C8.25 9.08579 8.58579 8.75 9 8.75C9.41421 8.75 9.75 9.08579 9.75 9.5V21.5C9.75 21.9142 9.41421 22.25 9 22.25C8.58579 22.25 8.25 21.9142 8.25 21.5Z" fill="white"/>
           </svg>
         }
         label={"Start Building"}
       />
      </div>

      <div className="flex flex-col gap-4 mt-8">
       <CleanCard/><CleanCard/><CleanCard/>
      </div>
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