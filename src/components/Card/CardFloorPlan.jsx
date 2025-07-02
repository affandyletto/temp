// src/components/Card/CardFloorPlan.js
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Archive,
  ArchiveX,
  Copy,
  FolderSync,
  Pencil,
  Trash2,
} from "lucide-react";
import DropdownMenu from "@/components/Dropdown/DropdownMenu";

const CardFloorPlan = ({
  id,
  name,
  lastUpdated,
  thumbnail,
  isArchive,
  isLoading,
  onRename,
  onTransfer,
  onDuplicate,
  onArchive,
  onDelete,
}) => {
  const [activeRowId, setActiveRowId] = useState(null);

  // Skeleton loading component
  if (isLoading) {
    return (
      <div className="w-full h-[308px] bg-white border border-neutral-400 rounded-lg py-4 animate-pulse">
        <div className="flex items-center justify-between space-x-2 border-b border-neutral-400 px-4 pb-3">
          <div className="flex-1">
            <div className="h-4 bg-neutral-300 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-neutral-300 rounded w-1/2"></div>
          </div>
          <div className="h-8 w-8 bg-neutral-300 rounded"></div>
        </div>
        <div className="flex items-center justify-center pt-4 px-4">
          <div className="w-full h-[200px] bg-neutral-300 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full h-[308px] bg-white hover:bg-neutral-200 border border-neutral-400 rounded-lg py-4 ${
        activeRowId === id ? "!bg-primary-100" : ""
      }`}
    >
      <div className="flex items-center justify-between space-x-2 border-b border-neutral-400 px-4 pb-3">
        <div>
          <p className="text-sm font-semibold leading-none">{name}</p>
          <span className="text-xs text-secondary">
            Last updated {lastUpdated}
          </span>
        </div>
        {isArchive ? (
          <DropdownMenu
            onOpen={() => setActiveRowId(id)}
            onClose={() => setActiveRowId(null)}
            menu={[
              {
                id: uuidv4(),
                name: "Rename",
                icon: Pencil,
                onClick: () => {
                  onRename?.();
                },
              },
              {
                id: uuidv4(),
                name: "Unarchive",
                icon: ArchiveX,
                onClick: () => {
                  onArchive?.();
                },
              },
              {
                id: 5,
                name: "Delete",
                icon: Trash2,
                isRed: true,
                onClick: () => {
                  onDelete?.();
                },
              },
            ]}
          />
        ) : (
          <DropdownMenu
            onOpen={() => setActiveRowId(id)}
            onClose={() => setActiveRowId(null)}
            menu={[
              {
                id: 1,
                name: "Rename",
                icon: Pencil,
                onClick: () => {
                  onRename?.();
                },
              },
              {
                id: 2,
                name: "Transfer File",
                icon: FolderSync,
                onClick: () => {
                  onTransfer?.();
                },
              },
              {
                id: 3,
                name: "Duplicate",
                icon: Copy,
                onClick: () => {
                  onDuplicate?.();
                },
              },
              {
                id: 4,
                name: "Archive",
                icon: Archive,
                onClick: () => {
                  onArchive?.();
                },
              },
              {
                id: 5,
                name: "Delete",
                icon: Trash2,
                isRed: true,
                onClick: () => {
                  onDelete?.();
                },
              },
            ]}
          />
        )}
      </div>
      <div className="flex items-center justify-center pt-4">
        <img
          src={thumbnail}
          alt="Thumbnail"
          className="w-full h-[200px] object-cover"
        />
      </div>
    </div>
  );
};

export default CardFloorPlan;