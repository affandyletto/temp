import { Plus, Search, MoreVertical, ChevronRight, ArchiveRestore, Pencil, Trash2, History, X } from 'lucide-react'
import InputSearch from "@/components/Form/InputSearch";
import React, { useState, useEffect } from 'react';
import ButtonSecondary from "@/components/Button/ButtonSecondary";
import DropdownMenu from "@/components/Dropdown/DropdownMenu";
import { v4 as uuidv4 } from "uuid";
import { useUrlParams } from "@/hooks/useUrlParams";
import { useProject } from '@/context/ProjectContext';
import { useMap } from '@/context/MapContext';
import BasicFormModal from '@/components/Modal/BasicFormModal'
import ModalConfirm from '@/components/Modal/ModalConfirm'
import ModalHistory from '@/components/Modal/ModalHistory'

import { useNavigate } from "react-router-dom";

export const HistorySidebar=({versionParam})=>{
  const navigate = useNavigate();
  const {
    surveys, 
    selectedSurvey, 
    setSurveys,
    renameVersion,
    deleteVersion,
    handleHistoryClick
} = useProject()

const {
  addVersion,
  restoreVersion,
} = useMap()

  const { toggleParameter, getParam } = useUrlParams();
  const [versions, setVersions] = useState([])
  const [selectedVersion, setSelectedVersion] = useState(null)
  const [search, setSearch]=useState("")
  const [modals, setModals]=useState({
    add:false,
    rename:false
  })

  useEffect(()=>{
    var surveyys=surveys.filter(x=>x.name===selectedSurvey?.name)
    setVersions(surveyys)
  },[surveys])

  const changeVersion=(version)=>{
    var qq=getParam('version')
    if(qq){
      navigate(`/survey/${version?.id}?version=${version?.versionName}`)
    }else{
      navigate(`/survey/${version?.id}`)
    }
  }

  const handleAddVersion=async(name)=>{
    const newsurv=await addVersion(name)
    changeVersion(newsurv)
    var newVers=versions.find(x=>x.id===newsurv.id)
    setSelectedVersion(newVers)
    setModals({...modals, add:false})
  }

  const handleRename=(name)=>{
    renameVersion(selectedVersion.id, name)
    setModals({...modals, rename:false})
  }

  const handleRestore=(name)=>{
    restoreVersion(name, selectedVersion)
    navigate(`/survey/${selectedVersion?.id}?version=${selectedVersion?.versionName}`)
    setModals({...modals, restore:false})
  }

  const handleDelete=()=>{
    deleteVersion(selectedVersion?.id)
  }

  return (
    <>
    <div className="w-full h-screen bg-white border-r border-slate-200 flex flex-col relative">
      {/* Header */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-800">Version History</h2>
          <button
            onClick={handleHistoryClick}
            className="p-1 hover:bg-slate-100 rounded"
          >
            <X className="w-5 h-5 text-zinc-500" />
          </button>
        </div>
        
        {/* Create New Version Button */}
        <button onClick={()=>setModals({...modals, add:true})} className="w-full px-6 py-3 bg-white border border-slate-200 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
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
      <div className="flex-1 overflow-y-auto px-4">
        <div className="space-y-0">
          {versions.map((version, index) => (
            <div key={version.id} className="flex gap-2 relative cursor-pointer" onClick={()=>changeVersion(version)}>
              {/* Timeline */}
              <div className="flex flex-col items-center px-1 relative">
                {/* Top connecting line */}
                {index > 0 && (
                  <div className="w-px h-full bg-slate-200 absolute"></div>
                )}
                
                {/* Circle positioned in middle of card */}
                <div className={`w-3 h-3 rounded-full border relative z-10 mt-10 ${
                  version.versionName===selectedSurvey?.versionName
                    ? 'bg-primary-200 border-slate-200' 
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
                      <h3 className="text-sm font-semibold text-gray-800">{version.versionName}</h3>
                      {version.mainVersion && (
                        <span className="px-2 py-0.5 bg-blue-50 text-primary-200 text-xs rounded-full">
                          Current Version
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-800 mb-0.5">By {version.author}</p>
                    <p className="text-xs text-zinc-500">{version.date}</p>
                  </div>
                  
                  <DropdownMenu
                    onOpen={() => {setSelectedVersion(version)}}
                    onClose={() => {}}
                    border={false}
                    menu={[                     
                      {
                        id: uuidv4(),
                        name: "Rename",
                        icon: Pencil,
                        onClick:()=>setModals({...modals, rename:true}),
                      },{
                        id: uuidv4(),
                        name: "Audit Log",
                        icon: History,
                        onClick: () => setModals({...modals, history:true}),
                      },
                      ...(!version.mainVersion ? [
                        {
                          id: uuidv4(),
                          name: "Restore",
                          icon: ArchiveRestore,
                          onClick:()=>setModals({...modals, restore:true}),
                        },
                        {
                          id: uuidv4(),
                          name: "Delete",
                          icon: Trash2,
                          isRed: true,
                          onClick:()=>setModals({...modals, delete:true}),
                        }
                      ] : [])
                    ]}
                  />
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <BasicFormModal
      header="Create New Version"
      label = "Version Name"
      placeholder = "Input version name"
      isOpen={modals.add}
      onClose={() => setModals({...modals, add:false})}
      onSubmit={handleAddVersion}
    />
    <BasicFormModal
      header="Rename Version"
      label = "Version Name"
      placeholder = "Input version name"
      initialValue={selectedVersion?.versionName}
      isOpen={modals.rename}
      onClose={() => setModals({...modals, rename:false})}
      onSubmit={handleRename}
    />

    <BasicFormModal
      header="Restore Version"
      label = "Version Name"
      placeholder = "Input version name"
      initialValue={selectedVersion?.versionName}
      isOpen={modals.restore}
      onClose={() => setModals({...modals, restore:false})}
      onSubmit={handleRestore}
    />

    <ModalHistory
        isOpen={modals.history}
        onClose={() => setModals({...modals, history:false})}
        onSubmit={handleRestore}
    />

    <ModalConfirm
        isOpen={modals.delete}
        onClose={() => setModals({...modals, delete:false})}
        onConfirm={handleDelete}
        title={`Do you want to delete this Version?`}
        message="This version will be permanently deleted. You will not be able to recover it."
      />
    </>
  )
}