// src/components/Table/TableUserList.js

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Pencil, Trash2 } from "lucide-react";
import ModalConfirm from "@/components/Modal/ModalConfirm";
import DropdownMenu from "@/components/Dropdown/DropdownMenu";
import UserTypeBadge from "@/components/Badge/UserTypeBadge";
import LastLoginDisplay from "@/components/LastLoginDisplay";
import OffcanvasEditUser from "../Offcanvas/OffcanvasEditUser";
import { SkeletonTable } from "@/components/Skeleton/SkeletonTable";

const TableUserList = ({ items, isLoading }) => {
  const [clients, setClients] = useState([]);
  const [activeRowId, setActiveRowId] = useState(null);

  useEffect(() => {
    setClients(items);
  }, [items]);

  // Handle Edit
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEditUser = (data) => {};

  const handleOpenEdit = (data) => {
    if (data) {
      setSelectedUser(data);
      setIsEditOpen(true);
    } else {
      setIsEditOpen(false);
      setSelectedUser(null);
    }
  };

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
      <div className="border border-neutral-300 rounded-lg">
        <table className="table w-full">
          <thead className="sticky top-0 bg-white z-10">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Type</th>
              <th>Last Login</th>
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
            clients.map((user) => (
              <tr
                key={user.id}
                className={`border-t border-neutral-300 hover:bg-neutral-200 ${
                  activeRowId === user.id ? "!bg-primary-100" : ""
                }`}
              >
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <UserTypeBadge type={user.type} />
                </td>
                <td>
                  <LastLoginDisplay value={user.lastLogin} />
                </td>
                <td>
                  <DropdownMenu
                    onOpen={() => setActiveRowId(user.id)}
                    onClose={() => setActiveRowId(null)}
                    menu={[
                      {
                        id: uuidv4(),
                        name: "Edit",
                        icon: Pencil,
                        onClick: () => handleOpenEdit(user),
                      },
                      {
                        id: uuidv4(),
                        name: "Delete",
                        icon: Trash2,
                        isRed: true,
                        onClick: () => handleDelete(user.id),
                      },
                    ]}
                  />
                </td>
              </tr>
            ))
            )}
            {clients.length === 0 && (
              <tr className="!border-none">
                <td colSpan={5}>
                  <div className="space-y-1 text-center py-14">
                    <p className="text-sm font-semibold">
                      The user you are looking for was not found
                    </p>
                    <span className="text-xs text-secondary">
                      Try checking the spelling of the user name or using other
                      keywords.
                    </span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ModalConfirm
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        title={`Do you want to delete this User?`}
        message="This user will be permanently deleted. You will not be able to recover it."
      />
      <OffcanvasEditUser
        isOpen={isEditOpen}
        onClose={() => handleOpenEdit(null)}
        onSubmit={handleEditUser}
        data={selectedUser}
      />
    </>
  );
};

export default TableUserList;
