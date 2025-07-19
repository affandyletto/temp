import React, { useState } from 'react';
import { 
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
  ChevronRight,
  X,
  Minus,
  Plus
} from 'lucide-react';
import { Button, ButtonGroup } from "@/components/Button/ButtonSurveys"
import { ElementPhotos } from "@/apps/Survey/Elements/ElementPhotos"

// Refactored Sidebar Component
export const ElementDetailSidebarFigma = ({ selectedElement, setSelectedElement }) => {
  const [tab, setTab] = useState("")
  const [fov, setFov] = useState(50);
  const [depth, setDepth] = useState(0);
  const [labelForm, setLabelForm] = useState('N/A');
  const [angle, setAngle] = useState(75);
  const [opacity, setOpacity] = useState(50);
  const [fieldColor, setFieldColor] = useState('#D9D9D9');
  const [elementColor, setElementColor] = useState('#3F444D');

  const photosClick=()=>{
  	setTab("photos")
  }

  const menuItems = [
    { icon: Image, label: 'Photos', count: 2, action:photosClick },
    { icon: MessageSquare, label: 'Comment', count: 3, action:photosClick },
    { icon: CheckSquare, label: 'Task', count: 0, action:photosClick },
    { icon: Route, label: 'Path', count: 10, action:photosClick }
  ];

  const handleSliderChange = (value, setter, max = 100) => {
    setter(Math.max(0, Math.min(max, value)));
  };

  const SliderControl = ({ label, value, setValue, max = 100, unit = '' }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-800">{label}</span>
        <span className="text-xs text-gray-800">{value}{unit}</span>
      </div>
      <div className="flex items-center gap-2">
        <button 
          onClick={() => handleSliderChange(value - 1, setValue, max)}
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
            setValue(Math.round(percentage * max));
          }}
        >
          <div
            className="h-full bg-cyan-700 rounded-full"
            style={{ width: `${(value / max) * 100}%` }}
          />
          <div
            className="absolute top-1/2 w-3 h-3 bg-cyan-700 rounded-full transform -translate-y-1/2 -translate-x-1/2 cursor-pointer"
            style={{ left: `${(value / max) * 100}%` }}
            onMouseDown={(e) => {
              const startX = e.clientX;
              const startValue = value;
              const rect = e.currentTarget.parentElement.getBoundingClientRect();
              
              const handleMouseMove = (e) => {
                const deltaX = e.clientX - startX;
                const deltaPercentage = deltaX / rect.width;
                const newValue = Math.max(0, Math.min(max, startValue + (deltaPercentage * max)));
                setValue(Math.round(newValue));
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
          onClick={() => handleSliderChange(value + 1, setValue, max)}
          className="w-4 h-4 flex items-center justify-center hover:bg-slate-100 rounded"
        >
          <Plus className="w-3 h-3 text-zinc-500" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-72 bg-white border-l border-slate-200 h-full flex flex-col relative">
      {/* Header */}
      <div className="px-3 pt-4 pb-3 border-b border-slate-200 flex items-center justify-between flex-shrink-0">
        <div className="flex-1">
          <h2 className="text-base font-bold text-gray-800">Element-02</h2>
          <p className="text-xs text-zinc-500">ID: 63115</p>
        </div>
        <button
          onClick={() => setSelectedElement?.(null)}
          className="p-1 hover:bg-slate-100 rounded"
        >
          <X className="w-5 h-5 text-zinc-500" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="px-3 py-4 space-y-4">
          {/* Input Field */}
          <div className="space-y-1">
            <label className="text-sm text-gray-800">Element Label</label>
            <div className="p-3 bg-slate-100 rounded-lg">
              <span className="text-sm text-zinc-500">Input label</span>
            </div>
          </div>






          {tab==="photos"?
          	<>
          		<ElementPhotos/>
          	</>
          :

      	  <>
          {/* Upload Area */}
          <div className="px-10 py-8 border border-gray-300 rounded-lg flex flex-col items-center gap-2">
            <Upload className="w-8 h-8 text-gray-800" />
            <span className="text-xs text-zinc-500">Upload a Photo</span>
          </div>

          {/* Menu Items */}
          <div className="space-y-2">
            {menuItems.map((item, index) => (
              <div key={index} className="pb-2 border-b border-slate-200 flex items-center gap-2 cursor-pointer" onClick={item.action}>
                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-gray-800" />
                </div>
                <div className="flex-1 flex items-center gap-2">
                  <span className="text-sm text-gray-800">{item.label}</span>
                  <span className="px-1.5 py-0.5 bg-blue-50 text-cyan-700 text-[10px] rounded-full">
                    {item.count}
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-500" />
              </div>
            ))}
          </div>

          {/* Action Buttons Row 1 - Using Reusable Button Component */}
          <ButtonGroup>
            <Button 
              icon={RefreshCw} 
              onClick={() => console.log('Swap clicked')}
              className="flex-1"
            >
              Swap
            </Button>
            <Button 
              icon={Copy} 
              onClick={() => console.log('Duplicate clicked')}
              className="flex-1"
            >
              Duplicate
            </Button>
          </ButtonGroup>

          {/* FoV and Depth Inputs */}
          <div className="flex gap-2">
            <div className="flex-1 space-y-1">
              <label className="text-sm text-gray-800">FoV°</label>
              <div className="p-3 bg-slate-100 rounded-lg flex items-center justify-between">
                <input
                  type="number"
                  value={fov}
                  onChange={(e) => setFov(Number(e.target.value))}
                  className="bg-transparent text-sm text-gray-800 border-none outline-none w-full"
                />
                <ChevronRight className="w-5 h-5 text-zinc-500" />
              </div>
            </div>
            <div className="flex-1 space-y-1">
              <label className="text-sm text-gray-800">Depth</label>
              <div className="p-3 bg-slate-100 rounded-lg flex items-center justify-between">
                <input
                  type="number"
                  value={depth}
                  onChange={(e) => setDepth(Number(e.target.value))}
                  className="bg-transparent text-sm text-gray-800 border-none outline-none w-full"
                />
                <ChevronRight className="w-5 h-5 text-zinc-500" />
              </div>
            </div>
          </div>

          {/* Label Form */}
          <div className="space-y-1">
            <label className="text-sm text-gray-800">Label Form</label>
            <div className="p-3 bg-slate-100 rounded-lg flex items-center justify-between">
              <select
                value={labelForm}
                onChange={(e) => setLabelForm(e.target.value)}
                className="bg-transparent text-sm text-gray-800 border-none outline-none w-full"
              >
                <option value="N/A">N/A</option>
                <option value="Option 1">Option 1</option>
                <option value="Option 2">Option 2</option>
              </select>
              <ChevronRight className="w-5 h-5 text-zinc-500" />
            </div>
          </div>

          {/* Sliders */}
          <SliderControl 
            label="Angle" 
            value={angle} 
            setValue={setAngle} 
            max={180} 
            unit="°" 
          />
          
          <SliderControl 
            label="Opacity" 
            value={opacity} 
            setValue={setOpacity} 
            max={100} 
            unit="%" 
          />

          {/* Color Inputs */}
          <div className="space-y-2">
            <div className="space-y-1">
              <label className="text-sm text-gray-800">Field Color</label>
              <div className="p-3 bg-slate-100 rounded-lg flex items-center gap-2">
                <div
                  className="w-5 h-5 rounded border"
                  style={{ backgroundColor: fieldColor }}
                />
                <input
                  type="text"
                  value={fieldColor}
                  onChange={(e) => setFieldColor(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-zinc-500 border-none outline-none"
                  placeholder="#D9D9D9"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm text-gray-800">Element Color</label>
              <div className="p-3 bg-slate-100 rounded-lg flex items-center gap-2">
                <div
                  className="w-5 h-5 rounded border"
                  style={{ backgroundColor: elementColor }}
                />
                <input
                  type="text"
                  value={elementColor}
                  onChange={(e) => setElementColor(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-zinc-500 border-none outline-none"
                  placeholder="#3F444D"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons - Using Reusable Button Component */}
          <ButtonGroup>
            <Button 
              icon={Edit} 
              onClick={() => console.log('Design clicked')}
              className="flex-1"
            >
              Design
            </Button>
            <Button 
              icon={Palette} 
              onClick={() => console.log('Installation clicked')}
              className="flex-1"
            >
              Installation
            </Button>
          </ButtonGroup>

          <ButtonGroup>
            <Button 
              icon={CheckSquare} 
              onClick={() => console.log('Element clicked')}
              className="flex-1"
            >
              Element
            </Button>
            <Button 
              icon={Palette} 
              onClick={() => console.log('Quality Check clicked')}
              className="flex-1"
            >
              Quality Check
            </Button>
          </ButtonGroup>

          {/* Delete Button - Using danger variant */}
          <Button 
            icon={Trash2} 
            variant="danger"
            onClick={() => console.log('Delete clicked')}
            className="w-full"
          >
            Delete
          </Button>
          	</>
          }



        </div>
      </div>
    </div>
  );
};