import React, { useState, useEffect } from 'react';
import { Camera, Plus, Trash2, ChevronDown } from 'lucide-react';
import { useMap } from '@/context/MapContext';
import { useLine } from '@/context/LineContext';

export const ElementPath = () => {
  const [selectedColor, setSelectedColor] = useState('bg-amber-500');
  
  const {
    selectedElement
  } = useMap();

  const {
    createLine,
    addSection,
    selectedLine,
    setSelectedLine,
    deleteLine,
    elementLines,
    updateLineColor
  } = useLine();

  // Convert Tailwind color classes to hex values
  const getColorValue = (colorClass) => {
    const colorMap = {
      'bg-amber-500': '#f59e0b',
      'bg-red-600': '#dc2626',
      'bg-yellow-400': '#facc15',
      'bg-lime-500': '#84cc16',
      'bg-green-500': '#22c55e',
      'bg-teal-400': '#2dd4bf',
      'bg-sky-500': '#0ea5e9',
      'bg-blue-700': '#1d4ed8',
      'bg-purple-700': '#7c3aed',
      'bg-fuchsia-600': '#c026d3',
      'bg-zinc-300': '#d4d4d8',
      'bg-neutral-700': '#404040'
    };
    return colorMap[colorClass] || '#f59e0b';
  };

  // Convert hex values back to Tailwind classes
  const getColorClass = (hexValue) => {
    const colorMap = {
      '#f59e0b': 'bg-amber-500',
      '#dc2626': 'bg-red-600',
      '#facc15': 'bg-yellow-400',
      '#84cc16': 'bg-lime-500',
      '#22c55e': 'bg-green-500',
      '#2dd4bf': 'bg-teal-400',
      '#0ea5e9': 'bg-sky-500',
      '#1d4ed8': 'bg-blue-700',
      '#7c3aed': 'bg-purple-700',
      '#c026d3': 'bg-fuchsia-600',
      '#d4d4d8': 'bg-zinc-300',
      '#404040': 'bg-neutral-700'
    };
    return colorMap[hexValue] || 'bg-amber-500';
  };

  const colors = [
    'bg-amber-500',
    'bg-red-600',
    'bg-yellow-400',
    'bg-lime-500',
    'bg-green-500',
    'bg-teal-400',
    'bg-sky-500',
    'bg-blue-700',
    'bg-purple-700',
    'bg-fuchsia-600',
    'bg-zinc-300',
    'bg-neutral-700'
  ];

  // Update selectedColor when selectedLine changes
  useEffect(() => {
    if (selectedLine && selectedLine.color) {
      const colorClass = getColorClass(selectedLine.color);
      setSelectedColor(colorClass);
    }
  }, [selectedLine]);

  const handleCreateLine = () => {
    const colorValue = getColorValue(selectedColor);
    createLine(colorValue);
  };

  const handleDeleteLine = () => {
    if (selectedLine) {
      deleteLine(selectedLine.id);
    }
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    
    // If there's a selected line, update its color immediately
    if (selectedLine) {
      const colorValue = getColorValue(color);
      updateLineColor(selectedLine.id, colorValue);
    }
  };

  // Get current path number (count of lines for this specific element)
  const pathNumber = elementLines ? elementLines.length + 1 : 1;

  return (
    <div className="flex flex-col gap-4 max-w-md">

      {/* Path Label Input */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-800 text-sm font-normal">Path Label</label>
        <input 
          type="text" 
          placeholder="Path label"
          className="min-h-11 p-3 bg-slate-100 rounded-lg text-sm text-zinc-500 border-0 outline-none"
        />
      </div>

      {/* Path Section */}
      <div className="flex flex-col gap-4">
        <h3 className="text-gray-800 text-base font-semibold">Path</h3>
        
        <div className="flex flex-col gap-3">
          {/* Path Number */}
          <div className="flex flex-col gap-1">
            <div className="text-zinc-500 text-xs">Path #</div>
            <div className="text-gray-800 text-xs font-semibold">{pathNumber}</div>
          </div>

          {/* Color Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-black text-sm">Select Color</label>
            <div className="flex flex-wrap gap-1">
              {colors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => handleColorChange(color)}
                  className={`p-2 bg-white rounded-full flex items-center ${
                    selectedColor === color 
                      ? 'outline outline-1 outline-gray-300' 
                      : 'hover:outline hover:outline-1 hover:outline-gray-200'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full ${color}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Total Length and Unit */}
          <div className="flex gap-2">
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-gray-800 text-sm">
                {selectedLine ? 'Line Length' : 'Total Length'}
              </label>
              <div className="min-h-11 p-3 bg-slate-200 rounded-lg flex items-center">
                <span className="text-zinc-500 text-sm">
                  {selectedLine 
                    ? selectedLine.totalLength?.toFixed(2) 
                    : elementLines 
                      ? elementLines.reduce((total, line) => total + (line.totalLength || 0), 0).toFixed(2)
                      : '0.00'
                  }
                </span>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-gray-800 text-sm">Unit</label>
              <div className="min-h-11 p-3 bg-slate-200 rounded-lg flex items-center justify-between">
                <span className="text-zinc-500 text-sm">Feet</span>
                <ChevronDown className="w-4 h-4 text-zinc-500" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            {!selectedLine ? (
              <button 
                onClick={handleCreateLine} 
                className="flex-1 px-4 py-2 bg-white rounded-lg border border-slate-200 flex items-center justify-center gap-2 hover:bg-slate-50"
              >
                <Plus className="w-4 h-4 text-green-700" />
                <span className="text-green-700 text-xs font-semibold">Add Line</span>
              </button>
            ) : (
              <button 
                onClick={addSection} 
                className="flex-1 px-4 py-2 bg-white rounded-lg border border-slate-200 flex items-center justify-center gap-2 hover:bg-slate-50"
              >
                <Plus className="w-4 h-4 text-blue-700" />
                <span className="text-blue-700 text-xs font-semibold">Add Section</span>
              </button>
            )}
            <button 
              onClick={handleDeleteLine}
              disabled={!selectedLine}
              className={`flex-1 px-4 py-2 bg-white rounded-lg border border-slate-200 flex items-center justify-center gap-2 hover:bg-slate-50 ${
                !selectedLine ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Trash2 className="w-4 h-4 text-red-700" />
              <span className="text-red-700 text-xs font-semibold">Delete Line</span>
            </button>
          </div>
        </div>

        {/* Lines List - Show all lines for this element */}
        {elementLines && elementLines.length > 0 && !selectedLine&& (
          <div className="flex flex-col gap-3">
            <h4 className="text-gray-800 text-sm font-semibold">Lines for this element:</h4>
            <div className="flex flex-col gap-2">
              {elementLines.map((line, index) => (
                <div 
                  key={line.id} 
                  className={`p-2 rounded border cursor-pointer transition-colors ${
                    selectedLine?.id === line.id 
                      ? 'border-blue-300 bg-blue-50' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                  onClick={() => setSelectedLine(line)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full border border-white shadow-sm"
                        style={{ backgroundColor: line.color }}
                      />
                      <span className="text-sm text-gray-700">Line #{index + 1}</span>
                    </div>
                    <span className="text-xs text-zinc-500">
                      {line.sections?.length || 0} section{line.sections?.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">
                    Length: {line.totalLength?.toFixed(2) || '0.00'} ft
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        <hr className="border-slate-200" />

        {/* Sections List */}
        {/*{selectedLine && selectedLine.sections && (
          <div className="flex flex-col gap-3">
            {selectedLine.sections.map((section, index) => (
              <div key={section.id} className="flex flex-col gap-3">
                <h4 className="text-gray-800 text-sm font-semibold">Section #{index + 1}</h4>
                <div className="flex flex-col gap-1">
                  <label className="text-gray-800 text-sm">Line Length</label>
                  <input 
                    type="text" 
                    value={section.length?.toFixed(2) || '0.00'}
                    readOnly
                    className="min-h-11 p-3 bg-slate-100 rounded-lg text-sm text-zinc-500 border-0 outline-none"
                  />
                </div>
                {index < selectedLine.sections.length - 1 && (
                  <hr className="border-slate-200" />
                )}
              </div>
            ))}
          </div>
        )}*/}
      </div>
    </div>
  );
};