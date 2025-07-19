import React, { useState } from 'react';
import { Search, Camera, ChevronRight } from 'lucide-react';

export const ElementListSidebar = ({setSelectedElement, isCollapsed}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const elements = [
    { id: 1, name: 'Camera-01', type: 'Element-01' },
    { id: 2, name: 'Camera-02', type: 'Element-01' },
    { id: 3, name: 'Camera-03', type: 'Element-01' },
    { id: 4, name: 'Camera-04', type: 'Element-01' },
    { id: 5, name: 'Camera-05', type: 'Element-01' },
    { id: 6, name: 'Camera-06', type: 'Element-01' },
    { id: 7, name: 'Camera-07', type: 'Element-01' },
    { id: 8, name: 'Camera-08', type: 'Element-01' },
    { id: 9, name: 'Camera-09', type: 'Element-01' },
    { id: 10, name: 'Camera-10', type: 'Element-01' },
    { id: 11, name: 'Camera-11', type: 'Element-01' },
    { id: 12, name: 'Camera-12', type: 'Element-01' },
    { id: 13, name: 'Camera-13', type: 'Element-01' },
    { id: 14, name: 'Camera-14', type: 'Element-01' },
    { id: 15, name: 'Camera-15', type: 'Element-01' },
    { id: 16, name: 'Camera-16', type: 'Element-01' },
    { id: 17, name: 'Camera-17', type: 'Element-01' },
  ];

  const filteredElements = elements.filter(element =>
    element.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  

  return (
    <>
      {/* Sidebar */}
      
        <div className="px-3 pt-4 flex flex-col gap-4 h-full">
          {/* Header */}
          <div className="pb-3 border-b border-slate-200 flex-shrink-0">
            <h2 className="text-gray-800 text-base font-bold font-inter leading-normal tracking-tight">
              Element List
            </h2>
          </div>

          {/* Search Input */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Search className="w-5 h-5 text-zinc-500" />
              </div>
              <input
                type="text"
                placeholder="Search element"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-slate-200 text-sm font-normal font-inter leading-snug tracking-tight text-gray-800 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Element List */}
          <div className="flex-1 overflow-y-auto">
            {filteredElements.length === 0 ? (
              <div className="px-4 py-12 flex flex-col justify-start items-start gap-4">
                <div className="text-center text-gray-800 text-md font-semibold font-inter leading-tight tracking-tight">The element you are looking for was not found</div>
                <div className="text-center text-zinc-500 text-xs font-normal font-inter leading-none tracking-tight">Try checking the spelling of the element name or using other keywords.</div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {filteredElements.map((element) => (
                  <div
                    key={element.id}
                    className="pb-2 bg-white border-b border-slate-200 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={()=>setSelectedElement(element)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex-1 flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                          <Camera className="w-4 h-4 text-gray-600" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="text-gray-800 text-sm font-normal font-inter leading-snug tracking-tight">
                            {element.name}
                          </div>
                          <div className="text-zinc-500 text-[10px] font-normal font-inter leading-none tracking-tight">
                            {element.type}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-zinc-500" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
    </>
  );
};

export default ElementListSidebar;