// src/apps/Projects/Surveys.jsx

import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { floorPlanItems } from "@/data/floorplan";
import Toggle from "@/components/Toggle/Toggle";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import CardFloorPlan from "@/components/Card/CardFloorPlan";
import ModalRename from "@/components/Modal/ModalRename";
import ModalTransfer from "@/components/Modal/ModalTransfer";
import ModalConfirm from "@/components/Modal/ModalConfirm";
import ModalAddFloorPlan from "@/components/Modal/ModalAddFloorPlan";
import SkeletonCard from "@/components/Skeleton/SkeletonCard";

const Surveys = () => {
  // Loading
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const [floorPlans, setFloorPlans] = useState(floorPlanItems);

  // Handle Add
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newPlanName, setNewPlanName] = useState("");

  const handleAddFloorPlan = () => {
    const newPlan = {
      id: uuidv4(),
      name: newPlanName || "Untitled Floor Plan",
      lastUpdated: "Today",
      thumbnail: "/images/sample-floor-plan.webp",
      isArchive: false,
    };

    setFloorPlans((prev) => [newPlan, ...prev]);
    setNewPlanName("");
    setIsAddOpen(false);
  };

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
    setFloorPlans((prev) =>
      prev.map((item) =>
        item.id === renameTargetId ? { ...item, name: renameValue } : item
      )
    );
    setIsRenameOpen(false);
  };

  // Handle Transfer
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");
  const projectOptions = [
    { value: "project-123", label: "Project Alpha" },
    { value: "project-456", label: "Project Beta" },
  ];

  const handleTransfer = () => {
    setSelectedProject("");
    setIsTransferOpen(true);
  };

  const submitTransfer = () => {
    setIsTransferOpen(false);
  };

  // Handle Duplicate
  const [isDuplicateOpen, setIsDuplicateOpen] = useState(false);
  const [targetDuplicateId, setTargetDuplicateId] = useState(null);

  const handleDuplicate = (id) => {
    setTargetDuplicateId(id);
    setIsDuplicateOpen(true);
  };

  const confirmDuplicate = () => {
    const original = floorPlanItems.find(
      (item) => item.id.toString() === targetDuplicateId.toString()
    );
    if (!original) return;

    const duplicated = {
      ...original,
      id: Date.now(),
      name: original.name + " Copy",
      lastUpdated: "Just now",
    };

    setFloorPlans((prev) => [...prev, duplicated]);
  };

  // Handle Archive
  const [isEnabled, setIsEnabled] = useState(false);

  const handleArchive = (id, isArchive) => {
    setFloorPlans((prev) =>
      prev.map((plan) =>
        plan.id === id ? { ...plan, isArchive: !isArchive } : plan
      )
    );
  };

  // Handle Delete
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [targetDeleteId, setTargetDeleteId] = useState(null);

  const handleDelete = (id) => {
    setTargetDeleteId(id);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    setFloorPlans((prev) => prev.filter((item) => item.id !== targetDeleteId));
  };

  return (
    <>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <ButtonPrimary
              icon={Plus}
              label={"Add Floor Plan"}
              onClick={() => setIsAddOpen(true)}
            />
            <Toggle
              label={`${isEnabled ? "Archived" : "Active"}`}
              value={isEnabled}
              onChange={setIsEnabled}
            />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {floorPlans
              .filter((item) => item.isArchive === isEnabled)
              .map((item) => (
                <CardFloorPlan
                  key={item.id}
                  {...item}
                  isLoading={isLoading}
                  onRename={() => handleRename(item.id, item.name)}
                  onTransfer={() => handleTransfer(item.id)}
                  onDuplicate={() => handleDuplicate(item.id)}
                  onArchive={() => handleArchive(item.id, item.isArchive)}
                  onDelete={() => handleDelete(item.id)}
                />
              ))}
          </div>
        </div>
      <ModalAddFloorPlan
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        value={newPlanName}
        setValue={setNewPlanName}
        onSubmit={handleAddFloorPlan}
      />
      <ModalRename
        isOpen={isRenameOpen}
        onClose={() => setIsRenameOpen(false)}
        value={renameValue}
        setValue={setRenameValue}
        onSubmit={submitRename}
        title="Floorplan Rename"
      />
      <ModalTransfer
        isOpen={isTransferOpen}
        onClose={() => setIsTransferOpen(false)}
        value={selectedProject}
        setValue={setSelectedProject}
        projectOptions={projectOptions}
        onSubmit={submitTransfer}
      />
      <ModalConfirm
        isOpen={isDuplicateOpen}
        onClose={() => setIsDuplicateOpen(false)}
        onConfirm={confirmDuplicate}
        title="Do you want to duplicate this floorplan ?"
      />
      <ModalConfirm
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        title="Do you want to delete this Survey?"
        message="This survey will be permanently deleted. You will not be able to recover it."
      />
    </>
  );
};

export default Surveys;
