import React, { useState, useEffect, useCallback } from 'react';
import { ChevronRight } from 'lucide-react';
import { Topnav } from "@/apps/Survey/Topnav";
import { LibrarySidebar } from "@/apps/Survey/Sidebar/LibrarySidebar";
import { HistorySidebar } from "@/apps/Survey/Sidebar/HistorySidebar";
import { ElementListSidebar } from "@/apps/Survey/Sidebar/ElementListSidebar";
import { ElementDetailSidebar } from "@/apps/Survey/Sidebar/ElementDetailSidebar";
import { ElementHistoryDetail } from "@/apps/Survey/Elements/ElementHistoryDetail";
import { useNavigate } from "react-router-dom";
import { Design } from "@/apps/Survey/Elements/MiniPopup/Design";
import { InstallationAccess } from "@/apps/Survey/Elements/MiniPopup/InstallationAccess";
import { ElementInformation } from "@/apps/Survey/Elements/MiniPopup/ElementInformation";
import { ColorSelection } from "@/apps/Survey/Elements/MiniPopup/ColorSelection";
import { LeafletMap } from "./LeafletMap";
import { useMap } from '@/context/MapContext';

import "@/apps/Survey/survey.css";

export const Survey = () => {
  const [isCollapsedRight, setIsCollapsedRight] = useState(false);
  const [isCollapsedLeft, setIsCollapsedLeft] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [versionParam, setVersionParam] = useState(null);
  const [moreParam, setMoreParam] = useState(null);


  const {
    selectedElement
  } = useMap();

  // Check URL parameters on component mount and when URL changes
  useEffect(() => {
    const checkUrlParams = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const versionValue = urlParams.get('version');
      const moreValue = urlParams.get('more');
      
      setVersionParam(versionValue);
      setMoreParam(moreValue);
      
      // Show version history only if 'version' parameter is present
      setShowVersionHistory(versionValue !== null);
    };
    
    // Check on initial load
    checkUrlParams();
    
    // Listen for URL changes (from the Topnav toggle)
    const handleUrlChange = () => {
      setTimeout(() => {
        checkUrlParams();
      }, 0);
    };
    
    window.addEventListener('urlchange', handleUrlChange);
    
    return () => {
      window.removeEventListener('urlchange', handleUrlChange);
    };
  }, []);

  // Handle drag start from sidebar
  const handleElementDragStart = useCallback((element) => {
    console.log('Drag started for element:', element);
  }, []);
  
  const toggleCollapsedLeft = useCallback(() => {
    setIsCollapsedLeft(prev => !prev);
  }, []);
  
  const toggleCollapsedRight = useCallback(() => {
    setIsCollapsedRight(prev => !prev);
  }, []);
  
  const onBack = useCallback(() => {
    console.log("Navigating back to projects");
  }, []);

  return (
    <div className="survey-container h-screen flex flex-col">
      {/* Topnav with higher z-index and proper positioning */}
      <div className="relative z-[100] bg-white shadow-sm">
        <Topnav onBack={onBack}/>
      </div>
      
      {/* Main content area that takes remaining height */}
      <div className="flex flex-1 relative overflow-hidden">
        {/* Left Sidebar */}
        <div className={`${isCollapsedRight ? 'w-0' : 'w-72'} bg-white border-r border-slate-200 flex flex-col transition-all duration-300 ease-in-out overflow-hidden`}>
          {showVersionHistory ? (
            <HistorySidebar isCollapsed={isCollapsedRight}/>
          ) : (
            <LibrarySidebar onDragStart={handleElementDragStart} />
          )}
          
          {/* Left sidebar toggle button */}
          <div className={`absolute ${isCollapsedRight ? 'left-0' : 'left-72'} top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out z-[60]`}>
            <button 
              onClick={toggleCollapsedRight}
              className="w-6 h-24 bg-white rounded-r-3xl border-r border-t border-b border-slate-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
            >
              <ChevronRight className={`w-4 h-4 text-zinc-500 transition-transform duration-300 ${isCollapsedRight ? 'rotate-0' : 'rotate-180'}`} />
            </button>
          </div>
        </div>

        {/* Main Content Area - Leaflet Map */}
        <div className="flex-1 relative z-10">
          <LeafletMap 
            onElementDragStart={handleElementDragStart}
          />
        </div>
        
        <div className={`absolute ${isCollapsedLeft ? 'right-0' : 'right-72'} top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out z-10`}
          style={{ top: 'calc(50vh - 54.5px)' }}
        >
          <button 
            onClick={toggleCollapsedLeft}
            className="w-6 h-24 bg-white rounded-l-3xl border-l border-t border-b border-slate-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
          >
            <ChevronRight className={`w-4 h-4 text-zinc-500 transition-transform duration-300 ${isCollapsedLeft ? 'rotate-180' : 'rotate-0'}`} />
          </button>
        </div>
        
        {selectedElement && (
            <>
              {moreParam === "design" ? (
                <div className="absolute top-5 right-[300px] z-[100]">
                  <Design/>
                </div>
              ) : moreParam === "installationAccess" ? (
                <div className="absolute top-5 right-[300px] z-[100]">
                  <InstallationAccess/>
                </div>
              ) : moreParam === "elementInformation" ? (
                <div className="absolute top-5 right-[300px] z-[100]">
                  <ElementInformation/>
                </div>
              ) : (moreParam === "bgColor"||moreParam === "color") ? (
                <div className="absolute top-5 right-[300px] z-[100]">
                  <ColorSelection type={moreParam}/>
                </div>
              ): null}
            </>
          )}
        {/* Right Sidebar */}
        <div className={`${isCollapsedLeft ? 'w-0' : 'w-72'} bg-white border-l border-slate-200 flex flex-col transition-all duration-300 ease-in-out overflow-hidden relative z-50`}>
          {selectedElement && !showVersionHistory ? (
            <ElementDetailSidebar isCollapsed={isCollapsedLeft}/>
          ) : showVersionHistory ? (
            <ElementHistoryDetail/>  
          ) : (
            <ElementListSidebar 
              isCollapsed={isCollapsedLeft}
              onDragStart={handleElementDragStart}
            />
          )}    
          
        </div>
      </div>
    </div>
  );
};