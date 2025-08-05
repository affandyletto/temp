import { Search, BarChart3, Camera, Image, Signal, Wifi, Battery } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputSearch from "@/components/Form/InputSearch";

export const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  const projects = [
    {
      id: 1,
      name: "Mif First Project",
      client: "No Client",
      type: "Design",
      projectId: "#25629114"
    },
    {
      id: 2,
      name: "Project-001",
      client: "No Client",
      type: "Design",
      projectId: "#00000001"
    },
    {
      id: 3,
      name: "Mobile App Design",
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

  const handleProjectClick = (project) => {
    navigate(`/projects/${project.id}`);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <div className="text-zinc-500 text-xs">Welcome to</div>
        <div className="text-gray-800 text-xl font-semibold mt-1 mb-[-5px]">Mif Organization</div>
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
              onClick={() => handleProjectClick(project)}
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
    </div>
  );
};
