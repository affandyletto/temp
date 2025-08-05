// src/context/SidebarContext.js

import { createContext, useContext, useState } from "react";

const MobileOnesnapContext = createContext();

export const MobileOnesnapProvider=({ children })=> {
  const [selectedOneSnap, setSelectedOneSnap] = useState(false);  
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  return (
    <MobileOnesnapContext.Provider value={{ 
      selectedOneSnap,
      setSelectedOneSnap,
      isBottomSheetOpen,
      setIsBottomSheetOpen,
      isBottomSheetVisible,
      setIsBottomSheetVisible
    }}>
      {children}
    </MobileOnesnapContext.Provider>
  );
}

export const useMobileOnesnap = () => useContext(MobileOnesnapContext);
