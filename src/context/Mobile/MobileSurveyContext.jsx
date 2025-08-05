// src/context/SidebarContext.js

import { createContext, useContext, useState } from "react";

const MobileSurveyContext = createContext();

export const MobileSurveyProvider=({ children })=> {
	const [selectedSurvey, setSelectedSurvey] = useState(null)
  const [selectedElement, setSelectedElement] = useState(null)

  return (
    <MobileSurveyContext.Provider value={{ 
    	selectedElement,
    	setSelectedElement,
    	selectedSurvey,
    	setSelectedSurvey
    }}>
      {children}
    </MobileSurveyContext.Provider>
  );
}

export const useMobileSurvey = () => useContext(MobileSurveyContext);
