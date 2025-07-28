import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronDown, Plus, Minus, X } from 'lucide-react';
import { SliderControl } from "@/components/Form/SliderControl"
import { useUrlParams } from "@/hooks/useUrlParams";
import { useMap } from '@/context/MapContext';

export const Design = ({onClose}) => {
  const {
      selectedElement,
      updateElementInState   
    } = useMap();
  const { toggleParameter, getParam } = useUrlParams();
  const [isVisible, setIsVisible] = useState(false);
  
  const designInfo = selectedElement?.info?.design;
  const [formData, setFormData] = useState({
    order: designInfo?.order || '21',
    elementDegree: designInfo?.elementDegree || 0,
    category: designInfo?.category || 'N/A',
    descriptiveLocation: designInfo?.descriptiveLocation || '',
    elementHeight: designInfo?.elementHeight || '0',
    mountingSurface: designInfo?.mountingSurface || 'Exterior Wall',
    budgetLaborCost: designInfo?.budgetLaborCost || '0'
  });

  const [showMountingDropdown, setShowMountingDropdown] = useState(false);
  
  // Debounce timer ref
  const debounceTimerRef = useRef(null);
  const DEBOUNCE_DELAY = 500; // 500ms delay

  // Update formData when selectedElement changes
  useEffect(() => {
    const newDesignInfo = selectedElement?.info?.design;
    setFormData({
      order: newDesignInfo?.order || '21',
      elementDegree: newDesignInfo?.elementDegree || 0,
      category: newDesignInfo?.category || 'N/A',
      descriptiveLocation: newDesignInfo?.descriptiveLocation || '',
      elementHeight: newDesignInfo?.elementHeight || '0',
      mountingSurface: newDesignInfo?.mountingSurface || 'Exterior Wall',
      budgetLaborCost: newDesignInfo?.budgetLaborCost || '0'
    });
    
    // Clear any pending debounced updates when switching elements
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
  }, [selectedElement]);

  // Animation effect - component appears on mount
  useEffect(() => {
    // Small delay to trigger CSS animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  // Debounced update function
  const debouncedUpdate = useCallback((updatedData) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      if (selectedElement?.id) {
        updateElementInState(selectedElement.id, {
          info: {
            ...selectedElement.info,
            design: updatedData
          }
        });
      }
    }, DEBOUNCE_DELAY);
  }, [selectedElement, updateElementInState]);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const categories = [
    'Installed',
    'Proposed', 
    'Pending Replacement',
    'Pending Upgrade',
    'Pending Removal',
    'N/A'
  ];

  const mountingSurfaces = [
    'Exterior Wall',
    'Interior Wall',
    'Ceiling',
    'Floor',
    'Roof'
  ];

  const handleInputChange = (field, value) => {
    const updatedFormData = {
      ...formData,
      [field]: value
    };
    
    setFormData(updatedFormData);
    
    // Trigger debounced update
    debouncedUpdate(updatedFormData);
  };

  const handleCategorySelect = (category) => {
    const updatedFormData = {
      ...formData,
      category: category
    };
    
    setFormData(updatedFormData);
    
    // Trigger debounced update
    debouncedUpdate(updatedFormData);
  };

  const handleMountingSurfaceSelect = (surface) => {
    const updatedFormData = {
      ...formData,
      mountingSurface: surface
    };
    
    setFormData(updatedFormData);
    setShowMountingDropdown(false);
    
    // Trigger debounced update
    debouncedUpdate(updatedFormData);
  };

  const handleClose = () => {
    // Clear any pending debounced updates before closing
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      // Immediately save current state before closing
      if (selectedElement?.id) {
        updateElementInState(selectedElement.id, {
          info: {
            ...selectedElement.info,
            design: formData
          }
        });
      }
    }
    
    setIsVisible(false);
    // Delay the actual close to allow exit animation
    setTimeout(() => {
      onClose();
    }, 200);
  };

  return (
    <div 
      className={`w-72 p-3 bg-white rounded-xl shadow-[0px_8px_16px_0px_rgba(145,158,171,0.24)] border border-slate-200 flex flex-col gap-4 transition-all duration-200 ease-out ${
        isVisible 
          ? 'opacity-100 translate-x-0 scale-100' 
          : 'opacity-0 translate-x-3 scale-95'
      }`}
      style={{
        transformOrigin: 'right center'
      }}
    >
      {/* Header */}
      <div className="pb-3 border-b border-slate-200 flex justify-between items-center">
        <div className="text-gray-800 text-base font-semibold font-['Inter'] leading-normal tracking-tight">
          Design
        </div>
        <div className="w-5 h-5 text-zinc-500 cursor-pointer hover:text-gray-700 transition-colors" onClick={handleClose}>
          <X size={20} />
        </div>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-3">
        {/* Order Field */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-800 text-sm font-normal font-['Inter'] leading-snug tracking-tight">
            Order
          </label>
          <div className="min-h-11 p-3 bg-slate-100 rounded-lg flex items-center gap-2">
            <input
              type="text"
              value={formData.order}
              onChange={(e) => handleInputChange('order', e.target.value)}
              className="flex-1 bg-transparent text-gray-800 text-sm font-normal font-['Inter'] leading-snug tracking-tight outline-none"
            />
          </div>
        </div>

        {/* Element Degree Control */}
        <div className="flex flex-col gap-2">
          <SliderControl 
            label="Element" 
            value={formData.elementDegree}
            onChange={(e) => handleInputChange('elementDegree', e.target.value)}
            max={100} 
            unit="%" 
          />
        </div>

        {/* Category Radio Buttons */}
        <div className="flex flex-col gap-2">
          <div className="text-gray-800 text-sm font-normal font-['Inter'] leading-snug tracking-tight">
            Category
          </div>
          <div className="py-1 flex flex-wrap gap-2">
            {categories.map((category) => (
              <label
                key={category}
                className="flex items-center gap-1 cursor-pointer hover:opacity-80"
              >
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={formData.category === category}
                  onChange={(e) => handleCategorySelect(e.target.value)}
                  className="w-4 h-4 accent-primary-200"
                />
                <span className="text-gray-800 text-xs font-normal font-['Inter'] leading-tight tracking-tight">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Descriptive Location */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-800 text-sm font-normal font-['Inter'] leading-snug tracking-tight">
            Descriptive Location
          </label>
          <div className="min-h-11 p-3 bg-slate-100 rounded-lg flex items-center">
            <input
              type="text"
              value={formData.descriptiveLocation}
              placeholder="Input description location"
              onChange={(e) => handleInputChange('descriptiveLocation', e.target.value)}
              className="flex-1 bg-transparent text-gray-800 text-sm font-normal font-['Inter'] leading-snug tracking-tight outline-none"
            />
          </div>
        </div>

        {/* Element Height and Mounting Surface */}
        <div className="flex gap-3">
          <div className="w-24 flex flex-col gap-1">
            <label className="text-gray-800 text-sm font-normal font-['Inter'] leading-snug tracking-tight">
              Element Height
            </label>
            <div className="min-h-11 p-3 bg-slate-100 rounded-lg flex items-center">
              <input
                type="number"
                value={formData.elementHeight}
                onChange={(e) => handleInputChange('elementHeight', e.target.value)}
                className="flex-1 bg-transparent text-gray-800 text-sm font-normal font-['Inter'] leading-snug tracking-tight outline-none"
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-1 relative">
            <label className="text-gray-800 text-sm font-normal font-['Inter'] leading-snug tracking-tight">
              Mounting Surface
            </label>
            <button
              onClick={() => setShowMountingDropdown(!showMountingDropdown)}
              className="min-h-11 p-3 bg-slate-100 rounded-lg flex items-center gap-2 hover:bg-slate-150 transition-colors"
            >
              <span className="flex-1 text-left text-gray-800 text-sm font-normal font-['Inter'] leading-snug tracking-tight">
                {formData.mountingSurface}
              </span>
              <ChevronDown size={20} className="text-zinc-500" />
            </button>
            {showMountingDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-10 animate-in fade-in slide-in-from-top-2 duration-150">
                {mountingSurfaces.map((surface) => (
                  <button
                    key={surface}
                    onClick={() => handleMountingSurfaceSelect(surface)}
                    className="w-full p-3 text-left text-sm hover:bg-slate-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                  >
                    {surface}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Budget Labor Cost */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-800 text-sm font-normal font-['Inter'] leading-snug tracking-tight">
            Budget Labor Cost
          </label>
          <div className="min-h-11 p-3 bg-slate-100 rounded-lg flex items-center gap-2">
            <div className="text-gray-800 text-sm font-semibold font-['Inter'] leading-snug tracking-tight">
              $
            </div>
            <input
              type="number"
              value={formData.budgetLaborCost}
              onChange={(e) => handleInputChange('budgetLaborCost', e.target.value)}
              className="flex-1 bg-transparent text-gray-800 text-sm font-normal font-['Inter'] leading-snug tracking-tight outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};