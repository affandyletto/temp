import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Edit2, Info } from 'lucide-react';
import { useMobileOnesnap } from "@/context/Mobile/MobileOnesnapContext"
import { useMobile } from '@/context/Mobile/MobileContext';

export const TopnavDetailAlbum = () => {
  const navigate = useNavigate();
  const { oneSnapId } = useParams();  
  const { selectedOneSnap, setSelectedOneSnap } =useMobileOnesnap()
  const { onToggle } = useMobile();

  const handleBack = () => {
    if(selectedOneSnap){
      setSelectedOneSnap(null)
      navigate(`/oneSnap/${oneSnapId}`)
    }else{      
      navigate('/oneSnap');
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-white z-10">
      
      {/* Header */}
      <div className="w-full px-5 py-4 bg-white flex items-center gap-4">
        <button 
          onClick={handleBack}
          className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-800" />
        </button>
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-gray-800 text-base font-semibold">Mif First Project</h1>
            <span className="px-2 py-0.5 bg-blue-50 text-primary-200 text-[10px] rounded-full">
              {oneSnapId}
            	<Edit2 className="w-4 h-4 bg-white" onClick={()=>onToggle("editGallery")}/>
            </span>
          </div>
        </div>
        <button onClick={()=>onToggle("albumInfo")} className="p-3 rounded-xl border border-gray-200 hover:bg-gray-50">
          <Info className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};