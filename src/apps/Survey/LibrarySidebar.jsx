import React, { useState } from 'react';
import { Star, ChevronRight, ChevronDown } from 'lucide-react';
import { Topnav } from "@/apps/Survey/Topnav";
import ToggleSurveyTabs from "@/components/Toggle/ToggleSurveyTabs";
import { Favorites } from "@/apps/Survey/Favorites"

export const LibrarySidebar = () => {
  const [activeTab, setActiveTab] = useState('universal');
  const [expandedCategory, setExpandedCategory] = useState('Category-01');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const categories = [
    'Category-01', 'Category-02', 'Category-03', 'Category-04', 'Category-05',
    'Category-06', 'Category-07', 'Category-08', 'Category-09', 'Category-10',
    'Category-11', 'Category-12', 'Category-13', 'Category-14', 'Category-15',
    'Category-16'
  ];

  const elements = [
    { id: 'E01', name: 'Element 01', hasInitials: true },
    { id: 'E02', name: 'Element 02', hasInitials: false },
    { id: 'E03', name: 'Element 03', hasInitials: false },
    { id: 'E04', name: 'Element 04', hasInitials: false },
    { id: 'E05', name: 'Element 05', hasInitials: true },
    { id: 'E06', name: 'Element 06', hasInitials: true }
  ];

  const ElementItem = ({ element }) => (
    <div className="flex-1 px-1 py-2 bg-white rounded-lg flex flex-col justify-center items-center gap-1 hover:bg-gray-50 cursor-pointer">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
        element.hasInitials 
          ? 'bg-blue-50 text-cyan-700 text-xs font-semibold' 
          : 'bg-slate-200'
      }`}>
        {element.hasInitials && element.id}
      </div>
      <div className="text-center text-gray-800 text-xs font-normal tracking-tight">
        {element.name}
      </div>
    </div>
  );

  const CategoryItem = ({ category, isExpanded, onToggle }) => (
    <div className="bg-white border-b border-slate-200">
      <div 
        className="p-3 flex justify-between items-center cursor-pointer hover:bg-gray-50"
        onClick={() => onToggle(category)}
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-zinc-300 rounded-md"></div>
          <div className="text-gray-800 text-xs font-normal tracking-tight">
            {category}
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
            {elements.slice(0, 3).map((element) => (
              <ElementItem key={element.id} element={element} />
            ))}
          </div>
          <div className="flex justify-start items-start gap-2">
            {elements.slice(3, 6).map((element) => (
              <ElementItem key={element.id} element={element} />
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`${isCollapsed ? 'w-0' : 'w-72'} bg-white border-r border-slate-200 flex flex-col transition-all duration-300 ease-in-out overflow-hidden`}>
        {/* Header */}
        <div className="p-3 flex justify-between items-center">
        <div className="w-[268px]">
          <Favorites />
        </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-3 mb-4 flex justify-center">
          <div className="w-[258px]">
            <ToggleSurveyTabs
              tabs={["Universal Elements", "My Library"]}
              value={activeTab}
              onChange={setActiveTab}
            />
          </div>
        </div>

        {/* Categories List */}
        <div className="flex-1 px-3 overflow-hidden">
          <div className="h-full border border-slate-200 rounded-tl-lg rounded-tr-lg overflow-hidden">
            <div className="h-full bg-white flex flex-col overflow-y-auto">
              {categories.map((category) => (
                <CategoryItem
                  key={category}
                  category={category}
                  isExpanded={expandedCategory === category}
                  onToggle={(cat) => setExpandedCategory(
                    expandedCategory === cat ? null : cat
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Collapse Handle */}
        <div className={`absolute ${isCollapsed ? 'left-0' : 'left-72'} top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out`}>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-6 h-24 bg-white rounded-r-3xl border-r border-t border-b border-slate-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className={`w-4 h-4 text-zinc-500 transition-transform duration-300 ${isCollapsed ? 'rotate-0' : 'rotate-180'}`} />
          </button>
        </div>
      </div>      
    </div>
  );
};