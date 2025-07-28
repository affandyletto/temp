// src/components/Grid/GridSiteElementLibrary.jsx

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Copy, Pencil, Trash2 } from "lucide-react";
import CardCollapseSuper from "@/components/Card/CardCollapseSuper";
import DropdownMenu from "@/components/Dropdown/DropdownMenu";
import ModalConfirm from "@/components/Modal/ModalConfirm";
import ModalAddElement from "@/components/Modal/ModalAddElement";
import ModalResponse from "@/components/Modal/ModalResponse";
import CardCollapseElement from "@/components/Card/CardCollapseElement";
import CardEmptyElement from "@/components/Card/CardEmptyElement";
import CardCollapse from "@/components/Card/CardCollapse";
import ProgressBarSeatUsage from "@/components/ProgressBar/ProgressBarSeatUsage";
import ModalSubmitSuperCategory from "../Modal/ModalSubmitSuperCategory";

const GridSwapLibrary = ({ items=[], toggleElementLibrary }) => {
  const [categories, setCategories] = useState([]);
  const [selectElement, setSelectElement] = useState(null);

  useEffect(() => {
    setCategories(items);
  }, [items]);

  // Handle AddSuper
  const [isAddSuperOpen, setIsAddSuperOpen] = useState(false);

  const handleAddSuperCategory = () => {
    setIsAddSuperOpen(false);
  };

  // Handle Add
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <div className="space-y-6">
      {categories.map((category) => (
        <CardCollapseSuper
          key={category.id}
          title={category.name}
          total={category.totalCategories}
          items={category}
        >
          {category.categories.length > 0 ? (
            <div className="space-y-4 p-5">
              {category.categories.map((element) => (
                <CardCollapseElement
                  key={element.name}
                  title={element.name}
                  total={element.totalItems}
                  items={element}
                >
                  <div className="px-3 py-4">
                    {element.elements.length > 0 ? (
                      <div className="grid grid-cols-9 gap-3">
                        {element.elements.map((item) => {
                          const isSelected = item.isSelected
                          return(
                          <div 
                            key={item.id}
                            className={`flex-1 px-1 py-2 bg-white rounded-lg flex flex-col justify-center items-center gap-1 hover:bg-gray-50 cursor-pointer ${isSelected 
                                ? 'outline outline-1 outline-offset-[-1px] outline-[#2C6499]' 
                                : 'hover:bg-slate-50'
                              }`}
                            draggable={true}
                            onClick={() => toggleElementLibrary(category, element, item)}
                          >
                            <div className="w-11 h-11 rounded-full overflow-hidden bg-[yellow]">
                              <img 
                                src={item.url}
                                alt={item.name}
                                className={`w-full h-full object-cover`}
                              />
                            </div>
                            <div className="text-center text-gray-800 text-xs font-normal tracking-tight">
                              {item.name}
                            </div>
                          </div>
                        )}
                    )}
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
            </div>
          ) : (
            <CardEmptyElement
              title=" Your list is empty"
              description="Add your first super category to get started."
              label="Add Super Category"
              onClick={setIsAddSuperOpen}
            />
          )}
        </CardCollapseSuper>
      ))}
      {categories.length === 0 && (
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
    </div>
  );
};

export default GridSwapLibrary;
