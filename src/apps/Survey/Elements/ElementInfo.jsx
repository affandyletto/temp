import React, { useState, useEffect, useRef } from 'react';
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
  Plus,
  Camera
} from 'lucide-react';
import { Button, ButtonGroup } from "@/components/Button/ButtonSurveys"
import { SliderControl } from "@/components/Form/SliderControl"
import { useUrlParams } from "@/hooks/useUrlParams";
import { useMap } from '@/context/MapContext';
import { useTab } from '@/context/TabContext';
import ModalConfirm from "@/components/Modal/ModalConfirm";


export const ElementInfo=({data, setTab})=>{
    const { toggleParameter, getParam } = useUrlParams();
    const [fov, setFov] = useState(50);
    const [depth, setDepth] = useState(0);
    const [labelForm, setLabelForm] = useState('N/A');
    const [angle, setAngle] = useState(75);
    const [fieldColor, setFieldColor] = useState('#D9D9D9');
    const [elementColor, setElementColor] = useState('#3F444D');
    const [isDeleteElement, setIsDeleteElement] = useState(false)
    const fileInputRef = useRef(null);
    const isInitializing = useRef(false);
    const updateTimeoutRef = useRef(null);

    const {
      selectedElement,
      placedElements,
      redrawFOV,
      duplicateElement,   
      uploadPhoto,
      deleteElement,
      updateElementInState   
    } = useMap();

    const {
      setMiniTab,
      miniTab
    }= useTab()

  const toggleMiniTab=(data)=>{
    if(data===miniTab){
      setMiniTab("")
    }else{
      setMiniTab(data)
    }
  }

  useEffect(() => {
    if (selectedElement && !isInitializing.current) {
      redrawFOV(selectedElement?.markerId, {
        angle: angle, 
        rotate: fov, 
        depth: depth, 
        bgColor: fieldColor, 
        color: elementColor
      });
    }
}, [selectedElement, angle, fov, depth, fieldColor, elementColor]);

  useEffect(() => {
    if (selectedElement && !isInitializing.current) {
      // Clear existing timeout
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
      
      // Set new timeout to update state after user stops changing values
      updateTimeoutRef.current = setTimeout(() => {
        updateElementInState(selectedElement.id, {
          angle: angle, 
          rotate: fov, 
          depth: depth, 
          bgColor: fieldColor, 
          color: elementColor 
        })
      }, 300); // Update state 300ms after user stops changing values
    }
}, [angle, fov, depth, fieldColor, elementColor]);

  useEffect(() => {
  return () => {
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }
  };
}, []);

    // Check if design parameter is active on component mount
  useEffect(() => {
    if(selectedElement){
      setFov(selectedElement?.rotate)
      setDepth(selectedElement?.depth)
      setAngle(selectedElement?.angle)
      setFieldColor(selectedElement?.bgColor)
      setElementColor(selectedElement?.color)
      setTimeout(() => { isInitializing.current = false; }, 0);
    }
  }, [selectedElement]);

  // Handle photo upload
  const handlePhotoUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      uploadPhoto(selectedElement?.id, file);
    }
    // Reset the input value to allow selecting the same file again
    event.target.value = '';
  };

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
      { icon: Image, label: 'Photos', count: selectedElement?.photos?.length||0, action:photosClick },
      { icon: MessageSquare, label: 'Comment', count: selectedElement?.comments?.length||0, action:commentClick },
      { icon: CheckSquare, label: 'Task', count: 0, action:taskClick },
      { icon: Route, label: 'Path', count: 10, action:pathClick }
    ];

  return(
    <>
      {/* Upload Area */}
      <div 
        className="px-10 py-8 border border-dashed border-gray-300 rounded-lg flex flex-col items-center gap-2 cursor-pointer hover:border-blue-400 transition-colors"
        onClick={handlePhotoUpload}
      >
        <Camera className="w-8 h-8 text-gray-800" />
        <span className="text-xs text-zinc-500">Upload a Photo</span>
      </div>
        
      {/* Hidden file input with camera support */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment" // This opens the back camera on mobile devices
        onChange={handleFileSelect}
        className="hidden"
      />

          {/* Menu Items */}
          <div className="space-y-2">
            {menuItems.map((item, index) => (
              <div key={index} className="pb-2 border-b border-slate-200 flex items-center gap-2 cursor-pointer" onClick={item.action}>
                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-gray-800" />
                </div>
                <div className="flex-1 flex items-center gap-2">
                  <span className="text-sm text-gray-800">{item.label}</span>
                  <span className="px-1.5 py-0.5 bg-blue-50 text-primary-200 text-[10px] rounded-full">
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

          {/* Sliders */}
          <SliderControl 
            label="Angle" 
            value={angle} 
            setValue={setAngle} 
            max={360} 
            unit="°" 
          />

          {/* Color Inputs */}
          <div className="space-y-2">
            <div className="space-y-1 cursor-pointer">
              <label className="text-sm text-gray-800">Field Color</label>
              <div className="p-3 bg-slate-100 rounded-lg flex items-center gap-2"                  
                onClick={()=>{
                    toggleMiniTab('bgColor');
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
                    toggleMiniTab('color');
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

          <div className="space-y-1">
            <label className="text-sm text-gray-800">Status</label>
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
            </div>
          </div>
          
          <ButtonGroup>
            <Button 
              icon={Edit} 
              onClick={()=>toggleMiniTab('design')}
              className={`flex-1`}
            >
              Design
            </Button>
            <Button 
              icon={Palette} 
               onClick={()=>toggleMiniTab("installationAccess")}
              className="flex-1"
            >
              Installation
            </Button>
          </ButtonGroup>

          <ButtonGroup>
            <Button 
              icon={CheckSquare} 
              onClick={() => toggleMiniTab("elementInformation")}
              className="flex-1"
            >
              Element
            </Button>
            <Button 
              icon={Palette} 
              onClick={() => console.log('Quality Check clicked')}
              className="flex-1"
            >
              Q-Check
            </Button>
          </ButtonGroup>

          {/* Delete Button - Using danger variant */}
          <Button 
            icon={Trash2} 
            variant="danger"
            onClick={() => setIsDeleteElement(true)}
            className="w-full"
          >
            Delete
          </Button>

      <ModalConfirm
        isOpen={isDeleteElement}
        onClose={() => setIsDeleteElement(false)}
        onConfirm={deleteElement}
        title={`Do you want to remove this element?`}
        message="This action will remove the selected element"
      />
    </>
  )
}