import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import {Topnav} from "@/apps/Survey/Topnav";
import {LibrarySidebar} from "@/apps/Survey/LibrarySidebar";
import {ElementListSidebar} from "@/apps/Survey/ElementListSidebar";
import { useNavigate } from "react-router-dom";

import "@/apps/Survey/survey.css";

export const Survey = () => {
  const [isCollapsedRight, setIsCollapsedRight] = useState(false);
  const [isCollapsedLeft, setIsCollapsedLeft] = useState(false);

  const navigate = useNavigate();

  const toggleCollapsedLeft = () => {
    setIsCollapsedLeft(!isCollapsedLeft);
  };

  const onBack=()=>{
    navigate("/projects")
  }

  return (
    <>      
      <div className="survey-container h-screen overflow-y-hidden flex flex-col">
        <Topnav onBack={onBack}/>

        <div className="flex h-full">
          <div className={`${isCollapsedRight ? 'w-0' : 'w-72'} bg-white border-r border-slate-200 flex flex-col transition-all duration-300 ease-in-out overflow-hidden`}>
            <LibrarySidebar isCollapsed={isCollapsedRight}/>

            <div className={`absolute ${isCollapsedRight ? 'left-0' : 'left-72'} top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out`}>
              <button 
                onClick={() => setIsCollapsedRight(!isCollapsedRight)}
                className="w-6 h-24 bg-white rounded-r-3xl border-r border-t border-b border-slate-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className={`w-4 h-4 text-zinc-500 transition-transform duration-300 ${isCollapsedRight ? 'rotate-0' : 'rotate-180'}`} />
              </button>
            </div>
          </div>
        </div>

        <div className="fixed right-0 top-16 mt-2 bottom-0 z-20">
          <div className="fixed right-0 top-16 mt-2 bottom-0 z-20">
            <ElementListSidebar isCollapsed={isCollapsedLeft}/>
            <div className={`absolute ${isCollapsedLeft ? '-left-6' : '-left-6'} top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out z-10`}>
              <button 
                onClick={toggleCollapsedLeft}
                className="w-6 h-24 bg-white rounded-l-3xl border-l border-t border-b border-slate-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className={`w-4 h-4 text-zinc-500 transition-transform duration-300 ${isCollapsedLeft ? 'rotate-180' : 'rotate-0'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};