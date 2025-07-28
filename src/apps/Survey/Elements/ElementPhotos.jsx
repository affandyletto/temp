import React, { useState, useEffect, useRef } from 'react';
import { Move, ChevronRight, Search, Camera, Upload, MoreVertical, Clock, User, ChevronLeft, Check } from 'lucide-react';
import { useMap } from '@/context/MapContext';

const StageSelector = ({ onSelect, onClose }) => {
  const stages = [
    { id: 'profile', name: 'Profile', hasIcon: true },
    { id: 'predesign', name: 'Pre-Design', hasIcon: false },
    { id: 'takeoff', name: 'Take Off', hasIcon: false },
    { id: 'design', name: 'Design', hasIcon: false },
    { id: 'deployment', name: 'Deployment', hasIcon: false },
    { id: 'livebuilt', name: 'LiveBuilt', hasIcon: false }
  ];

  const handleStageSelect = (stageId) => {
    onSelect(stageId);
    onClose();
  };

  return (
    <div className="absolute w-48 p-3 -left-[200px] -top-[110px] bg-white rounded-xl shadow-lg border border-slate-100 flex flex-col gap-0.5 z-10">
      {stages.map((stage) => (
        <div 
          key={stage.id}
          className="p-3 bg-white rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-150 flex items-center gap-2"
          onClick={() => handleStageSelect(stage.id)}
        >
          <div className="flex-1">
            <div className="text-sm font-normal text-gray-800">{stage.name}</div>
          </div>
          {stage.hasIcon && (
            <Check className="w-5 h-5 text-black" />
          )}
        </div>
      ))}
    </div>
  );
};

const ContextMenu = ({ position, onClose }) => {
  const [showMoveDropdown, setShowMoveDropdown] = useState(false);
  const [showStageDropdown, setShowStageDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCameraId, setSelectedCameraId] = useState(null);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Wait for animation to complete before calling onClose
    setTimeout(onClose, 150);
  };

  const handleCameraSelect = (cameraId) => {
    setSelectedCameraId(cameraId);
  };

  const handleStageSelect = (stageId) => {
    console.log('Selected stage:', stageId);
    // Handle stage selection logic here
  };

  const cameras = [
    { id: 1, name: 'Camera-01', element: 'Element-01' },
    { id: 2, name: 'Camera-02', element: 'Element-01' },
    { id: 3, name: 'Camera-03', element: 'Element-01' },
    { id: 4, name: 'Camera-04', element: 'Element-01' },
    { id: 5, name: 'Camera-05', element: 'Element-01' },
    { id: 6, name: 'Camera-04', element: 'Element-01' },
    { id: 7, name: 'Camera-05', element: 'Element-01' },
    { id: 8, name: 'Camera-04', element: 'Element-01' },
    { id: 9, name: 'Camera-05', element: 'Element-01' },
  ];

  const filteredCameras = cameras.filter(camera => 
    camera.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    camera.element.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div 
      className={`fixed inset-0 z-50 transition-all duration-150 ${
        isVisible ? 'bg-black bg-opacity-0' : 'bg-black bg-opacity-0'
      }`}
      onClick={handleClose}
    >
      <div 
        className={`absolute w-48 p-3 bg-white rounded-xl shadow-lg border border-slate-100 flex flex-col gap-0.5 transition-all duration-150 origin-top-left ${
          isVisible 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 -translate-y-2'
        }`}
        style={{ left: position.x, top: position.y }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-3 bg-white rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-150">
          <div className="text-sm font-normal text-gray-800">Open</div>
        </div>
        <div className="p-3 bg-white rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-150">
          <div className="text-sm font-normal text-gray-800">Annotate</div>
        </div>
        <div 
          className={`p-3 ${showMoveDropdown ? 'bg-blue-50' : 'bg-white'} rounded-lg hover:bg-gray-50 cursor-pointer flex items-center gap-2 transition-colors duration-150`}
          onClick={() => {
            setShowMoveDropdown(!showMoveDropdown);
            setShowStageDropdown(false);
          }}
        >
          <ChevronLeft className={`w-5 h-5 transition-transform duration-200 ${showMoveDropdown ? 'rotate-90' : ''}`} />
          <div className="text-sm font-normal text-gray-800">Move Photo</div>
        </div>
        <div 
          className={`p-3 ${showStageDropdown ? 'bg-blue-50' : 'bg-white'} rounded-lg hover:bg-gray-50 cursor-pointer flex items-center gap-2 transition-colors duration-150`}
          onClick={() => {
            setShowStageDropdown(!showStageDropdown);
            setShowMoveDropdown(false);
          }}
        >
          <ChevronLeft className={`w-5 h-5 transition-transform duration-200 ${showStageDropdown ? 'rotate-90' : ''}`} />
          <div className="text-sm font-normal text-gray-800">Change Stage</div>
        </div>
        <div className="p-3 bg-white rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-150">
          <div className="text-sm font-normal text-red-600">Delete</div>
        </div>

        {showMoveDropdown && (
          <div className="absolute w-72 p-3 -left-[295px] -top-[110px] bg-white rounded-xl shadow-lg border flex flex-col gap-3 z-10">
            <div className="p-4 bg-white rounded-xl border border-slate-200 flex items-center gap-2">
              <Search className="w-5 h-5 text-zinc-500" />
              <input
                type="text"
                placeholder="Search element"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 text-sm bg-transparent outline-none"
              />
            </div>
            <div className="flex gap-2">
              <div className="flex-1 flex flex-col gap-1 max-h-64 overflow-y-auto">
                {filteredCameras.map((camera) => (
                  <div 
                    key={camera.id} 
                    className="pb-2 pt-1 border-b border-slate-200 flex items-center gap-2.5 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded"
                    onClick={() => handleCameraSelect(camera.id)}
                  >
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <Camera className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-800">{camera.name}</div>
                      <div className="text-xs text-zinc-500">{camera.element}</div>
                    </div>
                    {selectedCameraId === camera.id && (
                      <Check className="w-5 h-5 text-zinc-500 ml-auto mr-1" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            {selectedCameraId ? (
              <div 
               className="px-5 py-3 bg-blue-500 rounded-lg inline-flex justify-center items-center gap-2 cursor-pointer hover:bg-blue-600 transition-colors"
                onClick={() => {
                  console.log('Moving to camera:', selectedCameraId);
                }}
              >
                <div className="justify-start text-white text-xs font-semibold font-['Inter'] leading-tight tracking-tight">Move</div>
              </div>
            ) : (
              <button disabled className="px-5 py-2 bg-zinc-200 rounded-lg">
                <span className="text-xs font-semibold text-zinc-500">Move</span>
              </button>
            )}
          </div>
        )}

        {showStageDropdown && (
          <StageSelector 
            onSelect={handleStageSelect}
            onClose={() => setShowStageDropdown(false)}
          />
        )}
      </div>
    </div>
  );
};

export const ElementPhotos = ({isHistory}) => {
  const [contextMenu, setContextMenu] = useState(null);
  const [photos, setPhotos] = useState(null);
  const fileInputRef = useRef(null);
  const {
    selectedElement,
    uploadPhoto
  } = useMap();
  
  useEffect(()=>{
    if(selectedElement?.photos){
      setPhotos(selectedElement?.photos)
    }
  },[selectedElement])
  
  const handleMoreClick = (event) => {
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    setContextMenu({
      x: rect.right - 190,
      y: rect.top + 20
    });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      // Validate that all files are images
      const invalidFiles = files.filter(file => !file.type.startsWith('image/'));
      if (invalidFiles.length > 0) {
        alert('Please select only image files');
        return;
      }
      
      // Call the uploadPhoto function with each selected file with delay
      for (const file of files) {
        uploadPhoto(selectedElement.id, file);
        // Add delay between uploads (adjust milliseconds as needed)
        await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay
      }
      
      // Reset the input value so the same files can be selected again if needed
      event.target.value = '';
    }
  };

  return (
    <>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
      
      {/* Photos Section Header */}
      {!isHistory &&        
        <div className="flex justify-between items-center">
          <h2 className="text-base font-semibold text-gray-800">Photos</h2>
          <button 
            className="px-5 py-2 bg-white border border-slate-200 rounded-lg flex items-center gap-2 hover:bg-slate-50 transition-colors duration-150"
            onClick={handleUploadClick}
          >
            <Upload className="w-4 h-4 text-gray-800" />
            <span className="text-xs font-semibold text-gray-800">Upload</span>
          </button>
        </div>
      }
      
      {/* Photo Cards */}
      <div className="flex flex-col gap-3">
        {photos?.map((photo, index) => (
          <div key={index} className="bg-white border border-gray-300 rounded-xl transition-all duration-200 hover:shadow-md">
            {/* Image Container */}
            <div className="p-2 relative">
              <img 
                className="w-full h-44 bg-gray-200 rounded-lg object-cover" 
                src={photo?.picture}
                alt="Camera capture"
              />
              {!isHistory &&                
                <button 
                  className="absolute top-4 right-4 p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all duration-150 hover:scale-105"
                  onClick={handleMoreClick}
                >
                  <MoreVertical className="w-4 h-4 text-gray-800" />
                </button>
              }
            </div>
            {/* Photo Info */}
            <div className="px-3 pb-3">
              <div className="flex flex-col gap-2">
                {/* Title and ID */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">{photo?.name}</h3>
                  <p className="text-xs text-zinc-500">Element ID: {photo?.elementId} | {photo?.elementName}</p>
                </div>
                <hr className="border-slate-200" />
                {/* Metadata */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-zinc-500" />
                    <span className="text-xs text-zinc-500">05/21/2025 11:37 AM PDT</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3 text-zinc-500" />
                    <span className="text-xs text-zinc-500">Uploaded by River Admin Stewart</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {contextMenu && (
        <ContextMenu 
          position={contextMenu}
          onClose={() => setContextMenu(null)}
        />
      )}
    </>
  );
};