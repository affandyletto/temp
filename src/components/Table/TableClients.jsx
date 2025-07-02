// src/components/Table/TableClients.js
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ModalConfirm from "@/components/Modal/ModalConfirm";
import DropdownMenu from "@/components/Dropdown/DropdownMenu";
import { SkeletonTable } from "@/components/Skeleton/SkeletonTable";

const TableClients = ({ items, isLoading }) => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [activeRowId, setActiveRowId] = useState(null);

  useEffect(() => {
    setClients(items);
  }, [items]);

  // Handle Delete
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [targetDeleteId, setTargetDeleteId] = useState(null);

  const handleDelete = (id) => {
    setTargetDeleteId(id);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    setClients((prev) => prev.filter((item) => item.id !== targetDeleteId));
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Number</th>
            <th>Projects</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>

          {isLoading ? (
            // Show skeleton rows when loading
            Array.from({ length: 5 }).map((_, index) => (
              <SkeletonTable key={index} headerCount={5}/>
            ))
          ) : clients.map(({ id, name, email, number, projects }) => (
            <tr
              key={id}
              className={`border-t border-neutral-300 hover:bg-neutral-200 cursor-pointer ${
                activeRowId === id ? "!bg-primary-100" : ""
              }`}
              onClick={() => navigate(`/clients/${id}`)}
            >
              <td className="cursor-pointer">{name}</td>
              <td>{email}</td>
              <td>{number}</td>
              <td>{projects}</td>
              <td>
                <div onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu
                    onOpen={() => setActiveRowId(id)}
                    onClose={() => setActiveRowId(null)}
                    menu={[
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
              </td>
            </tr>
          ))}


          {clients.length === 0 && (
            <tr className="!border-none">
              <td colSpan={5}>
                <div className="space-y-1 text-center py-14">
                  <p className="text-sm font-semibold">
                    The company you are looking for was not found
                  </p>
                  <span className="text-xs text-secondary">
                    Try checking the spelling of the company name or using other
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
        onConfirm={confirmDelete}
        title={`Do you want to delete this Client?`}
        message="This survey will be permanently deleted. You will not be able to recover it."
      />
    </>
  );
};

export default TableClients;