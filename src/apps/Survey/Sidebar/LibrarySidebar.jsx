import React, { useState } from 'react';
import { Star, ChevronRight, ChevronDown } from 'lucide-react';
import { Topnav } from "@/apps/Survey/Topnav";
import ToggleSurveyTabs from "@/components/Toggle/ToggleSurveyTabs";
import { Favorites } from "@/apps/Survey/Favorites"

export const LibrarySidebar = ({ onDragStart }) => {
  const [activeTab, setActiveTab] = useState('universal');
  const [expandedCategory, setExpandedCategory] = useState('Category-01');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const categories = [
    'Category-01', 'Category-02', 'Category-03', 'Category-04', 'Category-05',
    'Category-06', 'Category-07', 'Category-08', 'Category-09', 'Category-10',
    'Category-11',
    'Category-12',
    'Category-13',
    'Category-14',
    'Category-15',
    'Category-16',
    'Category-17',
    'Category-18',
    'Category-19',
    'Category-20',
    'Category-21',
    'Category-22',
    'Category-23',
    'Category-24',
    'Category-25',
    'Category-26'
  ];

  const elements = [
    { id: 'E01', name: 'Element 01', hasInitials: true, type: 'marker' },
    { id: 'E02', name: 'Element 02', hasInitials: false, type: 'marker' },
    { id: 'E03', name: 'Element 03', hasInitials: false, type: 'marker' },
    { id: 'E04', name: 'Element 04', hasInitials: false, type: 'marker' },
    { id: 'E05', name: 'Element 05', hasInitials: true, type: 'marker' },
    { id: 'E06', name: 'Element 06', hasInitials: true, type: 'marker' }
  ];

  const handleDragStart = (e, element) => {
    // Set the data to transfer
    const elementData = {
      id: element.id,
      name: element.name,
      type: element.type,
      hasInitials: element.hasInitials
    };
    
    e.dataTransfer.setData('application/json', JSON.stringify(elementData));
    e.dataTransfer.effectAllowed = 'copy';
    
    // Create custom drag image
    const dragImage = document.createElement('div');
    dragImage.style.cssText = `
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      position: absolute;
      top: -1000px;
      left: -1000px;
      background: white;
    `;
    
    const img = document.createElement('img');
    img.src = 'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=40&h=40&fit=crop&crop=center';
    img.alt = element.name;
    img.style.cssText = 'width: 100%; height: 100%; object-fit: cover;';
    
    dragImage.appendChild(img);
    document.body.appendChild(dragImage);
    
    // Set the custom drag image
    e.dataTransfer.setDragImage(dragImage, 20, 20);
    
    // Clean up the temporary element after a short delay
    setTimeout(() => {
      if (document.body.contains(dragImage)) {
        document.body.removeChild(dragImage);
      }
    }, 0);
    
    // Make the original element semi-transparent
    e.currentTarget.style.opacity = '0.5';
    
    // Call the parent's onDragStart if provided
    if (onDragStart) {
      onDragStart(element);
    }
  };

  const handleDragEnd = (e) => {
    // Restore opacity after drag ends
    e.currentTarget.style.opacity = '1';
  };

  const ElementItem = ({ element }) => (
    <div 
      className="flex-1 px-1 py-2 bg-white rounded-lg flex flex-col justify-center items-center gap-1 hover:bg-gray-50 cursor-grab active:cursor-grabbing"
      draggable={true}
      onDragStart={(e) => handleDragStart(e, element)}
    >
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=40&h=40&fit=crop&crop=center"
          alt={element.name}
          className="w-full h-full object-cover"
        />
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
          <div className="bg-white">
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
    </div>
  );
};