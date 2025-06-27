// src/components/Attachment/GridAttachment.js

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { renderIcon } from "@/utils/icon";
import { Pencil, Trash2 } from "lucide-react";
import ModalRename from "@/components/Modal/ModalRename";
import ModalConfirm from "@/components/Modal/ModalConfirm";
import DropdownMenu from "@/components/Dropdown/DropdownMenu";

const GridAttachment = ({ items }) => {
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
      <div className="grid grid-cols-4 gap-6">
        {attachments.map(({ id, name, url, type }) => (
          <div
            key={id}
            className={`bg-white hover:bg-neutral-200 border border-neutral-400 rounded-lg overflow-hidden ${
              activeRowId === id ? "!bg-primary-100" : ""
            }`}
          >
            <div className="flex items-center justify-between py-3 px-4 border-b border-neutral-300">
              <div className="flex items-center gap-2">
                {renderIcon(type)}
                <span className="text-sm">{name}</span>
              </div>
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
                    onClick: () => handleDelete(id),
                  },
                ]}
              />
            </div>
            <div className="h-[266px] flex items-center justify-center p-3">
              {type === "image" ? (
                <img
                  src={url}
                  alt={name}
                  className="object-cover bg-light w-full h-full rounded-lg"
                />
              ) : (
                <div className="flex items-center justify-center bg-light w-full h-full rounded-lg p-4"></div>
              )}
            </div>
          </div>
        ))}
      </div>
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

export default GridAttachment;
