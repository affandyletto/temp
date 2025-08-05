import { X, Minus, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useMap } from '@/context/MapContext';

export const SurveySettings = ({onClose}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  const {
    selectedSurvey,
    updateSurvey
  } = useMap();
  
  // Just use the survey value directly - no local state!
  const elementSize = selectedSurvey?.elementSize || 30;  // Changed from 'survey' to 'selectedSurvey'
  
  // Animation effect - component appears on mount
  useEffect(() => {
    // Small delay to trigger CSS animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);
  
  const handleSizeChange = (increment) => {
    const newSize = Math.max(1, elementSize + increment);
    // Force immediate re-render by calling redrawAllElements after state update
    updateSurvey({ elementSize: newSize });
    // Use setTimeout to ensure the survey is updated first
    setTimeout(() => {
      if (window.mapContext?.redrawAllElements) {
        window.mapContext.redrawAllElements();
      }
    }, 0);
  };
  
  const handleSizeInput = (value) => {
    if (value === '') return;
    const numValue = parseInt(value);
    if (!isNaN(numValue)) {
      const newSize = Math.max(1, numValue);
      updateSurvey({ elementSize: newSize });
    }
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
        <div className="text-gray-800 text-base font-semibold">Survey Settings</div>
        <X className="w-5 h-5 text-zinc-500 cursor-pointer" onClick={onClose} />
      </div>
      
      {/* Element Size Control */}
      <div className="flex justify-between items-center">
        <div className="text-gray-800 text-sm">Element Size</div>
        <div className="p-1 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
          <button 
            onClick={() => handleSizeChange(-1)}
            className="p-2 bg-white rounded-lg border border-slate-200 hover:bg-gray-50 transition-colors"
          >
            <Minus className="w-4 h-4 text-gray-800" />
          </button>
          <input 
            type="number"
            value={elementSize}
            onChange={(e) => handleSizeInput(e.target.value)}
            className="text-primary-200 text-sm font-medium bg-transparent w-12 text-center outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            min="1"
          />
          <button 
            onClick={() => handleSizeChange(1)}
            className="p-2 bg-white rounded-lg border border-slate-200 hover:bg-gray-50 transition-colors"
          >
            <Plus className="w-4 h-4 text-gray-800" />
          </button>
        </div>
      </div>
      
      {/* Divider */}
      <div className="border-t border-slate-200"></div>
      
      {/* Action Buttons */}
      <div className="flex flex-col gap-2">
        <button className="px-6 py-3 bg-primary-200 rounded-xl text-white text-sm font-semibold hover:bg-primary-300 transition-colors transform hover:scale-[1.02] active:scale-[0.98]">
          Element Data
        </button>
        <button className="px-6 py-3 bg-primary-200 rounded-xl text-white text-sm font-semibold hover:bg-primary-300 transition-colors transform hover:scale-[1.02] active:scale-[0.98]">
          Markups
        </button>
        <button className="px-6 py-3 bg-primary-200 rounded-xl text-white text-sm font-semibold hover:bg-primary-300 transition-colors transform hover:scale-[1.02] active:scale-[0.98]">
          Change Background Picture
        </button>
      </div>
    </div>
  );
};