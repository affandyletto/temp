import React, { useState, useEffect } from 'react';
import { Bell, Plus, Minus, Square } from 'lucide-react';
import { useMobile } from '@/context/Mobile/MobileContext';
import { CreateGallery } from '@/components/Mobile/OneSnap/CreateGallery';
import { EditGallery } from '@/components/Mobile/OneSnap/EditGallery';
import { EditAlbum } from '@/components/Mobile/OneSnap/EditAlbum';
import { Options } from '@/components/Mobile/OneSnap/Options';
import { PhotoSelection } from '@/components/Mobile/OneSnap/PhotoSelection';
import { CreateAlbum } from '@/components/Mobile/OneSnap/CreateAlbum';
import { AlbumOptions } from '@/components/Mobile/OneSnap/AlbumOptions';
import { PhotoAlbumOption } from '@/components/Mobile/OneSnap/PhotoAlbumOption';
import { AlbumInfo } from '@/components/Mobile/OneSnap/AlbumInfo';

// Bottom Sheet Component
export const BottomModal = ({ isSurvey = false }) => {
  const { isBottomSheetOpen, setIsBottomSheetOpen, setBottomModalType, bottomModalType, onToggle, setSelectionMode } = useMobile();
  
  // Only track entrance animation
  const [hasEntered, setHasEntered] = useState(false);
  
  useEffect(() => {
    if (isSurvey) {
      setBottomModalType('survey');
    }
  }, [isSurvey]);
  
  // Handle entrance animation only
  useEffect(() => {
    if ((isBottomSheetOpen || isSurvey) && !hasEntered) {
      // Artificial delay for entrance animation
      const enterTimer = setTimeout(() => {
        setHasEntered(true);
      }, 100);
      return () => clearTimeout(enterTimer);
    }
    
    // Reset entrance state when modal closes
    if (!isBottomSheetOpen && !isSurvey) {
      setHasEntered(false);
    }
  }, [isBottomSheetOpen, isSurvey, hasEntered]);

  // Check if modal should be visible
  const isModalVisible = isBottomSheetOpen || isSurvey;
  
  // Determine if overlay should be shown (exclude photoSelection and survey)
  const shouldShowOverlay = isModalVisible && !isSurvey && bottomModalType !== "photoSelection";

  return (
    <>
      {/* Overlay backdrop - hidden for photoSelection */}
      {shouldShowOverlay && (
        <div 
          className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-10 ${
            hasEntered ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={onToggle}
        />
      )}
      
      {/* Bottom Modal */}
      <div 
        className={`fixed bottom-0 left-0 right-0 mx-auto bg-white border-t rounded-t-3xl border-slate-200 transition-all duration-300 z-20 ${
          (isBottomSheetOpen && isSurvey) ? 'h-[430px]' : isSurvey ? 'h-8' : !isBottomSheetOpen ? 'h-0' : ''
        } ${
          hasEntered ? 'transform translate-y-0 opacity-100' : 'transform translate-y-full opacity-0'
        }`}
      >
        {(isSurvey || isBottomSheetOpen) && (
          <div className="px-3 pt-4 flex justify-center">
            <button 
              onClick={onToggle}
              className="w-20 h-1 bg-zinc-700 rounded-full"
            />
          </div>
        )}
        
        {isBottomSheetOpen && bottomModalType === "survey" && (
          <div className="flex-1 p-2 flex justify-center items-center relative">
            <img 
              src="/images/sample-floor-plan.webp" 
              alt="Floor Plan"
              className="w-full h-[430px] object-cover rounded-lg"
            />
            <div className="absolute bottom-12 right-4 p-2 bg-black/0 rounded-xl border border-slate-100 flex flex-col gap-2">
              <button className="p-2 bg-primary-200 rounded-lg flex items-center justify-center">
                <Plus className="w-4 h-4 text-white" />
              </button>
              <button className="p-2 bg-primary-200 rounded-lg flex items-center justify-center">
                <Minus className="w-4 h-4 text-white" />
              </button>
              <button className="p-2 bg-primary-200 rounded-lg flex items-center justify-center">
                <Square className="w-4 h-4 text-white fill-white" />
              </button>
            </div>
          </div>
        )}
        
        {bottomModalType === "createGallery" ? (
          <CreateGallery />
        ) : bottomModalType === "editGallery" ? (
          <EditGallery />
        ) : bottomModalType === "editAlbum" ? (
          <EditAlbum />
        ): bottomModalType === "options" ? (
          <Options />
        ): bottomModalType === "photoSelection"?(
          <PhotoSelection onToggle={onToggle} setSelectionMode={setSelectionMode} />
        ):bottomModalType === "albumOptions"?
        	<AlbumOptions />
        :bottomModalType === "photoAlbumOption"?
        	<PhotoAlbumOption />
        :bottomModalType === "albumInfo"?
        	<AlbumInfo />
        :bottomModalType === "createAlbum"?
        	<CreateAlbum onToggle={onToggle}/>:
        (
          <></>
        )}

        
      </div>
    </>
  );
};