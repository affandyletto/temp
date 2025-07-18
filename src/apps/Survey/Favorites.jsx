import React, { useState } from 'react';
import { Star, ChevronDown, ChevronRight } from 'lucide-react';

export const Favorites= () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const favoriteElements = [
    { id: 'E01', name: 'Element 01', hasInitials: true },
    { id: 'E02', name: 'Element 02', hasInitials: false },
    { id: 'E03', name: 'Element 03', hasInitials: false },
    { id: 'E04', name: 'Element 04', hasInitials: false },
    { id: 'E05', name: 'Element 05', hasInitials: true },
    { id: 'E06', name: 'Element 06', hasInitials: true }
  ];

  const ElementItem = ({ element }) => (
    <div className="flex-1 px-1 py-2 bg-white rounded-lg flex flex-col justify-center items-center gap-1 hover:bg-gray-50 hover:scale-105 cursor-pointer transition-all duration-200 ease-in-out">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
        element.hasInitials 
          ? 'bg-blue-50 text-cyan-700 text-xs font-semibold hover:bg-blue-100 hover:shadow-md' 
          : 'bg-slate-200 hover:bg-slate-300'
      }`}>
        {element.hasInitials && element.id}
      </div>
      <div className="text-center text-gray-800 text-xs font-normal tracking-tight">
        {element.name}
      </div>
    </div>
  );

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
                <ElementItem element={element} />
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
                <ElementItem element={element} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};