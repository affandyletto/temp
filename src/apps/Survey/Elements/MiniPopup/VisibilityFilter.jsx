// Updated VisibilityFilter.js - Key changes:

import { useState, useEffect } from 'react';
import { X, ChevronDown, Settings, Eye, EyeOff } from 'lucide-react';
import InputSearch from "@/components/Form/InputSearch";
import { useMap } from '@/context/MapContext';

export const VisibilityFilter = ({onClose}) => {
  const [activeTab, setActiveTab] = useState('edit');
  const [searchQuery, setSearchQuery] = useState('');
  const [hideNumber, setHideNumber] = useState(true);
  const [hideNotifications, setHideNotifications] = useState(false);
  const [hidePath, setHidePath] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const {
    placedElements,
    filteredElements,
    hiddenElements,
    updateHiddenElements
  } = useMap();

  const [uniqueElements, setUniqueElements] = useState([])

  useEffect(()=>{
    // Get unique elements by name
    const uniqueByName = placedElements.reduce((acc, element) => {
      if (!acc.find(item => item.name === element.name)) {
        acc.push(element);
      }
      return acc;
    }, []);
    setUniqueElements(uniqueByName);
  },[placedElements])

  // Animation effect for opening
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };

  const toggleElementVisibility = (elementName) => {
    const newSet = new Set(hiddenElements);
    if (newSet.has(elementName)) {
      newSet.delete(elementName);
    } else {
      newSet.add(elementName);
    }
    updateHiddenElements(newSet);
  };

  const resetFilter = () => {
    updateHiddenElements(new Set());
  };

  const Toggle = ({ active, onChange, label }) => (
    <div className="inline-flex justify-start items-center gap-2">
      <button
        onClick={() => onChange(!active)}
        className={`w-8 h-4 p-0.5 rounded-full flex items-center transition-colors ${
          active ? 'bg-primary-200 justify-end' : 'bg-slate-200 justify-start'
        }`}
      >
        <div className="w-3 h-3 bg-white rounded-full shadow" />
      </button>
      <div className="text-gray-800 text-xs font-semibold leading-tight tracking-tight">
        {label}
      </div>
    </div>
  );

  return (
    <div className={`w-72 p-3 bg-white rounded-xl shadow-lg border border-slate-200 flex flex-col gap-4 transition-all duration-300 ease-out transform ${
      isVisible && !isClosing
        ? 'opacity-100 scale-100 translate-y-0' 
        : 'opacity-0 scale-95 translate-y-2'
    }`}>
      {/* Header */}
      <div className="pb-3 border-b border-slate-200 flex justify-between items-center">
        <div className="text-gray-800 text-base font-semibold">Visibility Filter</div>
        <X className="w-5 h-5 text-zinc-500 cursor-pointer hover:text-gray-700" onClick={handleClose} />
      </div>

      {/* Mode Toggle */}
      <div className="p-1 bg-slate-100 rounded-xl flex gap-0.5">
        <button
          onClick={() => setActiveTab('view')}
          className={`flex-1 p-1 rounded-lg text-xs font-normal leading-tight tracking-tight transition-colors ${
            activeTab === 'view'
              ? 'bg-white shadow-lg text-gray-800'
              : 'text-zinc-500'
          }`}
        >
          View Mode
        </button>
        <button
          onClick={() => setActiveTab('edit')}
          className={`flex-1 p-1 rounded-lg text-xs font-normal leading-tight tracking-tight transition-colors ${
            activeTab === 'edit'
              ? 'bg-white shadow-lg text-gray-800'
              : 'text-zinc-500'
          }`}
        >
          Edit Mode
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {/* Hide Element Section */}
        <div className="flex flex-col gap-2">
          <div className="text-gray-800 text-sm font-normal leading-snug tracking-tight">
            Hide Element
          </div>
          <div className="max-h-[230px] overflow-y-auto overflow-x-hidden">
            <div className="grid grid-cols-3 gap-2">
              {uniqueElements.map((element) => {
                const isHidden = hiddenElements.has(element.name);
                const elementCount = placedElements.filter(el => el.name === element.name).length;
                return (
                  <div 
                    key={element.name}
                    className="relative flex-1 px-1 py-2 bg-white rounded-lg flex flex-col justify-center items-center gap-1 hover:bg-gray-50 cursor-pointer"
                    onClick={() => toggleElementVisibility(element.name)}        
                  >
                    <div className="w-10 h-10 relative rounded-full overflow-hidden">
                      {element.url ? (
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
                      {element.name} ({elementCount})
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full border border-slate-200 flex items-center justify-center pointer-events-none">
                      {isHidden ? (
                        <EyeOff className="w-3 h-3 text-red-500" />
                      ) : (
                        <Eye className="w-3 h-3 text-gray-600" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Search */}
        <InputSearch
          placeholder="Search by label"
          search={searchQuery}
          setSearch={setSearchQuery}
        />

        {/* Filter Dropdowns */}
        <div className="flex flex-col gap-1">
          <div className="text-gray-800 text-sm font-normal leading-snug tracking-tight">
            Filter Category
          </div>
          <div className="min-h-11 p-3 bg-slate-100 rounded-lg flex justify-center items-center gap-2 cursor-pointer hover:bg-slate-200 transition-colors">
            <div className="flex-1 text-zinc-500 text-sm font-normal leading-snug tracking-tight">
              All Category Filtered
            </div>
            <ChevronDown className="w-5 h-5 text-zinc-500" />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="text-gray-800 text-sm font-normal leading-snug tracking-tight">
            Filter Category
          </div>
          <div className="min-h-11 p-3 bg-slate-100 rounded-lg flex justify-center items-center gap-2 cursor-pointer hover:bg-slate-200 transition-colors">
            <div className="flex-1 text-zinc-500 text-sm font-normal leading-snug tracking-tight">
              All Category Filtered
            </div>
            <ChevronDown className="w-5 h-5 text-zinc-500" />
          </div>
        </div>

        <div className="h-px bg-slate-200" />

        {/* Stats */}
        <div className="flex flex-col gap-1">
          <div className="text-gray-800 text-sm font-normal leading-snug tracking-tight">
            {uniqueElements.length} Element Types
          </div>
          <div className="text-gray-800 text-sm font-normal leading-snug tracking-tight">
            {hiddenElements.size} Element Types Hidden
          </div>
          <div className="text-gray-800 text-sm font-normal leading-snug tracking-tight">
            {filteredElements.length} Total Elements Visible
          </div>
        </div>

        <div className="h-px bg-slate-200" />

        {/* Toggle Options */}
        <Toggle
          active={hideNumber}
          onChange={setHideNumber}
          label="Hide Number"
        />
        <Toggle
          active={hideNotifications}
          onChange={setHideNotifications}
          label="Hide Notifications"
        />
        <Toggle
          active={hidePath}
          onChange={setHidePath}
          label="Hide Path"
        />

        <div className="h-px bg-slate-200" />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button 
          onClick={resetFilter}
          className="flex-1 px-6 py-3 bg-primary-200 hover:bg-primary-300 rounded-xl flex justify-center items-center transition-colors"
        >
          <div className="text-white text-sm font-semibold leading-snug tracking-tight">
            Reset Filter
          </div>
        </button>
        <button className="p-3 bg-white rounded-xl border border-slate-200 flex justify-center items-center hover:shadow-md transition-shadow">
          <Settings className="w-5 h-5 text-gray-800" />
        </button>
      </div>
    </div>
  );
};