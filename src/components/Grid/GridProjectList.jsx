// src/components/Attachment/GridProjectList.jsx

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Pencil } from "lucide-react";
import DropdownMenu from "@/components/Dropdown/DropdownMenu";
import ModalSubmitProject from "@/components/Modal/ModalSubmitProject";

const GridProjectList = ({ items }) => {
  const [projects, setProjects] = useState([]);
  const [activeRowId, setActiveRowId] = useState(null);

  useEffect(() => {
    setProjects(items);
  }, [items]);

  // Handle Edit
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleEditProject = (data) => {};

  const handleOpenEdit = (data) => {
    if (data) {
      setSelectedProject(data);
      setIsEditOpen(true);
    } else {
      setIsEditOpen(false);
      setSelectedProject(null);
    }
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`bg-white hover:bg-neutral-200 border border-neutral-400 rounded-lg overflow-hidden ${
              activeRowId === project.id ? "!bg-primary-100" : ""
            }`}
          >
            <div className="flex items-center justify-between py-3 px-4 border-b border-neutral-300">
              <div className="flex">
                <span className="text-sm">{project.name}</span>
              </div>
              <DropdownMenu
                onOpen={() => setActiveRowId(project.id)}
                onClose={() => setActiveRowId(null)}
                menu={[
                  {
                    id: uuidv4(),
                    name: "Edit",
                    icon: Pencil,
                    onClick: () => handleOpenEdit(project),
                  },
                ]}
              />
            </div>
            <div className="h-[266px] flex items-center justify-center p-3">
              <div className="flex items-center justify-center bg-light w-full h-full rounded-lg p-4"></div>
            </div>
          </div>
        ))}
      </div>

      <ModalSubmitProject
        isOpen={isEditOpen}
        onClose={() => handleOpenEdit(null)}
        onSubmit={handleEditProject}
        data={selectedProject}
      />
    </>
  );
};

export default GridProjectList;
