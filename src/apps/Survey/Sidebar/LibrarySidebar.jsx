import React, { useState, useEffect } from 'react';
import { Star, ChevronRight, ChevronDown } from 'lucide-react';
import { Topnav } from "@/apps/Survey/Topnav";
import ToggleSurveyTabs from "@/components/Toggle/ToggleSurveyTabs";
import { Favorites } from "@/apps/Survey/Favorites"
import { generateDummyData, generateDummyData2 } from "@/data/elementManager"
import { ElementItem } from "@/components/ElementItem"

export const LibrarySidebar = ({ onDragStart }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedCategory, setExpandedCategory] = useState('Category-01');
  const [expandedSuperCategory, setExpandedSuperCategory] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [categories, setCategories] = useState([]);
  const [superCategories, setSuperCategories] = useState([]);

  useEffect(() => {
    var zzz = generateDummyData();
    var xxx = generateDummyData2();
    setCategories(zzz);
    setSuperCategories(xxx);
  }, []);

  const CategoryItem = ({ category, isExpanded, onToggle, isNested = false }) => {
    if (isNested) {
      // Nested category within super category
      return (
        <div className="bg-white rounded-lg border border-slate-200 flex flex-col justify-start items-start overflow-hidden">
          <div 
            className="w-full p-3 bg-white border-b border-slate-200 flex justify-start items-center gap-2 cursor-pointer hover:bg-gray-50"
            onClick={() => onToggle(category.name)}
          >
            <div className="w-6 h-6 bg-zinc-300 rounded-md"></div>
            <div className="flex-1 text-gray-800 text-xs font-normal leading-tight tracking-tight">
              {category.name}
            </div>
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-zinc-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-zinc-500" />
            )}
          </div>
          
          {isExpanded && (
            <div className="w-full p-2 bg-white flex flex-col justify-start items-start gap-2">
              <div className="w-full flex justify-start items-start gap-2">
                {category.elements.slice(0, 3).map((element, index) => (
                  <ElementItem key={element.id} element={element} index={index} />
                ))}
              </div>
              {category.elements.length > 3 && (
                <div className="w-full flex justify-start items-start gap-2">
                  {category.elements.slice(3, 6).map((element, index) => (
                    <ElementItem key={element.id} element={element} index={index + 3} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    // Regular category for Universal Elements tab
    return (
      <div className="bg-white border-b border-slate-200">
        <div 
          className="p-3 flex justify-between items-center cursor-pointer hover:bg-gray-50"
          onClick={() => onToggle(category.name)}
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-zinc-300 rounded-md"></div>
            <div className="text-gray-800 text-xs font-normal tracking-tight">
              {category.name}
            </div>
          </div>
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-zinc-500" />
          ) : (
            <ChevronRight className="w-4 h-4 text-zinc-500" />
          )}
        </div>
        
        {isExpanded && (
          <div className="p-2 bg-white flex flex-col gap-2">
            <div className="flex justify-start items-start gap-2">
              {category.elements.slice(0, 3).map((element, index) => (
                <ElementItem key={element.id} element={element} index={index} />
              ))}
            </div>
            {category.elements.length > 3 && (
              <div className="flex justify-start items-start gap-2">
                {category.elements.slice(3, 6).map((element, index) => (
                  <ElementItem key={element.id} element={element} index={index + 3} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const SuperCategoryItem = ({ superCategory, isExpanded, onToggle }) => (
    <div className="bg-white border-b border-slate-200 flex flex-col justify-start items-start overflow-hidden">
      <div 
        className="w-full p-3 bg-white border-b border-slate-200 flex justify-start items-center gap-2 cursor-pointer hover:bg-gray-50"
        onClick={() => onToggle(superCategory.name)}
      >
        <div className="w-6 h-6 bg-zinc-300 rounded-md"></div>
        <div className="flex-1 text-gray-800 text-xs font-semibold leading-tight tracking-tight">
          {superCategory.name}
        </div>
        {isExpanded ? (
          <ChevronDown className="w-4 h-4 text-zinc-500" />
        ) : (
          <ChevronRight className="w-4 h-4 text-zinc-500" />
        )}
      </div>
      
      {isExpanded && (
        <div className="w-full p-3 bg-white flex flex-col justify-start items-start gap-2">
          {superCategory.categories.map((category) => (
            <CategoryItem
              key={category.name}
              category={category}
              isExpanded={expandedCategory === category.name}
              onToggle={(cat) => setExpandedCategory(
                expandedCategory === cat ? null : cat
              )}
              isNested={true}
            />
          ))}
        </div>
      )}
    </div>
  );

  const renderTabContent = () => {
    if (activeTab === 0) {
      // Universal Elements - show categories directly
      return (
        <div className="bg-white">
          {categories.map((category) => (
            <CategoryItem
              key={category.name}
              category={category}
              isExpanded={expandedCategory === category.name}
              onToggle={(cat) => setExpandedCategory(
                expandedCategory === cat ? null : cat
              )}
            />
          ))}
        </div>
      );
    } else {
      // My Library - show super categories with nested categories
      return (
        <div className="bg-white">
          {superCategories.map((superCategory) => (
            <SuperCategoryItem
              key={superCategory.name}
              superCategory={superCategory}
              isExpanded={expandedSuperCategory === superCategory.name}
              onToggle={(superCat) => setExpandedSuperCategory(
                expandedSuperCategory === superCat ? null : superCat
              )}
            />
          ))}
        </div>
      );
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-3 flex justify-between items-center flex-shrink-0">
        <div className="w-[268px]">
          <Favorites />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="px-3 mb-4 flex justify-center flex-shrink-0">
        <div className="w-[258px]">
          <ToggleSurveyTabs
            tabs={["Universal Elements", "My Library"]}
            value={activeTab}
            onChange={setActiveTab}
          />
        </div>
      </div>

      {/* Categories List */}
      <div className="flex-1 px-3 overflow-hidden min-h-0">
        <div className="h-full border border-slate-200 rounded-tl-lg rounded-tr-lg overflow-y-auto">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};