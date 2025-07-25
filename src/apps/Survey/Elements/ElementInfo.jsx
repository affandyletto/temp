import React, { useState, useEffect } from 'react';
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
import { SliderControl } from "@/components/Form/SliderControl"
import { useUrlParams } from "@/hooks/useUrlParams";
import { useMap } from '@/context/MapContext';


export const ElementInfo=({data, setTab})=>{
    const { toggleParameter, getParam } = useUrlParams();
    const [fov, setFov] = useState(50);
    const [depth, setDepth] = useState(0);
    const [labelForm, setLabelForm] = useState('N/A');
    const [angle, setAngle] = useState(75);
    const [opacity, setOpacity] = useState(50);
    const [fieldColor, setFieldColor] = useState('#D9D9D9');
    const [elementColor, setElementColor] = useState('#3F444D');


    const {
      selectedElement,
      setSelectedElement,
      placedElements,
      setPlacedElements,
      redrawFOV,
      duplicateElement,

      selectColor,
      setSelectColor,
      selectBGColor,
      setSelectBGColor
    } = useMap();

  useEffect(()=>{
    setFieldColor(selectColor)
    setElementColor(selectBGColor)
  },[selectColor, selectBGColor])

  useEffect(() => {
      if (selectedElement && selectedElement.id) {
        redrawFOV(selectedElement?.markerId, {angle:angle, opacity:opacity, rotate:fov, depth:depth})
          setPlacedElements(prevElements => 
              prevElements.map(element => 
                  element.markerId === selectedElement.markerId 
                      ? {
                          ...element,
                          rotate: fov,
                          depth: depth,
                          angle: angle,
                          opacity: opacity,
                          color:elementColor,
                          bgColor:fieldColor
                      }
                      : element
              )
          );
      }
  }, [angle, opacity, fov, depth, fieldColor, elementColor]);

    // Check if design parameter is active on component mount
  useEffect(() => {
    if(selectedElement){
      setFov(selectedElement?.rotate)
      setDepth(selectedElement?.depth)
      setAngle(selectedElement?.angle)
      setOpacity(selectedElement?.opacity)
      setFieldColor(selectedElement?.bgColor)
      setElementColor(selectedElement?.color)
    }
  }, [selectedElement]);

  const photosClick=()=>{
      setTab("photos")
   }

  const commentClick=()=>{
      setTab("comment")
   }

  const taskClick=()=>{
      setTab("task")
   }

  const pathClick=()=>{
      setTab("path")
   }
  
  const menuItems = [
      { icon: Image, label: 'Photos', count: 2, action:photosClick },
      { icon: MessageSquare, label: 'Comment', count: 3, action:commentClick },
      { icon: CheckSquare, label: 'Task', count: 0, action:taskClick },
      { icon: Route, label: 'Path', count: 10, action:pathClick }
    ];

  return(
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
              onClick={() => setTab("swap")}
              className="flex-1"
            >
              Swap
            </Button>
            <Button 
              icon={Copy} 
              onClick={duplicateElement}
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
                  max={360}
                  onChange={(e) => setFov(Number(e.target.value))}
                  className="bg-transparent text-sm text-gray-800 border-none outline-none w-full"
                />
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
            max={360} 
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
            <div className="space-y-1 cursor-pointer">
              <label className="text-sm text-gray-800">Field Color</label>
              <div className="p-3 bg-slate-100 rounded-lg flex items-center gap-2"                  
                onClick={()=>{
                    toggleParameter('more', 'bgColor');
                  }}
                >
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
                  disabled
                />
              </div>
            </div>
            <div className="space-y-1  cursor-pointer">
              <label className="text-sm text-gray-800">Element Color</label>
              <div className="p-3 bg-slate-100 rounded-lg flex items-center gap-2">
                <div
                  className="w-5 h-5 rounded border"
                  style={{ backgroundColor: elementColor }}
                  onClick={()=>{
                    toggleParameter('more', 'color');
                  }}
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
          
          <ButtonGroup>
            <Button 
              icon={Edit} 
              onClick={()=>toggleParameter('more', 'design')}
              className={`flex-1`}
            >
              Design
            </Button>
            <Button 
              icon={Palette} 
               onClick={()=>toggleParameter("more", "installationAccess")}
              className="flex-1"
            >
              Installation
            </Button>
          </ButtonGroup>

          <ButtonGroup>
            <Button 
              icon={CheckSquare} 
              onClick={() => toggleParameter("more", "elementInformation")}
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
  )
}