// src/apps/Projects/SiteElements.jsx
import { useEffect, useState, useRef, useMemo } from "react";
import { ChevronDown, Star } from "lucide-react";
import InputSearch from "@/components/Form/InputSearch";
import ToggleTabs from "@/components/Toggle/ToggleTabs";
import SkeletonDefault from "@/components/Skeleton/SkeletonDefault";
import GridSiteElement from "@/components/Grid/GridSiteElement";
import GridSiteElementLibrary from "@/components/Grid/GridSiteElementLibrary";

import {DropdownFavorite} from "@/components/Dropdown/DropdownFavorite";
import {
  mocksSuperCategories,
  mocksUniversalElements,
} from "@/data/elementManager";

const SiteElements = () => {
  const [elements, setElements] = useState([])
  const [supElements, setSupElements] = useState([])
  const [favoriteElements, setFavoriteElements] = useState([])
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(()=>{
    setElements(mocksUniversalElements)
    setSupElements(mocksSuperCategories)
  },[])
  
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  
  // Click outside handler for dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    // Add event listener when dropdown is open
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);
  
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  
  const toggleElement = (element, item) => {
    const newElements = [...elements];
    const elementIndex = newElements.findIndex(x => x.id === element.id);
    const itemIndex = newElements[elementIndex].listItems.findIndex(x => x.id === item.id);
    const currentFavorite = newElements[elementIndex].listItems[itemIndex].isFavorite || false;
    newElements[elementIndex].listItems[itemIndex].isFavorite = !currentFavorite;
    setElements(newElements);
    
    // Update favorites list
    const allFavorites = [];
    newElements.forEach(el => {
      el.listItems?.forEach(listItem => {
        if (listItem.isFavorite) {
          const itemWithParent = {
            ...listItem,
            parentCategory: el.name
          };
          allFavorites.push(itemWithParent);
        }
      });
    });
    setFavoriteElements(allFavorites);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const onRemoveFavorite = (item) => {
    // Make a copy of elements
    const newElements = [...elements];
    
    // Find and update the item
    newElements.forEach(el => {
      el.listItems?.forEach(listItem => {
        if (listItem.id === item.id) {
          listItem.isFavorite = false;
        }
      });
    });
    
    // Save back to state
    setElements(newElements);
    
    // Update favorites list
    const allFavorites = [];
    newElements.forEach(el => {
      el.listItems?.forEach(listItem => {
        if (listItem.isFavorite) {
          allFavorites.push(listItem);
        }
      });
    });
    setFavoriteElements(allFavorites);
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
    const categoryIndex = newSupElements.findIndex(x => x.id === category.id);
    const elementIndex = newSupElements[categoryIndex].listCategories.findIndex(x => x.id === element.id);
    const itemIndex = newSupElements[categoryIndex].listCategories[elementIndex].listItems.findIndex(x => x.id === item.id);
    
    const currentFavorite = newSupElements[categoryIndex].listCategories[elementIndex].listItems[itemIndex].isFavorite || false;
    newSupElements[categoryIndex].listCategories[elementIndex].listItems[itemIndex].isFavorite = !currentFavorite;
    
    setSupElements(newSupElements);
    
    // Update favorites list
    const allFavorites = [...favoriteElements];
    
    if (!currentFavorite) {
      // Add to favorites with parent category info
      const itemWithParent = {
        ...item,
        parentCategory: element.name
      };
      allFavorites.push(itemWithParent);
    } else {
      // Remove from favorites
      const index = allFavorites.findIndex(x => x.id === item.id);
      if (index > -1) {
        allFavorites.splice(index, 1);
      }
    }
    
    setFavoriteElements(allFavorites);
  };

  console.info(favoriteElements)

  return (
    <>
      {isLoading ? (
        <SkeletonDefault />
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Site Elements</h2>
            <div className="flex items-center gap-4">
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={toggleDropdown}
                  className={`flex items-center gap-2 w-full bg-white border rounded-full text-sm py-2 px-4`}
                >
                  <div className="flex items-center gap-1">
                    <img src="/images/action-star-filled.svg" alt="Star" /> 
                    <span>Favorites ({favoriteElements?.length}/20)</span>
                  </div>
                  <ChevronDown
                    className={`size-5 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`}
                  />
                </button>
                
                <div className={`absolute top-full mt-2 right-0 z-50 transition-all duration-300 ${
                  showDropdown 
                    ? 'opacity-100 translate-y-0 pointer-events-auto' 
                    : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}>
                  <DropdownFavorite favoriteElements={favoriteElements} onRemoveFavorite={onRemoveFavorite}/>
                </div>
              </div>
              <div className="w-[300px]">
                <InputSearch
                  placeholder={"Search element"}
                  search={search}
                  setSearch={setSearch}
                />
              </div>
            </div>
          </div>
          <div className="w-[366px]">
            <ToggleTabs
              tabs={["Universal Elements", "My Library"]}
              value={activeTab}
              onChange={setActiveTab}
            />
          </div>
          {activeTab === 0 ? (
            <GridSiteElement isLoading={isLoading} items={paginatedUniversal} toggleElement={toggleElement}/>
          ) : (
            <GridSiteElementLibrary items={paginatedMyLibary} toggleElementLibrary={toggleElementLibrary}/>
          )}
          
        </div>
      )}
    </>
  );
};

export default SiteElements;