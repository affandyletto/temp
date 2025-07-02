// src/components/Table/TableProjectList.jsx

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DropdownMenu from "@/components/Dropdown/DropdownMenu";
import ModalSubmitProject from "@/components/Modal/ModalSubmitProject";
import DropdownStage from "../Dropdown/DropdownStage";
import { SkeletonTable } from "@/components/Skeleton/SkeletonTable";

const TableProjectList = ({ items, isLoading }) => {
  const navigate = useNavigate();
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

  // Skeleton loading component

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
          {isLoading ? (
            // Show skeleton rows when loading
            Array.from({ length: 5 }).map((_, index) => (
              <SkeletonTable key={index} headerCount={5}/>
            ))
          ) : (
            // Show actual data when not loading
            projects.map((project) => (
              <tr
                key={project.number}
                className={`border-t border-neutral-300 hover:bg-neutral-200 cursor-pointer ${
                  activeRowId === project.number ? "!bg-primary-100" : ""
                }`}
                onClick={() => navigate(`/projects/${project.number}`)}
              >
                <td>
                  {project.name}
                </td>
                <td>{project.number}</td>
                <td className="w-52">
                  <div onClick={(e) => e.stopPropagation()}>
                    <DropdownStage
                      position="left"
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
                  </div>
                </td>
                <td>{project.clientOrganization}</td>
                <td>
                  <div onClick={(e) => e.stopPropagation()}>
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
                </td>
              </tr>
            ))
          )}
          
          {!isLoading && projects.length === 0 && (
            <tr className="!border-none">
              <td colSpan={5}>
                <div className="space-y-1 text-center py-14">
                  <p className="text-sm font-semibold">
                    The project you are looking for was not found
                  </p>
                  <span className="text-xs text-secondary">
                    Try checking the spelling of the project name or using other
                    keywords.
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