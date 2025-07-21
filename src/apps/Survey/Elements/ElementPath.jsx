import React, { useState } from 'react';
import { Camera, Plus, Trash2, ChevronDown } from 'lucide-react';

export const ElementPath = () => {
  const [selectedColor, setSelectedColor] = useState('bg-amber-500');
  
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
            <div className="text-gray-800 text-xs font-semibold">2</div>
          </div>

          {/* Color Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-black text-sm">Select Color</label>
            <div className="flex flex-wrap gap-1">
              {colors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(color)}
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
              <label className="text-gray-800 text-sm">Total Length</label>
              <div className="min-h-11 p-3 bg-slate-200 rounded-lg flex items-center">
                <span className="text-zinc-500 text-sm">84.08</span>
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
            <button className="flex-1 px-4 py-2 bg-white rounded-lg border border-slate-200 flex items-center justify-center gap-2 hover:bg-slate-50">
              <Plus className="w-4 h-4 text-green-700" />
              <span className="text-green-700 text-xs font-semibold">Add Line</span>
            </button>
            <button className="flex-1 px-4 py-2 bg-white rounded-lg border border-slate-200 flex items-center justify-center gap-2 hover:bg-slate-50">
              <Trash2 className="w-4 h-4 text-red-700" />
              <span className="text-red-700 text-xs font-semibold">Delete Line</span>
            </button>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-slate-200" />

        {/* Section */}
        <div className="flex flex-col gap-3">
          <h4 className="text-gray-800 text-sm font-semibold">Section #1</h4>
          <div className="flex flex-col gap-1">
            <label className="text-gray-800 text-sm">Line Length</label>
            <input 
              type="text" 
              defaultValue="84.08"
              className="min-h-11 p-3 bg-slate-100 rounded-lg text-sm text-zinc-500 border-0 outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};