import React, { useState } from 'react';
import { Check } from 'lucide-react';

export const CreateAlbum = ({onToggle}) => {
  const [activeTab, setActiveTab] = useState('create'); // 'create' or 'past'
  const [newAlbumName, setNewAlbumName] = useState('OneSnap Name-01');
  const [selectedAlbums, setSelectedAlbums] = useState(new Set(['Album-01']));

  const pastAlbums = [
    'Album-01',
    'Album-02', 
    'Album-03',
    'Album-04',
    'Album-05'
  ];

  const toggleAlbumSelection = (albumName) => {
    const newSelected = new Set(selectedAlbums);
    if (newSelected.has(albumName)) {
      newSelected.delete(albumName);
    } else {
      newSelected.add(albumName);
    }
    setSelectedAlbums(newSelected);
  };

  const handleCreateAlbum = () => {
    console.log('Creating album:', newAlbumName);
    // Handle album creation logic
  };

  const handleAddToSelected = () => {
    console.log('Adding to selected albums:', Array.from(selectedAlbums));
    // Handle adding to selected albums logic
  };

  return (
    <div className="self-stretch px-4 py-5 flex flex-col gap-4">
      {/* Tab Toggle */}
      <div className="self-stretch flex flex-col gap-6">
        <div className="self-stretch p-1 bg-slate-100 rounded-xl flex gap-0.5">
          <button
            onClick={() => setActiveTab('create')}
            className={`flex-1 px-2 py-1 rounded-lg flex justify-center items-center transition-all ${
              activeTab === 'create'
                ? 'bg-white shadow-[0px_8px_16px_0px_rgba(145,158,171,0.24)]'
                : ''
            }`}
          >
            <div className={`text-center text-sm font-normal font-['Inter'] leading-snug tracking-tight ${
              activeTab === 'create' ? 'text-gray-800' : 'text-zinc-500'
            }`}>
              Create New Album
            </div>
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`flex-1 px-2 py-1 rounded-lg flex justify-center items-center transition-all ${
              activeTab === 'past'
                ? 'bg-white shadow-[0px_8px_16px_0px_rgba(145,158,171,0.24)]'
                : ''
            }`}
          >
            <div className={`text-center text-sm font-normal font-['Inter'] leading-snug tracking-tight ${
              activeTab === 'past' ? 'text-gray-800' : 'text-zinc-500'
            }`}>
              Past Albums
            </div>
          </button>
        </div>

        {/* Content Area */}
        {activeTab === 'create' ? (
          // Create New Album View
          <div className="self-stretch flex flex-col gap-2">
            <div className="self-stretch min-h-12 p-4 bg-white rounded-xl border border-slate-200 flex items-center">
              <input
                type="text"
                value={newAlbumName}
                onChange={(e) => setNewAlbumName(e.target.value)}
                className="flex-1 text-gray-800 text-sm font-normal font-['Inter'] leading-snug tracking-tight bg-transparent outline-none"
                placeholder="Enter album name"
              />
            </div>
          </div>
        ) : (
          // Past Albums View
          <div className="self-stretch flex gap-2">
            <div className="flex-1 flex flex-col gap-2">
              {pastAlbums.map((album) => (
                <div
                  key={album}
                  className="self-stretch p-3 bg-slate-50 rounded-xl flex justify-between items-center gap-4 cursor-pointer hover:bg-slate-100 transition-colors"
                  onClick={() => toggleAlbumSelection(album)}
                >
                  <div className="flex-1 text-gray-800 text-sm font-semibold font-['Inter'] leading-snug tracking-tight">
                    {album}
                  </div>
                  <div className="flex justify-center items-center">
                    <div className="w-6 h-6 relative overflow-hidden">
                      {selectedAlbums.has(album) ? (
                        <div className="w-5 h-5 absolute top-0.5 left-0.5 bg-primary-200 rounded flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 absolute top-0.5 left-0.5 bg-zinc-500 rounded" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Simplified Scrollbar */}
            <div className="w-4 self-stretch bg-slate-100 rounded">
              <div className="w-3 h-8 mx-auto mt-4 bg-gray-300 rounded" />
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="self-stretch flex flex-col gap-2">
        <button
          onClick={activeTab === 'create' ? handleCreateAlbum : handleAddToSelected}
          className="self-stretch px-6 py-3 bg-primary-200 rounded-xl flex justify-center items-center hover:bg-cyan-800 transition-colors"
        >
          <div className="text-white text-sm font-semibold font-['Inter'] leading-snug tracking-tight">
            {activeTab === 'create' ? 'Create Album' : 'Add to Selected Album'}
          </div>
        </button>
        <button onClick={()=>onToggle("")} className="self-stretch px-6 py-3 bg-white rounded-xl border border-slate-200 flex justify-center items-center hover:bg-slate-50 transition-colors">
          <div className="text-gray-800 text-sm font-semibold font-['Inter'] leading-snug tracking-tight">
            Close
          </div>
        </button>
      </div>
    </div>
  );
};