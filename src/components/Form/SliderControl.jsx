import React from 'react';
import { Minus, Plus } from 'lucide-react';

export const SliderControl = ({ label, value, setValue, max = 100, unit = '', onChange }) => {
  const handleSliderChange = (newValue) => {
    const clampedValue = Math.max(0, Math.min(max, newValue));
    
    // If setValue is provided, use it (for internal state management)
    if (setValue) {
      setValue(clampedValue);
    }
    
    // If onChange is provided, call it (for parent component state management)
    if (onChange) {
      onChange({ target: { value: clampedValue.toString() } });
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-800">{label}</span>
        <span className="text-xs text-gray-800">{value}{unit}</span>
      </div>
      <div className="flex items-center gap-2">
        <button 
          onClick={() => handleSliderChange(parseFloat(value) - 1)}
          className="w-4 h-4 flex items-center justify-center hover:bg-slate-100 rounded"
        >
          <Minus className="w-3 h-3 text-zinc-500" />
        </button>
        <div 
          className="flex-1 h-1.5 bg-slate-200 rounded-full relative cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = Math.max(0, Math.min(1, x / rect.width));
            handleSliderChange(Math.round(percentage * max));
          }}
        >
          <div
            className="h-full bg-blue-500 rounded-full"
            style={{ width: `${(parseFloat(value) / max) * 100}%` }}
          />
          <div
            className="absolute top-1/2 w-3 h-3 bg-blue-500 rounded-full transform -translate-y-1/2 -translate-x-1/2 cursor-pointer"
            style={{ left: `${(parseFloat(value) / max) * 100}%` }}
            onMouseDown={(e) => {
              const startX = e.clientX;
              const startValue = parseFloat(value);
              const rect = e.currentTarget.parentElement.getBoundingClientRect();
              
              const handleMouseMove = (e) => {
                const deltaX = e.clientX - startX;
                const deltaPercentage = deltaX / rect.width;
                const newValue = Math.max(0, Math.min(max, startValue + (deltaPercentage * max)));
                handleSliderChange(Math.round(newValue));
              };
              
              const handleMouseUp = () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
              };
              
              document.addEventListener('mousemove', handleMouseMove);
              document.addEventListener('mouseup', handleMouseUp);
            }}
          />
        </div>
        <button 
          onClick={() => handleSliderChange(parseFloat(value) + 1)}
          className="w-4 h-4 flex items-center justify-center hover:bg-slate-100 rounded"
        >
          <Plus className="w-3 h-3 text-zinc-500" />
        </button>
      </div>
    </div>
  );
};