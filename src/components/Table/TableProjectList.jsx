// src/components/Table/TableProjectList.jsx

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Pencil } from "lucide-react";
import DropdownMenu from "@/components/Dropdown/DropdownMenu";
import ModalSubmitProject from "@/components/Modal/ModalSubmitProject";
import DropdownStage from "../Dropdown/DropdownStage";

const TableProjectList = ({ items }) => {
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
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Stage</th>
            <th>Client Organization</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr
              key={project.id}
              className={`border-t border-neutral-300 hover:bg-neutral-200 ${
                activeRowId === project.id ? "!bg-primary-100" : ""
              }`}
            >
              <td width="30%">{project.name}</td>
              <td>{project.number}</td>
              <td className="w-52">
                  <DropdownStage
                    stage_id={project.stage_id}
                    onChange={(item) => {
                      const updated = projects.map((p) =>
                        p.id === project.id
                          ? { ...p, stage_id: item.id, stage: item.name }
                          : p
                      );
                      setProjects(updated);
                    }}
                  />
              </td>
              <td>{project.clientOrganization}</td>
              <td>
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
              </td>
            </tr>
          ))}
          {projects.length === 0 && (
            <tr className="!border-none">
              <td colSpan={5}>
                <div className="space-y-1 text-center py-14">
                  <p className="text-sm font-semibold">
                    The project you are looking for was not found
                  </p>
                  <span className="text-xs text-secondary">
                    Try checking the spelling of the project name or using other keywords.
                  </span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <ModalSubmitProject
        isOpen={isEditOpen}
        onClose={() => handleOpenEdit(null)}
        onSubmit={handleEditProject}
        data={selectedProject}
      />
    </>
  );
};

export default TableProjectList;
