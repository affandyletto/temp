import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useMobileSurvey } from "@/context/Mobile/MobileSurveyContext"

export const TopnavDetail = ({surveyId}) => {
  const navigate = useNavigate();
  const { projectId } = useParams();  
  const { selectedElement, setSelectedElement } =useMobileSurvey()

  const handleBack = () => {
    if(selectedElement){
      setSelectedElement(null)
      navigate(`/survey/${surveyId}`)
    }else{      
      navigate('/projects');
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
              {projectId}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};