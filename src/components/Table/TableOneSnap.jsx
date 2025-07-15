// src/components/Table/TableProjectList.jsx

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DropdownMenu from "@/components/Dropdown/DropdownMenu";
import {ModalSubmitOneSnap} from "@/components/Modal/ModalSubmitOneSnap";
import DropdownStage from "../Dropdown/DropdownStage";
import { SkeletonTable } from "@/components/Skeleton/SkeletonTable";
import ModalConfirm from "@/components/Modal/ModalConfirm";

export const TableOneSnap = ({ items, isLoading }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [activeRowId, setActiveRowId] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedOneSnap, setSelectedOneSnap]=useState(null)

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

  const handleDelete = () => {
    setIsDeleteOpen(true);
  };

  // Skeleton loading component

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
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
            projects.map((project, index) => (
              <tr
                key={index}
                className={`border-t border-neutral-300 hover:bg-neutral-200 cursor-pointer ${
                  activeRowId === project.number ? "!bg-primary-100" : ""
                }`}
                onClick={() => navigate(`/oneSnap/${project.id}`)}
              >
                <td>
                  {project.name}
                </td>
                <td className="w-52">
                  {project.date}
                </td>
                <td>
                  <div onClick={(e) => {
                  		e.stopPropagation();
                  		setSelectedOneSnap(project)
              		}}>
                    <DropdownMenu
                      onOpen={() => setActiveRowId(project.id)}
                      onClose={() => setActiveRowId(null)}
                      menu={[
                        {
                          id: uuidv4(),
                          name: "Delete",
                          icon: Trash2,
                      		isRed: true,
                          onClick: () => setIsDeleteOpen(true),
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
                    The galleries you are looking for was not found
                  </p>
                  <span className="text-xs text-secondary">
                    Try checking the spelling of the galleries or using other
                    keywords.
                  </span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <ModalConfirm
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title={`Do you want to delete ${selectedOneSnap?.name}?`}
        message="This file will be permanently deleted. You will not be able to recover it."
      />

      <ModalSubmitOneSnap
        isOpen={isEditOpen}
        onClose={() => handleOpenEdit(null)}
        onSubmit={handleEditProject}
        data={selectedProject}
      />
    </>
  );
};