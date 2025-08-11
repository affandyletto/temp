import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronRight, SlidersHorizontal } from 'lucide-react';
import { Topnav } from "@/apps/Survey/Topnav";
import { LibrarySidebar } from "@/apps/Survey/Sidebar/LibrarySidebar";
import { HistorySidebar } from "@/apps/Survey/Sidebar/HistorySidebar";
import { ElementListSidebar } from "@/apps/Survey/Sidebar/ElementListSidebar";
import { ElementDetailSidebar } from "@/apps/Survey/Sidebar/ElementDetailSidebar";
import { ElementHistoryDetail } from "@/apps/Survey/Elements/ElementHistoryDetail";
import { Design } from "@/apps/Survey/Elements/MiniPopup/Design";
import { InstallationAccess } from "@/apps/Survey/Elements/MiniPopup/InstallationAccess";
import { ElementInformation } from "@/apps/Survey/Elements/MiniPopup/ElementInformation";
import { ColorSelection } from "@/apps/Survey/Elements/MiniPopup/ColorSelection";
import { SurveySettings } from "@/apps/Survey/Elements/MiniPopup/SurveySettings";
import { VisibilityFilter } from "@/apps/Survey/Elements/MiniPopup/VisibilityFilter"
import { LeafletMap } from "./LeafletMap";
import { useMap } from '@/context/MapContext';
import { useTab } from '@/context/TabContext';
import { useProject } from '@/context/ProjectContext';
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import "@/apps/Survey/survey.css";
import { useNavigate, useParams } from 'react-router-dom';

export const Survey = () => {
  const [isCollapsedRight, setIsCollapsedRight] = useState(false);
  const [isCollapsedLeft, setIsCollapsedLeft] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [versionParam, setVersionParam] = useState(null);
  const { id } = useParams();
const navigate=useNavigate()

  // Refs for click outside detection
  const miniPopupRef = useRef(null);

  const {
    miniTab,
    setMiniTab
  } = useTab();

  const {
    selectedElement,
  } = useMap();

  const {
    loadSurvey
  } = useProject();

  const initLoad=async()=>{
    await loadSurvey(id)
  }

  useEffect(()=>{
    if(id){
      loadSurvey(id)
    }
  },[id])

  // Check URL parameters on component mount and when URL changes
  useEffect(() => {
    const checkUrlParams = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const versionValue = urlParams.get('version');
      setVersionParam(versionValue);
      
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

  // Click outside handler for mini popups
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (miniPopupRef.current && !miniPopupRef.current.contains(event.target)) {
        setMiniTab("");
      }
    };

    // Only add event listener if there's an active miniTab
    if (miniTab) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [miniTab, setMiniTab]);

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
    navigate("/")
  }, []);

  return (
    <div className="survey-container h-screen flex flex-col relative">
      {/* Topnav with absolute positioning */}
      <div className="absolute top-0 left-0 right-0 z-[10] bg-white shadow-sm">
        <Topnav onBack={onBack}/>
      </div>
      
      {/* Main content area that takes full height */}
      <div className="flex h-full relative overflow-hidden">
        {/* Left Sidebar */}
        <div className={`${isCollapsedRight ? 'w-0' : 'w-72'} bg-white border-r border-slate-200 flex flex-col transition-all duration-300 ease-in-out overflow-hidden mt-[70px]`}>
          
          
          {showVersionHistory ? (
            <HistorySidebar isCollapsed={isCollapsedRight} versionParam={versionParam}/>
          ) : (
            <LibrarySidebar onDragStart={handleElementDragStart} />
          )}
          
          {/* Left sidebar toggle button */}
          <div className={`absolute ${isCollapsedRight ? 'left-0' : 'left-72'} top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out z-[20]`}>
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
              {miniTab === "design" ? (
                <div className="absolute top-5 right-[300px] z-[10]">
                  <Design onClose={()=>setMiniTab("")}/>
                </div>
              ) : miniTab === "installationAccess" ? (
                <div className="absolute top-5 right-[300px] z-[10]">
                  <InstallationAccess onClose={()=>setMiniTab("")}/>
                </div>
              ) : miniTab === "elementInformation" ? (
                <div className="absolute top-5 right-[300px] z-[10]">
                  <ElementInformation onClose={()=>setMiniTab("")} />
                </div>
              ) : (miniTab === "bgColor"||miniTab === "color") ? (
                <div className="absolute top-5 right-[300px] z-[10]" ref={miniPopupRef}>
                  <ColorSelection onClose={()=>setMiniTab("")} type={miniTab}/>
                </div>
              ): null}
            </>
          )}

        {(miniTab === "surveySettings") ? (
          <div className="absolute top-5 left-[300px] z-[10]">
            <SurveySettings onClose={()=>setMiniTab("")} />
          </div>
        ):(miniTab === "filter") ? (
          <div className="absolute top-5 right-[300px] z-[10]">
            <VisibilityFilter onClose={()=>setMiniTab("")}/>
          </div>
        ): null}
        
        {/* Right Sidebar */}
        <div className={`${isCollapsedLeft ? 'w-0' : 'w-72'} bg-white border-l border-slate-200 flex flex-col transition-all duration-300 ease-in-out overflow-hidden relative z-10`}>
          {selectedElement && !showVersionHistory ? (
            <ElementDetailSidebar isCollapsed={isCollapsedLeft}/>
          ) : showVersionHistory && selectedElement ? 
            <ElementHistoryDetail/>  
           : (
            <ElementListSidebar 
              isCollapsed={isCollapsedLeft}
              onDragStart={handleElementDragStart}
            />
          )}    
          
        </div>
      </div>
      {!isCollapsedRight&&
        <div className={`absolute bottom-5 ${isCollapsedRight?'left-[20px]':'left-[300px]'} right-0 z-[10] bg-white shadow-sm w-6`}>
          <ButtonPrimary
            icon={SlidersHorizontal}
            label={"Filters"}
            onClick={() => miniTab==="filter"?setMiniTab(""):setMiniTab("filter")}
          />
        </div>
      }
      
      
    </div>
  );
};