// src/components/Grid/GridUniversalElements.jsx

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Copy, Pencil, Plus, Trash2 } from "lucide-react";
import CardCollapseElement from "../Card/CardCollapseElement";
import ButtonSecondary from "../Button/ButtonSecondary";
import DropdownMenu from "../Dropdown/DropdownMenu";
import ModalConfirm from "../Modal/ModalConfirm";
import ModalAddElement from "../Modal/ModalAddElement";
import ModalResponse from "../Modal/ModalResponse";

const GridUniversalElements = ({ items }) => {
  const [elements, setElements] = useState([]);
  const [selectElement, setSelectElement] = useState(null);

  useEffect(() => {
    setElements(items);
  }, [items]);

  // Handle Add
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Handle Edit
  const handleEditElement = (value) => {
    setSelectElement(value);
    setIsAddOpen(true);
  };

  // Handle Duplicate
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const handleDuplicate = () => {
    setIsSuccessOpen(true);
  };

  // Handle Delete
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [targetDeleteId, setTargetDeleteId] = useState(null);

  const handleDelete = (id) => {
    setTargetDeleteId(id);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    console.log(targetDeleteId);
  };

  return (
    <>
      {elements.map((element) => (
        <CardCollapseElement
          key={element.id}
          title={element.name}
          items={element}
        >
          <div className="px-3 py-4">
            {element.listItems.length > 0 ? (
              <div className="grid grid-cols-9 gap-3">
                {element.listItems.map((item) => (
                  <div
                    key={item.id}
                    className="relative flex items-center justify-center p-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-center size-14 bg-primary-100 text-xs font-semibold text-primary-200 rounded-full mx-auto">
                        {item.code}
                      </div>
                      <p className="text-sm">{item.name}</p>
                    </div>
                    <div className="absolute top-1 right-1">
                      <DropdownMenu
                        menu={[
                          {
                            id: uuidv4(),
                            name: "Edit",
                            icon: Pencil,
                            onClick: () => handleEditElement(item),
                          },
                          {
                            id: uuidv4(),
                            name: "Duplicate",
                            icon: Copy,
                            onClick: handleDuplicate,
                          },
                          {
                            id: uuidv4(),
                            name: "Delete",
                            icon: Trash2,
                            isRed: true,
                            onClick: () => handleDelete(item.id),
                          },
                        ]}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4 text-center p-8">
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold">Your list is empty</p>
                  <span className="text-xs text-secondary">
                    Add your first element to get started.
                  </span>
                </div>
                <div className="flex justify-center">
                  <ButtonSecondary
                    icon={Plus}
                    type={"button"}
                    label={"Add Element"}
                    onClick={setIsAddOpen}
                  />
                </div>
              </div>
            )}
          </div>
        </CardCollapseElement>
      ))}
      {elements.length === 0 && (
        <div className="space-y-1 text-center py-14">
          <p className="text-sm font-semibold">
            The element you are looking for was not found
          </p>
          <span className="text-xs text-secondary">
            Try checking the spelling of the element name or using other
            keywords.
          </span>
        </div>
      )}

      <ModalConfirm
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        title={`Do you want to delete this Element?`}
        message="This element will be permanently deleted. You will not be able to recover it."
      />

      <ModalAddElement
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        data={selectElement}
      />
      <ModalResponse
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        isSuccess
        message="Element successfully duplicated"
      />
    </>
  );
};

export default GridUniversalElements;
