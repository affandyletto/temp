import React, { useState } from 'react';
import { Camera, Plus, Minus, Square } from 'lucide-react';
import { useMobileSurvey } from "@/context/Mobile/MobileSurveyContext"

export const Survey = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { selectedElement, setSelectedElement } =useMobileSurvey()

  const items = [
    {
      id: 1,
      type: 'Noise Sensor',
      initial: 'NS',
      hasNotification: true,
      active: true
    },
    {
      id: 2,
      type: 'Restroom',
      initial: null,
      hasNotification: true,
      active: true,
      hasImage: true
    },
    {
      id: 3,
      type: 'Note',
      initial: 'N',
      hasNotification: false,
      active: false
    },
    {
      id: 4,
      type: 'Note',
      initial: 'N',
      hasNotification: false,
      active: false
    }
  ];

  return (
    <div className="w-full max-w-sm mx-auto h-screen relative bg-white overflow-hidden">
      {/* Items List - Scrollable content area */}
      <div className="pt-[90px] pb-24 px-1 h-full overflow-y-auto">
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <div key={item.id} className="pb-3 border-b border-slate-200 flex items-center gap-3" onClick={()=>setSelectedElement(item)}>
              {/* Avatar */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                item.hasImage ? 'bg-slate-200' : 'bg-blue-50'
              }`}>
                {item.initial && (
                  <span className="text-primary-200 text-xs font-semibold">{item.initial}</span>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col gap-1">
                <div className="text-black text-sm font-semibold">{item.type}</div>
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1">
                    <span className="text-zinc-500">Label :</span>
                    <span className="text-gray-800">-</span>
                  </div>
                  <div className="w-px h-4 bg-slate-200"></div>
                  <div className="flex items-center gap-1">
                    <span className="text-zinc-500">Status :</span>
                    <span className="text-gray-800">N/A</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-2 bg-slate-50 rounded-xl flex items-center relative">
                <Camera className="w-6 h-6 text-black" />
                {item.hasNotification && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">1</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};