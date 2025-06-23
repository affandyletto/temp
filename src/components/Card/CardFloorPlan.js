// src/components/Card/CardFloorPlan.js

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Archive,
  ArchiveX,
  Copy,
  FolderSync,
  Pencil,
  Trash,
} from "lucide-react";
import DropdownMenu from "../Dropdown/DropdownMenu";

const CardFloorPlan = ({
  id,
  name,
  lastUpdated,
  thumbnail,
  isArchive,
  onRename,
  onTransfer,
  onDuplicate,
  onArchive,
  onDelete,
}) => {
  const [activeRowId, setActiveRowId] = useState(null);

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
                icon: Trash,
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
                icon: Trash,
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
