import { MoreHorizontal, Eye, History, FileText, Settings, Download, Layers, ArrowLeft, Info } from "lucide-react";
import { useTab } from '@/context/TabContext';

const ActionButton = ({ icon: Icon, label, onClick }) => {
  return (
    <button 
      className="flex items-center gap-2 pr-2 hover:bg-gray-50 rounded transition-colors"
      onClick={onClick}
    >
      <div className="w-7 h-7 bg-white rounded flex items-center justify-center">
        <Icon className="w-5 h-5 text-gray-800" />
      </div>
      <span className="text-gray-800 text-xs font-inter">{label}</span>
    </button>
  );
};

export const Topnav = ({ onBack }) => {
  const handleHistoryClick = () => {
    const url = new URL(window.location);
    
    // Check if the version parameter exists
    if (url.searchParams.has('version')) {
      // Remove the parameter if it exists
      url.searchParams.delete('version');
    } else {
      // Add the parameter if it doesn't exist
      url.searchParams.set('version', '01');
    }
    
    // Update the URL without page reload
    window.history.pushState({}, '', url);
    
    window.dispatchEvent(new Event('urlchange'));
  };

  const {
    miniTab,
    setMiniTab
  } = useTab();

  const toggleMiniTab=(data)=>{
    console.info(data)
    if(miniTab===data){
      setMiniTab("")
    }else{
      setMiniTab(data)
    }
  }

  return (
    <>
      <div className="w-full px-5 py-3 bg-white border-b border-gray-300 flex justify-between items-center">
        {/* Left Section - Project Info */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg border border-slate-200 flex items-center justify-center cursor-pointer" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 text-gray-800"/>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <span className="text-gray-800 text-base font-bold font-roboto">Floorplan-01</span>
              <Info className="w-5 h-5 text-zinc-500 ml-1" />
            </div>
            <span className="text-zinc-500 text-xs font-roboto">Last update 25 minutes ago</span>
          </div>
        </div>
        {/* Right Section - Action Buttons */}
        <div className="flex items-center gap-3">
          <ActionButton icon={Eye} label="Visibility Filter" />
          <ActionButton icon={Layers} label="Version History" onClick={handleHistoryClick}/>
          <ActionButton icon={Settings} label="Survey Setting" onClick={()=>toggleMiniTab("surveySettings")}/>
          <ActionButton icon={Download} label="Export" />
        </div>
      </div>
    </>
  );
};