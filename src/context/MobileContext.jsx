// src/context/SidebarContext.js

import { createContext, useContext, useState } from "react";

const MobileContext = createContext();

export const MobileProvider=({ children })=> {
  const [selectedProject, setSelectedProject] = useState(false);  
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  return (
    <MobileContext.Provider value={{ 
      selectedProject,
      setSelectedProject,
      isBottomSheetOpen,
      setIsBottomSheetOpen
    }}>
      {children}
    </MobileContext.Provider>
  );
}

export const useMobile = () => useContext(MobileContext);
