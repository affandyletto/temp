import { ArrowLeft, Plus } from 'lucide-react';
import { useState } from 'react';
import { useMobile } from '@/context/Mobile/MobileContext';
import { CardAlbum } from "@/components/Mobile/OneSnap/CardAlbum";
import { CardPhoto } from "@/components/Mobile/OneSnap/CardPhoto";

export const OneSnapDetail = () => {
  const { onToggle, selectionMode, setSelectionMode, selectedPhotos, setSelectedPhotos } = useMobile();
  const [activeTab, setActiveTab] = useState('Gallery');

  const tabs = ['Gallery', 'Albums', 'Archived'];

  // Sample photo data - replace with your actual data source
  const photos = [
    {
      id: 'photo1',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      label: 'OneSnap Label',
      description: 'OneSnap Description Example',
      uploadDate: '05/21/2025 11:37 AM PDT',
      uploadedBy: 'Miftahul',
      hasNotification: true
    },
    {
      id: 'photo2',
      imageUrl: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop',
      label: 'OneSnap Label',
      description: 'OneSnap Description Example',
      uploadDate: '05/21/2025 11:37 AM PDT',
      uploadedBy: 'Miftahul',
      hasNotification: false
    }
  ];

  const toggleSelectionMode = () => {
    setSelectionMode(!selectionMode);
    if (selectionMode) {
      setSelectedPhotos([]);
    } else {
      onToggle("photoSelection");
    }
  };

  const togglePhotoSelection = (photoId) => {
    if (!selectionMode) return;
    setSelectedPhotos(prev => 
      prev.includes(photoId) 
        ? prev.filter(id => id !== photoId)
        : [...prev, photoId]
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Gallery':
        return (
          <>
            {/* Gallery Header */}
            <div className="px-5 py-6 flex items-center gap-2">
              <h2 className="text-xl font-semibold text-black">Gallery</h2>
              <div className="px-1.5 py-0.5 bg-blue-50 rounded-full">
                <span className="text-xs text-primary-200">{photos.length}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-5 mb-6 flex gap-2">
              <button 
                onClick={toggleSelectionMode}
                className={`px-4 py-2 rounded-full text-sm ${
                  selectionMode 
                    ? 'bg-blue-50 text-primary-200' 
                    : 'border border-gray-200 text-gray-800'
                }`}
              >
                {selectionMode ? `${selectedPhotos.length} Photo Selected` : 'Select Photo'}
              </button>
              <button className="px-4 py-2 border border-gray-200 rounded-full text-sm text-gray-800 flex items-center gap-1">
                <Plus className="w-5 h-5" />
                Upload Photo
              </button>
            </div>

            {/* Photo Grid */}
            <div className="px-5 grid grid-cols-2 gap-4">
              {photos.map((photo) => (
                <CardPhoto
                  key={photo.id}
                  photo={photo}
                  selectionMode={selectionMode}
                  isSelected={selectedPhotos.includes(photo.id)}
                  onToggleSelection={togglePhotoSelection}
                  onOptionsClick={() => onToggle("options")}
                />
              ))}
            </div>
          </>
        );

      case 'Albums':
        return (
          <>
            <div className="px-5 mt-5">
              <div className="inline-flex items-center gap-2">
                <h2 className="text-xl font-semibold text-black">Albums</h2>
                <div className="px-1.5 py-0.5 bg-blue-50 rounded-full">
                  <span className="text-[10px] font-normal text-primary-200">2</span>
                </div>
              </div>
            </div>
            <div className="px-5 text-center">
              <CardAlbum/>
              <CardAlbum/>
            </div>
          </>
        );

      case 'Archived':
        return (
          <div className="px-5 py-12 text-center">
            <div className="max-w-xs mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowLeft className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No Archived Photos</h3>
              <p className="text-sm text-gray-500">Photos you archive will appear here</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full bg-white">
      {/* Tabs */}
      <div className="px-5 mt-4 border-b border-gray-200">
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex flex-col items-center gap-2 pb-3 focus:outline-none"
            >
              <span className={`text-sm ${
                activeTab === tab ? 'text-primary-200' : 'text-gray-800'
              } transition-colors`}>
                {tab}
              </span>
              <div className={`w-full h-1 rounded-t-xl transition-colors ${
                activeTab === tab ? 'bg-primary-200' : 'bg-transparent'
              }`}></div>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};