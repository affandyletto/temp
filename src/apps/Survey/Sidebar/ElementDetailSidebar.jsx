import React, { useState } from 'react';
import { 
  MoreHorizontal, 
  Upload, 
  Image, 
  MessageSquare, 
  CheckSquare, 
  Route,
  RefreshCw,
  Copy,
  Edit,
  Palette,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

export const ElementDetailSidebar=({selectedElement, setSelectedElement})=> {
  const [fov, setFov] = useState(50);
  const [depth, setDepth] = useState(0);
  const [labelForm, setLabelForm] = useState('N/A');
  const [angle, setAngle] = useState(75);
  const [opacity, setOpacity] = useState(50);
  const [fieldColor, setFieldColor] = useState('#D9D9D9');
  const [elementColor, setElementColor] = useState('#3F444D');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: Image, label: 'Photos', count: 2 },
    { icon: MessageSquare, label: 'Comment', count: 3 },
    { icon: CheckSquare, label: 'Task', count: 0 },
    { icon: Route, label: 'Path', count: 10 }
  ];

  if (isCollapsed) {
    return (
      <div className="w-12 h-full bg-white border-l border-slate-200 flex flex-col items-center py-4">
        <button
          onClick={() => setIsCollapsed(false)}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-zinc-500" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-72 h-[1200px] bg-white border-l border-slate-200 flex flex-col">
      {/* Header */}
      <div className="px-3 pt-4 pb-3 border-b border-slate-200 flex items-center justify-between flex-shrink-0">
        <div className="flex-1">
          <h2 className="text-base font-bold text-gray-800">Element-02</h2>
          <p className="text-xs text-zinc-500">ID: 63115</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedElement(null)}
            className="p-1 hover:bg-slate-100 rounded"
          >
            <X className="w-5 h-5 text-zinc-500" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-3 py-3 space-y-3 overflow-hidden">
        {/* Input Field */}
        <div className="space-y-1">
          <label className="text-sm text-gray-800">Element Label</label>
          <div className="min-h-8 p-2 bg-slate-100 rounded-lg">
            <span className="text-sm text-zinc-500">Input label</span>
          </div>
        </div>

        {/* Upload Area */}
        <div className="px-6 py-4 border border-gray-300 rounded-lg flex flex-col items-center gap-1">
          <Upload className="w-6 h-6 text-gray-800" />
          <span className="text-xs text-zinc-500">Upload a Photo</span>
        </div>

        {/* Menu Items - 2x2 Grid */}
        <div className="grid grid-cols-2 gap-2">
          {menuItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2 p-2 border border-slate-200 rounded-lg">
              <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                <item.icon className="w-3 h-3 text-gray-800" />
              </div>
              <div className="flex-1 min-w-0 flex items-center gap-1">
                <span className="text-xs text-gray-800 truncate">{item.label}</span>
                <span className="px-1 py-0.5 bg-blue-50 text-cyan-700 text-[10px] rounded-full flex-shrink-0">
                  {item.count}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons Row 1 */}
        <div className="flex gap-2">
          <button className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg flex items-center justify-center gap-1 hover:bg-slate-50">
            <RefreshCw className="w-3 h-3 text-gray-800" />
            <span className="text-xs font-semibold text-gray-800">Swap</span>
          </button>
          <button className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg flex items-center justify-center gap-1 hover:bg-slate-50">
            <Copy className="w-3 h-3 text-gray-800" />
            <span className="text-xs font-semibold text-gray-800">Duplicate</span>
          </button>
        </div>

        {/* FoV and Depth Inputs */}
        <div className="flex gap-2">
          <div className="flex-1 space-y-1">
            <label className="text-sm text-gray-800">FoV°</label>
            <div className="min-h-8 p-2 bg-slate-100 rounded-lg flex items-center justify-between">
              <input
                type="number"
                value={fov}
                onChange={(e) => setFov(Number(e.target.value))}
                className="bg-transparent text-sm text-gray-800 border-none outline-none w-full"
              />
              <ChevronRight className="w-3 h-3 text-zinc-500" />
            </div>
          </div>
          <div className="flex-1 space-y-1">
            <label className="text-sm text-gray-800">Depth</label>
            <div className="min-h-8 p-2 bg-slate-100 rounded-lg flex items-center justify-between">
              <input
                type="number"
                value={depth}
                onChange={(e) => setDepth(Number(e.target.value))}
                className="bg-transparent text-sm text-gray-800 border-none outline-none w-full"
              />
              <ChevronRight className="w-3 h-3 text-zinc-500" />
            </div>
          </div>
        </div>

        {/* Label Form */}
        <div className="space-y-1">
          <label className="text-sm text-gray-800">Label Form</label>
          <div className="min-h-8 p-2 bg-slate-100 rounded-lg flex items-center justify-between">
            <select
              value={labelForm}
              onChange={(e) => setLabelForm(e.target.value)}
              className="bg-transparent text-sm text-gray-800 border-none outline-none w-full"
            >
              <option value="N/A">N/A</option>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
            </select>
            <ChevronRight className="w-3 h-3 text-zinc-500" />
          </div>
        </div>

        {/* Angle Slider */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-800">Angle</span>
            <span className="text-xs text-gray-800">{angle}°</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setAngle(Math.max(0, angle - 1))}
              className="w-3 h-3 flex items-center justify-center"
            >
              <span className="text-zinc-500 text-lg">-</span>
            </button>
            <div className="flex-1 h-2 bg-slate-200 rounded-full relative cursor-pointer"
                 onClick={(e) => {
                   const rect = e.currentTarget.getBoundingClientRect();
                   const x = e.clientX - rect.left;
                   const percentage = Math.max(0, Math.min(1, x / rect.width));
                   setAngle(Math.round(percentage * 180));
                 }}>
              <div
                className="h-full bg-cyan-700 rounded-full"
                style={{ width: `${(angle / 180) * 100}%` }}
              />
              <div
                className="absolute top-1/2 w-2.5 h-2.5 bg-cyan-700 rounded-full transform -translate-y-1/2 -translate-x-1/2 cursor-pointer"
                style={{ left: `${(angle / 180) * 100}%` }}
                onMouseDown={(e) => {
                  const startX = e.clientX;
                  const startAngle = angle;
                  const rect = e.currentTarget.parentElement.getBoundingClientRect();
                  
                  const handleMouseMove = (e) => {
                    const deltaX = e.clientX - startX;
                    const deltaPercentage = deltaX / rect.width;
                    const newAngle = Math.max(0, Math.min(180, startAngle + (deltaPercentage * 180)));
                    setAngle(Math.round(newAngle));
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
              onClick={() => setAngle(Math.min(180, angle + 1))}
              className="w-3 h-3 flex items-center justify-center"
            >
              <span className="text-zinc-500 text-lg">+</span>
            </button>
          </div>
        </div>

        {/* Opacity Slider */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-800">Opacity</span>
            <span className="text-xs text-gray-800">{opacity}%</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setOpacity(Math.max(0, opacity - 1))}
              className="w-3 h-3 flex items-center justify-center"
            >
              <span className="text-zinc-500 text-lg">-</span>
            </button>
            <div className="flex-1 h-2 bg-slate-200 rounded-full relative cursor-pointer"
                 onClick={(e) => {
                   const rect = e.currentTarget.getBoundingClientRect();
                   const x = e.clientX - rect.left;
                   const percentage = Math.max(0, Math.min(1, x / rect.width));
                   setOpacity(Math.round(percentage * 100));
                 }}>
              <div
                className="h-full bg-cyan-700 rounded-full"
                style={{ width: `${opacity}%` }}
              />
              <div
                className="absolute top-1/2 w-2.5 h-2.5 bg-cyan-700 rounded-full transform -translate-y-1/2 -translate-x-1/2 cursor-pointer"
                style={{ left: `${opacity}%` }}
                onMouseDown={(e) => {
                  const startX = e.clientX;
                  const startOpacity = opacity;
                  const rect = e.currentTarget.parentElement.getBoundingClientRect();
                  
                  const handleMouseMove = (e) => {
                    const deltaX = e.clientX - startX;
                    const deltaPercentage = deltaX / rect.width;
                    const newOpacity = Math.max(0, Math.min(100, startOpacity + (deltaPercentage * 100)));
                    setOpacity(Math.round(newOpacity));
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
              onClick={() => setOpacity(Math.min(100, opacity + 1))}
              className="w-3 h-3 flex items-center justify-center"
            >
              <span className="text-zinc-500 text-lg">+</span>
            </button>
          </div>
        </div>

        {/* Color Inputs - 2x1 Grid */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <label className="text-xs text-gray-800">Field Color</label>
            <div className="min-h-8 p-2 bg-slate-100 rounded-lg flex items-center gap-1">
              <div
                className="w-4 h-4 rounded border flex-shrink-0"
                style={{ backgroundColor: fieldColor }}
              />
              <input
                type="text"
                value={fieldColor.replace('#', '')}
                onChange={(e) => setFieldColor('#' + e.target.value)}
                className="flex-1 bg-transparent text-xs text-zinc-500 border-none outline-none min-w-0"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-gray-800">Element Color</label>
            <div className="min-h-8 p-2 bg-slate-100 rounded-lg flex items-center gap-1">
              <div
                className="w-4 h-4 rounded border flex-shrink-0"
                style={{ backgroundColor: elementColor }}
              />
              <input
                type="text"
                value={elementColor.replace('#', '')}
                onChange={(e) => setElementColor('#' + e.target.value)}
                className="flex-1 bg-transparent text-xs text-zinc-500 border-none outline-none min-w-0"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons Row 2 */}
        <div className="flex gap-2">
          <button className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg flex items-center justify-center gap-1 hover:bg-slate-50">
            <Edit className="w-3 h-3 text-gray-800" />
            <span className="text-xs font-semibold text-gray-800">Design</span>
          </button>
          <button className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg flex items-center justify-center gap-1 hover:bg-slate-50">
            <Palette className="w-3 h-3 text-gray-800" />
            <span className="text-xs font-semibold text-gray-800">Install</span>
          </button>
        </div>

        {/* Action Buttons Row 3 */}
        <div className="flex gap-2">
          <button className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg flex items-center justify-center gap-1 hover:bg-slate-50">
            <CheckSquare className="w-3 h-3 text-gray-800" />
            <span className="text-xs font-semibold text-gray-800">Element</span>
          </button>
          <button className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg flex items-center justify-center gap-1 hover:bg-slate-50">
            <Palette className="w-3 h-3 text-gray-800" />
            <span className="text-xs font-semibold text-gray-800">Quality</span>
          </button>
        </div>

        {/* Delete Button */}
        <button className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg flex items-center justify-center gap-1 hover:bg-red-50 hover:border-red-200 transition-colors">
          <Trash2 className="w-3 h-3 text-gray-800" />
          <span className="text-xs font-semibold text-gray-800">Delete</span>
        </button>
      </div>
    </div>
  );
}