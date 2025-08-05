// src/context/SidebarContext.js

import { createContext, useContext, useState } from "react";

const MobileContext = createContext();

export const MobileProvider=({ children })=> {
  const [selectedProject, setSelectedProject] = useState(false);  
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [bottomModalType, setBottomModalType] = useState('survey');
  const [confModal, setConfModal] = useState({title:"", content:"", submitButton:"", isShow:false})
  const [selectionMode, setSelectionMode] = useState(false);

  const onToggle=(type)=>{
		setBottomModalType(type||'survey')
		if(type==="createAlbum"||type==="editAlbum"){
			setIsBottomSheetOpen(true)
		}else{
			setIsBottomSheetOpen(!isBottomSheetOpen)
			setSelectionMode(!selectionMode)
			setSelectedPhotos([])
		}		
	}

  return (
    <MobileContext.Provider value={{ 
      selectedProject,
      setSelectedProject,
      isBottomSheetOpen,
      setIsBottomSheetOpen,
      isBottomSheetVisible,
      setIsBottomSheetVisible,
      bottomModalType,
      setBottomModalType,
      onToggle,
      selectionMode,
      setSelectionMode,
      selectedPhotos, 
      setSelectedPhotos,
      confModal,
      setConfModal
    }}>
      {children}
    </MobileContext.Provider>
  );
}

export const useMobile = () => useContext(MobileContext);
