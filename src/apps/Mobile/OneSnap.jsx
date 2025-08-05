import { Plus, X } from 'lucide-react';
import React, { useState } from 'react';
import InputSearch from "@/components/Form/InputSearch";
import { useMobile } from '@/context/Mobile/MobileContext';
import { useNavigate, useLocation } from 'react-router-dom';

export const OneSnap = () => {
	const { onToggle }=useMobile()
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateGallery, setShowCreateGallery] = useState(false);
  const [galleryTitle, setGalleryTitle] = useState('');
  const navigate = useNavigate();
  
  const projects = [
    {
      id: 1,
      name: "OneSnap name 01",
      client: "No Client",
      type: "Design",
      projectId: "#25629114"
    },
    {
      id: 2,
      name: "OneSnap name 02",
      client: "No Client",
      type: "Design",
      projectId: "#00000001"
    },
    {
      id: 3,
      name: "OneSnap name 03",
      client: "Tech Corp",
      type: "UI/UX",
      projectId: "#12345678"
    }
  ];
  
  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleOnesnapClick = (project) => {
  	navigate(`/oneSnap/${project.id}`)
  };

  const handleSave = () => {
    console.log('Gallery created:', galleryTitle);
    setGalleryTitle('');
    setShowCreateGallery(false);
  };

  const handleCancel = () => {
    setGalleryTitle('');
    setShowCreateGallery(false);
  };
  
  return (
    <div className="space-y-6 mt-200">
      {/* Welcome Section */}
      <div>
        <div className="text-gray-800 text-lg font-semibold mt-5 mb-[-5px]">Start Snapping</div>
      </div>
      
      {/* Search Bar */}
      <div className="w-full">
        <InputSearch
          placeholder={"Search projects..."}
          search={searchTerm}
          setSearch={setSearchTerm}
        />
      </div>
      
      {/* Projects List */}
      <div className="space-y-3">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div 
              key={project.id} 
              onClick={() => handleOnesnapClick(project)}
              className="w-full p-4 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-start hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <div className="flex-1 min-w-0">
                <div className="text-black text-sm font-semibold mb-1 truncate">{project.name}</div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-gray-600 truncate">{project.client}</span>
                  <div className="w-1 h-1 bg-zinc-400 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-800 truncate">{project.type}</span>
                </div>
              </div>
              <div className="px-2 py-1 bg-blue-50 rounded-full ml-3 flex-shrink-0">
                <span className="text-primary-200 text-xs font-medium">{project.projectId}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="text-zinc-400 text-sm">No projects found</div>
          </div>
        )}
      </div>
      
      {/* Plus Button - Bottom Right */}
      <button 
        onClick={() => {
        	onToggle('createGallery')
        }}
        className="absolute bottom-[100px] right-4 p-4 bg-primary-200 rounded-2xl inline-flex justify-center items-center hover:bg-primary-300 transition-colors shadow-lg"
      >
        <Plus className="w-5 h-5 text-white" />
      </button>
    </div>
  );
};