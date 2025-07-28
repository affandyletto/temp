// src/apps/Projects/SiteElements.jsx
import { useEffect, useState, useRef, useMemo } from "react";
import { ChevronDown, Star } from "lucide-react";
import InputSearch from "@/components/Form/InputSearch";
import ToggleTabs from "@/components/Toggle/ToggleTabs";
import SkeletonDefault from "@/components/Skeleton/SkeletonDefault";
import GridSwapElement from "@/components/Grid/GridSwapElement";
import GridSwapLibrary from "@/components/Grid/GridSwapLibrary";

import {DropdownFavorite} from "@/components/Dropdown/DropdownFavorite";
import {
  mocksSuperCategories,
  mocksUniversalElements,
} from "@/data/elementManager";
import { generateDummyData } from "@/data/elementManager"

export const ElementSwap = ({toggleButton}) => {
  const [elements, setElements] = useState([])
  const [supElements, setSupElements] = useState([])
  const [favoriteElements, setFavoriteElements] = useState([])
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(()=>{
    var datta=generateDummyData()
    console.info(datta)
    setElements(datta)
    setSupElements(mocksSuperCategories)
  },[])
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  
  const toggleElement = (element, item) => {
    const newElements = [...elements];
    
    // First, deselect all items across all elements
    newElements.forEach(el => {
      el.elements.forEach(itm => {
        itm.isSelected = false;
      });
    });
    
    // Find the target element and item
    const elementIndex = newElements.findIndex(x => x.id === element.id);
    const itemIndex = newElements[elementIndex].elements.findIndex(x => x.id === item.id);
    
    // Check if this item was already selected (before we cleared all selections)
    const wasSelected = elements[elementIndex].elements[itemIndex].isSelected || false;
    
    // If it wasn't selected, select it now. If it was selected, leave it deselected
    if (!wasSelected) {
      newElements[elementIndex].elements[itemIndex].isSelected = true;
    }
    
    setElements(newElements);
  };

  const paginatedMyLibary = useMemo(() => {
    return supElements.filter((c) => {
      const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());

      return matchSearch;
    });
  }, [search, supElements]);

  const paginatedUniversal = useMemo(() => {
    return elements.filter((c) => {
      const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());

      return matchSearch;
    });
  }, [search, elements]);

  const toggleElementLibrary = (category, element, item) => {
    const newSupElements = [...supElements];
    
    // First, deselect all items across all categories and elements
    newSupElements.forEach(cat => {
      cat.listCategories.forEach(el => {
        el.listItems.forEach(itm => {
          itm.isSelected = false;
        });
      });
    });
    
    // Find the target category, element, and item
    const categoryIndex = newSupElements.findIndex(x => x.id === category.id);
    const elementIndex = newSupElements[categoryIndex].listCategories.findIndex(x => x.id === element.id);
    const itemIndex = newSupElements[categoryIndex].listCategories[elementIndex].elements.findIndex(x => x.id === item.id);
    
    // Check if this item was already selected (before we cleared all selections)
    const wasSelected = supElements[categoryIndex].listCategories[elementIndex].elements[itemIndex].isSelected || false;
    
    // If it wasn't selected, select it now. If it was selected, leave it deselected
    if (!wasSelected) {
      newSupElements[categoryIndex].listCategories[elementIndex].elements[itemIndex].isSelected = true;
    }
    
    setSupElements(newSupElements);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonDefault />
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="w-[366px]">
	            <ToggleTabs
	              tabs={["Universal Elements", "My Library"]}
	              value={activeTab}
	              onChange={setActiveTab}
	            />
	         </div>
            <div className="flex items-center gap-4">
              <div className="w-[300px]">
                <InputSearch
                  placeholder={"Search element"}
                  search={search}
                  setSearch={setSearch}
                />
              </div>
            </div>
          </div>
          {activeTab === 0 ? (
            <GridSwapElement isSwap={true} isLoading={isLoading} items={paginatedUniversal} toggleElement={toggleElement}/>
          ) : (
            <GridSwapLibrary isSwap={true} items={paginatedMyLibary} toggleElementLibrary={toggleElementLibrary}/>
          )}
          
        </div>
      )}
    </>
  );
};