// src/components/Topbar.js

import { v4 as uuidv4 } from "uuid";
import { Archive, Copy, PanelRight, Pencil } from "lucide-react";
import { useSidebar } from "@/context/SidebarContext";
import { useState, useRef, useEffect } from "react";
import ModalConfirm from "@/components/Modal/ModalConfirm";
import ModalCopyProject from "@/components/Modal/ModalCopyProject";
import DropdownMenu from "@/components/Dropdown/DropdownMenu";
import { useParams } from "react-router-dom";

const Topbar = ({ title, isRename = false }) => {
  const { id: projectId } = useParams();
  const { toggleSidebar } = useSidebar();

  // Handle Rename
  const [isEditing, setIsEditing] = useState(false);
  const [projectName, setProjectName] = useState(title);
  const [newProjectName, setNewProjectName] = useState(`(Copy) ${projectName}`);
  const [showEditIcon, setShowEditIcon] = useState(false);
  const inputRef = useRef(null);

  const handleRename = () => {
    if (projectName.trim() !== "") {
      setIsEditing(false);
      setShowEditIcon(false);
    }
  };

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  // Handle Duplicate
  const [isDuplicateOpen, setIsDuplicateOpen] = useState(false);
  const [targetDuplicateId, setTargetDuplicateId] = useState(null);

  const handleDuplicate = (id) => {
    setTargetDuplicateId(id);
    setIsDuplicateOpen(true);
  };

  const confirmDuplicate = () => {
    console.log(targetDuplicateId);
  };

  // Handle Archive
  const [isEnabled, setIsEnabled] = useState(false);

  const handleArchive = (id) => {
    setIsEnabled(true);
  };

  return (
    <>
      <div className="flex items-center justify-between bg-white border-b border-b-neutral-400 py-4 px-6">
        <div className="flex items-center justify-start gap-6">
          <button
            type="button"
            className="flex items-center justify-center hover:bg-primary-200 hover:bg-opacity-5 rounded-md p-0.5"
            onClick={toggleSidebar}
          >
            <PanelRight className="size-7" />
          </button>

          {/* Rename Project Section */}
          <div
            className="relative group"
            onMouseEnter={() => setShowEditIcon(true)}
            onMouseLeave={() => setShowEditIcon(false)}
          >
            {!isEditing ? (
              <div className="flex items-center gap-2">
                <h6 className="text-xl font-semibold">{projectName}</h6>
                {showEditIcon && isRename && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="text-neutral-500 hover:text-primary-200"
                  >
                    <Pencil className="size-4" />
                  </button>
                )}
              </div>
            ) : (
              <input
                ref={inputRef}
                type="text"
                value={projectName}
                size={projectName.length || 1}
                onChange={(e) => setProjectName(e.target.value)}
                onBlur={handleRename}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRename();
                }}
                className="text-xl font-semibold px-3 py-1.5 border border-neutral-400 rounded-lg bg-white focus:outline-none focus:ring-0 active:outline-none active:ring-0"
              />
            )}
            { projectId && <p className="text-sm text-secondary">#{projectId}</p>}
          </div>
        </div>
        {isRename && (
          <DropdownMenu
            menu={[
              {
                id: uuidv4(),
                name: "Copy Project",
                icon: Copy,
                onClick: () => handleDuplicate(123),
              },
              {
                id: uuidv4(),
                name: "Archive Site",
                icon: Archive,
                onClick: () => handleArchive(123),
              },
            ]}
          />
        )}
      </div>

      <ModalCopyProject
        value={newProjectName}
        setValue={setNewProjectName}
        isOpen={isDuplicateOpen}
        onClose={() => setIsDuplicateOpen(false)}
        onConfirm={confirmDuplicate}
      />
      <ModalConfirm
        isOpen={isEnabled}
        onClose={() => setIsEnabled(false)}
        onConfirm={handleArchive}
        title="Archive Site"
        message="Do you want to archive this site ?"
      />
    </>
  );
};

export default Topbar;
