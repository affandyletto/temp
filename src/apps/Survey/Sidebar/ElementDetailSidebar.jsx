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
  ArrowLeft,
  X,
  Minus,
  Plus
} from 'lucide-react';
import { Button, ButtonGroup } from "@/components/Button/ButtonSurveys"
import { ElementPhotos } from "@/apps/Survey/Elements/ElementPhotos"
import { ElementInfo } from "@/apps/Survey/Elements/ElementInfo"
import { ElementTask } from "@/apps/Survey/Elements/ElementTask"
import { ElementPath } from "@/apps/Survey/Elements/ElementPath"

import { ModalSwapElement } from "@/components/Modal/ModalSwapElement"
import SurveyComment from "@/components/Section/SurveyComment"
import { useMap } from '@/context/MapContext';


// Refactored Sidebar Component
export const ElementDetailSidebar = () => {
  const [tab, setTab] = useState("main")

  const {
    selectedElement,
    setSelectedID,
    setSelectedElement
  } = useMap();

  const handleSwap=()=>{

  }
  
  return (
    <div className="w-72 bg-white border-l border-slate-200 h-full flex flex-col relative">
      {/* Header */}
      <div className="px-3 pt-4 pb-3 border-b border-slate-200 flex items-center justify-between flex-shrink-0">

          {tab!=="main"&&
            <div className="p-2 bg-white rounded-lg border border-slate-200 flex items-center justify-center cursor-pointer mr-3" 
              onClick={() => setTab("main")}>
              <ArrowLeft className="w-4 h-4 text-gray-800"/>
            </div>
          }

        <div className="flex-1">
          <h2 className="text-base font-bold text-gray-800">{selectedElement?.name}</h2>
          <p className="text-xs text-zinc-500">ID: {selectedElement?.id}</p>
        </div>

        {tab==="main"&&
          <button
            onClick={() => {setSelectedID?.(null); setSelectedElement(null);}}
            className="p-1 hover:bg-slate-100 rounded"
          >
            <X className="w-5 h-5 text-zinc-500" />
          </button>
        }
        

      </div>

      {/* Scrollable Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-h-0">
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
          {/* Input Field */}
          <div className="space-y-1">
            <label className="text-sm text-gray-800">Element Label</label>
            <div className="p-3 bg-slate-100 rounded-lg">
              <input 
                className="text-sm text-zinc-500 bg-transparent border-none outline-none w-full" 
                placeholder="Input label"
              />
            </div>
          </div>
          
          {tab==="photos"?
          	<>
          		<ElementPhotos/>
          	</>
          :tab==="comment"?
            <>
              <SurveyComment isOpen={tab==="comment"} onClose={()=>setTab("main")}/>
            </>
          :tab==="task"?
            <ElementTask/>
          :tab==="path"?
            <>
              <ElementPath setTab={setTab}/>
            </>
          :
        	  <>
              <ElementInfo setTab={setTab}/>
            </>
          }

          <ModalSwapElement 
            isOpen={tab==="swap"}
            onClose={() => setTab('main')}
            onSubmit={handleSwap}
          />

        </div>
      </div>
    </div>
  );
};