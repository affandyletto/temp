// src/components/Table/TableClients.js

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Eye, Trash } from "lucide-react";
import ModalConfirm from "../Modal/ModalConfirm";
import DropdownMenu from "../Dropdown/DropdownMenu";
import { useGoToDetailPage } from "../../utils/navigation";

const TableClients = ({ items }) => {
  const [clients, setClients] = useState([]);
  const [activeRowId, setActiveRowId] = useState(null);

  useEffect(() => {
    setClients(items);
  }, [items]);

  // Handle Detail
  const goToClient = useGoToDetailPage("/clients");

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
          {clients.map(({ id, name, email, number, projects }) => (
            <tr
              key={id}
              className={`border-t border-neutral-300 hover:bg-neutral-200 ${
                activeRowId === id ? "!bg-primary-100" : ""
              }`}
            >
              <td>{name}</td>
              <td>{email}</td>
              <td>{number}</td>
              <td>{projects}</td>
              <td>
                <DropdownMenu
                  onOpen={() => setActiveRowId(id)}
                  onClose={() => setActiveRowId(null)}
                  menu={[
                    {
                      id: uuidv4(),
                      name: "Detail",
                      icon: Eye,
                      onClick: () => goToClient(id),
                    },
                    {
                      id: uuidv4(),
                      name: "Delete",
                      icon: Trash,
                      isRed: true,
                      onClick: () => handleDelete(id),
                    },
                  ]}
                />
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
