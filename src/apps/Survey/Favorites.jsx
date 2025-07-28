import React, { useState, useEffect } from 'react';
import { Star, ChevronDown, ChevronRight } from 'lucide-react';
import { generateDummyData3 } from "@/data/elementManager"

export const Favorites= () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [favoriteElements, setFavoriteElements] = useState([])

  useEffect(()=>{
    const temp=generateDummyData3()
    setFavoriteElements(temp)
  },[])

  const handleDragStart = (e, element) => {
    // Set the data to transfer
    const elementData = element
    
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
    img.src = element.url;
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
  };

  const handleDragEnd = (e) => {
    // Restore opacity after drag ends
    e.currentTarget.style.opacity = '1';
  };

  const ElementItem = ({ element, index }) => {
    // Show initials for some elements (like 1st, 5th, 6th elements)
    const showInitials = [0, 4, 5].includes(index);
    const initials = element.name ? element.name.substring(0, 3).toUpperCase() : 'E' + String(index + 1).padStart(2, '0');
    
    return (
      <div 
        className="flex-1 px-1 py-2 bg-white rounded-lg flex flex-col justify-center items-center gap-1 hover:bg-gray-50 cursor-grab active:cursor-grabbing"
        draggable={true}
        onDragStart={(e) => handleDragStart(e, element)}
        onDragEnd={handleDragEnd}
      >
        <div className="w-10 h-10 relative rounded-full overflow-hidden">
          {showInitials ? (
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
              <div className="text-cyan-700 text-[10px] font-semibold leading-none tracking-tight">
                {initials}
              </div>
            </div>
          ) : element.url ? (
            <img 
              src={element.url}
              alt={element.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
          )}
        </div>
        <div className="text-center text-gray-800 text-[10px] font-normal leading-none tracking-tight">
          {element.name}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 flex flex-col overflow-hidden">
      {/* Header */}
      <div 
        className="p-3 bg-white rounded-t-xl border-b border-slate-200 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-slate-50 rounded-md flex items-center justify-center">
            <img src="/images/action-star-filled.svg" alt="Star" /> 
          </div>
          <div className="text-gray-800 text-xs font-normal tracking-tight">
            Favorites
          </div>
        </div>
        {isExpanded ? (
          <ChevronDown className="w-4 h-4 text-zinc-500 transition-transform duration-200" />
        ) : (
          <ChevronRight className="w-4 h-4 text-zinc-500 transition-transform duration-200" />
        )}
      </div>

      {/* Content with Animation */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isExpanded ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="p-3 bg-white flex flex-col gap-2">
          <div className="flex justify-start items-start gap-2">
            {favoriteElements.slice(0, 3).map((element, index) => (
              <div 
                key={element.id}
                className={`transform transition-all duration-300 ease-in-out ${
                  isExpanded 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <ElementItem element={element} index={index} />
              </div>
            ))}
          </div>
          <div className="flex justify-start items-start gap-2">
            {favoriteElements.slice(3, 6).map((element, index) => (
              <div 
                key={element.id}
                className={`transform transition-all duration-300 ease-in-out ${
                  isExpanded 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: `${(index + 3) * 50}ms` }}
              >
                <ElementItem element={element} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};