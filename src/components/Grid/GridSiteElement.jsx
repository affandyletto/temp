// src/components/Grid/GridUniversalElements.jsx

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Copy, Pencil, Trash2 } from "lucide-react";
import CardCollapseSiteElement from "@/components/Card/CardCollapseSiteElement";
import DropdownMenu from "@/components/Dropdown/DropdownMenu";
import ModalConfirm from "@/components/Modal/ModalConfirm";
import ModalAddElement from "@/components/Modal/ModalAddElement";
import ModalResponse from "@/components/Modal/ModalResponse";
import CardEmptyElement from "@/components/Card/CardEmptyElement";

const GridSiteElement = ({ items=[], toggleElement }) => {
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
      {elements?.map((element) => (
        <CardCollapseSiteElement
          key={element.id}
          title={element.name}
          total={element.totalItems}
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

                    {item?.isFavorite?
                    	<img src="/images/action-star-filled.svg" alt="Star" className="cursor-pointer" onClick={()=>toggleElement(element, item)} />
                    :
                    	<img src="/images/action-star-outline.svg" alt="Star" className="cursor-pointer" onClick={()=>toggleElement(element, item)} />
                	}
                    

                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <CardEmptyElement
                title=" Your list is empty"
                description="Add your first element to get started."
                label="Add Element"
                onClick={setIsAddOpen}
              />
            )}
          </div>
        </CardCollapseSiteElement>
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
    </>
  );
};

export default GridSiteElement;
