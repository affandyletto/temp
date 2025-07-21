import { Plus, Search, MoreVertical, ChevronRight, ArchiveRestore, Pencil, Trash2, X } from 'lucide-react'
import InputSearch from "@/components/Form/InputSearch";
import React, { useState } from 'react';
import ButtonSecondary from "@/components/Button/ButtonSecondary";
import DropdownMenu from "@/components/Dropdown/DropdownMenu";
import { v4 as uuidv4 } from "uuid";

export const HistorySidebar=()=>{
  const versions = [
    {
      id: 1,
      name: "Version 01",
      author: "Miftahul Faizin",
      date: "October 24, 2024, 10:30 AM",
      isCurrent: true
    },
    {
      id: 2,
      name: "Version 02", 
      author: "Miftahul Faizin",
      date: "October 23, 2024, 10:30 AM",
      isCurrent: false
    },
    {
      id: 3,
      name: "Version 03",
      author: "Miftahul Faizin", 
      date: "October 22, 2024, 10:30 AM",
      isCurrent: false
    },
    {
      id: 4,
      name: "Version 04",
      author: "Miftahul Faizin",
      date: "October 21, 2024, 10:30 AM", 
      isCurrent: false
    },
    {
      id: 5,
      name: "Version 05",
      author: "Miftahul Faizin",
      date: "October 20, 2024, 10:30 AM",
      isCurrent: false
    },
    {
      id: 6,
      name: "Version 06",
      author: "Miftahul Faizin",
      date: "October 19, 2024, 10:30 AM",
      isCurrent: false
    },
    {
      id: 7,
      name: "Version 07",
      author: "Miftahul Faizin", 
      date: "October 18, 2024, 10:30 AM",
      isCurrent: false
    },
    {
      id: 8,
      name: "Version 08",
      author: "Miftahul Faizin",
      date: "October 17, 2024, 10:30 AM",
      isCurrent: false
    },
    {
      id: 9,
      name: "Version 07",
      author: "Miftahul Faizin", 
      date: "October 18, 2024, 10:30 AM",
      isCurrent: false
    },
    {
      id: 10,
      name: "Version 08",
      author: "Miftahul Faizin",
      date: "October 17, 2024, 10:30 AM",
      isCurrent: false
    },
    {
      id: 11,
      name: "Version 07",
      author: "Miftahul Faizin", 
      date: "October 18, 2024, 10:30 AM",
      isCurrent: false
    },
    {
      id: 12,
      name: "Version 08",
      author: "Miftahul Faizin",
      date: "October 17, 2024, 10:30 AM",
      isCurrent: false
    }
  ]

  const [search, setSearch]=useState("")

  return (
    <div className="w-full h-screen bg-white border-r border-slate-200 flex flex-col relative">
      {/* Header */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-800">Version History</h2>
        </div>
        
        {/* Create New Version Button */}
        <button className="w-full px-6 py-3 bg-white border border-slate-200 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
          <Plus className="w-5 h-5 text-gray-800" />
          <span className="text-sm font-semibold text-gray-800">Create New Version</span>
        </button>
        
        {/* Search */}
        <div className="mt-4">
          <InputSearch
          placeholder={"Search element"}
          search={search}
          setSearch={setSearch}
        />
        </div>
      </div>

      {/* Version List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-0">
          {versions.map((version, index) => (
            <div key={version.id} className="flex gap-2 relative">
              {/* Timeline */}
              <div className="flex flex-col items-center px-1 relative">
                {/* Top connecting line */}
                {index > 0 && (
                  <div className="w-px h-full bg-slate-200 absolute"></div>
                )}
                
                {/* Circle positioned in middle of card */}
                <div className={`w-3 h-3 rounded-full border relative z-10 mt-10 ${
                  version.isCurrent 
                    ? 'bg-cyan-700 border-slate-200' 
                    : 'bg-slate-200 border-slate-300'
                }`}>
                </div>
                
                {/* Bottom connecting line */}
                {index < versions.length - 1 && (
                  <div className="w-px h-full bg-slate-200 absolute top-12"></div>
                )}
              </div>
              
              {/* Version Card */}
              <div className="flex-1 p-3 bg-white rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-gray-800">{version.name}</h3>
                      {version.isCurrent && (
                        <span className="px-2 py-0.5 bg-blue-50 text-cyan-700 text-xs rounded-full">
                          Current Version
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-800 mb-0.5">By {version.author}</p>
                    <p className="text-xs text-zinc-500">{version.date}</p>
                  </div>
                  
                  {!version.isCurrent && (
                   <DropdownMenu
	                  onOpen={() => {}}
	                  onClose={() => {}}
	                  border={false}
	                  menu={[	                    
	                    {
	                      id: uuidv4(),
	                      name: "Rename",
	                      icon: Pencil,
	                      onClick: () => setIsEditAlbumOpen(true),
	                    },
	                    {
	                      id: uuidv4(),
	                      name: "Restore",
	                      icon: ArchiveRestore,
	                      onClick: () => setIsGenerate(true),
	                    },
	                    {
	                      id: uuidv4(),
	                      name: "Delete",
	                      icon: Trash2,
	                      isRed: true,
	                      onClick: () => setIsDeleteOpen(true),
	                    },
	                  ]}
	                />
                  )}
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}