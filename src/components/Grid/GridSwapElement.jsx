// src/components/Grid/GridUniversalElements.jsx
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Copy, Pencil, Trash2 } from "lucide-react";
import CardCollapseElement from "@/components/Card/CardCollapseElement";
import DropdownMenu from "@/components/Dropdown/DropdownMenu";
import ModalConfirm from "@/components/Modal/ModalConfirm";
import ModalAddElement from "@/components/Modal/ModalAddElement";
import ModalResponse from "@/components/Modal/ModalResponse";
import CardEmptyElement from "@/components/Card/CardEmptyElement";

const GridSwapElement = ({ items, toggleElement }) => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    setElements(items);
  }, [items]);

  // Handle Add
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <>
      {elements.map((element) => (
        <CardCollapseElement
          key={element.id}
          title={element.name}
          total={element.totalItems}
          items={element}
        >
          <div className="px-3 py-4">
            {element.listItems.length > 0 ? (
              <div className="grid grid-cols-9 gap-3">
                {element.listItems.map((item) => {
                  const isSelected = item.isSelected
                  
                  return (
                    <div
                      key={item.id}
                      className={`
                        relative flex items-center justify-center p-4 cursor-pointer
                        rounded-lg transition-all duration-200
                        ${isSelected 
                          ? 'outline outline-1 outline-offset-[-1px] outline-[#2C6499]' 
                          : 'hover:bg-slate-50'
                        }
                      `}
                      onClick={() => toggleElement(element, item)}
                    >
                      <div className="space-y-1">
                        <div className={`
                          flex items-center justify-center size-14 text-xs font-semibold rounded-full mx-auto
                           bg-primary-100 text-primary-200
                          }
                        `}>
                          {item.code}
                        </div>
                        <p className={`text-sm text-center`}>
                          {item.name}
                        </p>
                      </div>
                    </div>
                  );
                })}
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
    </>
  );
};

export default GridSwapElement;