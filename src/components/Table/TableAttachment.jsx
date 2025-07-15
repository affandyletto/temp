// src/components/Attachment/TableAttachment.js

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import { renderIcon } from "@/utils/icon";
import ModalRename from "@/components/Modal/ModalRename";
import ModalConfirm from "@/components/Modal/ModalConfirm";
import DropdownMenu from "@/components/Dropdown/DropdownMenu";
import { SkeletonTable } from "@/components/Skeleton/SkeletonTable";

const TableAttachment = ({ items, isLoading }) => {
  const [attachments, setAttachments] = useState(items);
  const [activeRowId, setActiveRowId] = useState(null);

  // Handle Rename
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [renameValue, setRenameValue] = useState("");
  const [renameTargetId, setRenameTargetId] = useState(null);

  const handleRename = (id, currentName) => {
    setRenameTargetId(id);
    setRenameValue(currentName);
    setIsRenameOpen(true);
  };
  const submitRename = () => {
    setAttachments((prev) =>
      prev.map((item) =>
        item.id === renameTargetId ? { ...item, name: renameValue } : item
      )
    );
    setIsRenameOpen(false);
  };

  // Handle Delete
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [targetDeleteId, setTargetDeleteId] = useState(null);

  const handleDelete = (id, currentName) => {
    setTargetDeleteId(id);
    setRenameValue(currentName);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    setAttachments((prev) => prev.filter((item) => item.id !== targetDeleteId));
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>File Name</th>
            <th>File Size</th>
            <th className="flex items-center space-x-1">
              <span>Created Date</span>
              <ArrowUpDown className="size-4" />
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>          
            {isLoading ? (
            // Show skeleton rows when loading
            Array.from({ length: 5 }).map((_, index) => (
              <SkeletonTable key={index} headerCount={4}/>
            ))
            ):
            attachments.map(({ id, name, size, createdAt, type }) => (
            <tr
              key={id}
              className={`border-t border-neutral-300 hover:bg-neutral-200 ${
                activeRowId === id ? "!bg-primary-100" : ""
              }`}
            >
              <td className="flex items-center gap-2">
                {renderIcon(type)}
                <span>{name}</span>
              </td>
              <td>{size}</td>
              <td>{createdAt}</td>
              <td>
                <DropdownMenu
                  onOpen={() => setActiveRowId(id)}
                  onClose={() => setActiveRowId(null)}
                  menu={[
                    {
                      id: uuidv4(),
                      name: "Rename",
                      icon: Pencil,
                      onClick: () => handleRename(id, name),
                    },
                    {
                      id: uuidv4(),
                      name: "Delete",
                      icon: Trash2,
                      isRed: true,
                      onClick: () => handleDelete(id, name),
                    },
                  ]}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalRename
        isOpen={isRenameOpen}
        onClose={() => setIsRenameOpen(false)}
        value={renameValue}
        setValue={setRenameValue}
        onSubmit={submitRename}
        title="Attachment Rename"
      />
      <ModalConfirm
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        title={`Do you want to delete ${renameValue}?`}
        message="This file will be permanently deleted. You will not be able to recover it."
      />
    </>
  );
};

export default TableAttachment;
