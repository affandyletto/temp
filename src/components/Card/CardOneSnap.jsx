// src/components/Card/CardPhoto.jsx
import { CircleUserRound, Clock4, Check, MoreVertical, Calendar, User, MessageCircle, Edit, Info, Archive, Trash2 } from "lucide-react";
import DropdownMenu from "@/components/Dropdown/DropdownMenu";
import { useState } from "react";
import ModalConfirm from "../Modal/ModalConfirm";
import ModalInfoOneSnap from "@/components/Modal/ModalInfoOneSnap";
import { v4 as uuidv4 } from "uuid";

export const CardOneSnap = ({
  id,
  data,
  selectMode = false,
  isSelected = false,
  onSelect = () => {},
  openingComment,
  isLoading
}) => {

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const handleDelete=()=>{
    setIsDeleteOpen(false)
  }

  const handleArchive=()=>{
    setIsArchiveOpen(false)
  }

  const handleEdit=()=>{
    setIsInfoOpen(false)
  }

  // Skeleton loading state
  if (isLoading) {
    return (
      <div className="relative bg-white border border-neutral-400 rounded-lg p-2 animate-pulse">
        {/* Skeleton image */}
        <div className="w-full h-[190px] bg-gray-200 rounded-lg mb-2"></div>
        
        <div className="space-y-2">
          <div>
            {/* Skeleton title */}
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
            {/* Skeleton subtitle */}
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
          
          <hr />
          
          <div className="space-y-1">
            {/* Skeleton datetime */}
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-20"></div>
            </div>
            {/* Skeleton uploaded by */}
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
          
          <hr className="border-gray-200" />
          
          {/* Skeleton action buttons */}
          <div className="flex gap-1">
            <div className="h-7 bg-gray-200 rounded-full w-20"></div>
            <div className="h-7 bg-gray-200 rounded-full w-16"></div>
            <div className="h-7 bg-gray-200 rounded-full w-14"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative bg-white border cursor-pointer ${
        isSelected ? "border-primary-200" : "border-neutral-400"
      } rounded-lg p-2` }
      onClick={(e) => {
        if (selectMode) {
          e.stopPropagation();
          onSelect?.();
        }
      }}
    >
      {/* Checkbox in select mode */}
      {selectMode && (
        <div className="absolute top-4 right-4 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect?.();
            }}
            className={`size-8 rounded-lg border border-neutral-200 flex items-center justify-center bg-white `}
          >
            {isSelected && (
              <div className="flex items-center justify-center bg-primary-200 rounded-md size-4">
                <Check className="text-white size-3" />
              </div>
            )}
          </button>
        </div>
      )}

      {/* More options button */}
      {!selectMode && (
        <div className="absolute top-4 right-4 z-10">
          <button
            type="button"
            className="size-8 rounded-lg border border-neutral-200 flex items-center justify-center bg-white hover:bg-gray-50"
          >
            <MoreVertical className="size-4" />
            <DropdownMenu
              onOpen={() => {}}
              onClose={() => {}}
              menu={[
                {
                  id: uuidv4(),
                  name: "Archive",
                  icon: Archive,
                  onClick: () => setIsArchiveOpen(true),
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
          </button>
        </div>
      )}

      <img
        src={data.image}
        alt={`thumbnail-${id}`}
        className="relative w-full h-[190px] object-cover rounded-lg mb-2"
      />
      
      <div className="space-y-2">
        <div>
          <p className="text-sm font-semibold">{data.name}</p>
          <span className="text-xs text-secondary">
            Element ID: {data.elementId} | {data.cameraName}
          </span>
        </div>
        
        <hr />
        
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-[11px] text-secondary">
            <Clock4 className="size-3" />
            <span>{data.datetime}</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-secondary">
            <CircleUserRound className="size-3" />
            <span className="line-clamp-1">Uploaded by {data.uploadedBy}</span>
          </div>
        </div>
        
        <hr className="border-gray-200" />
        
        {/* Action Buttons */}
        <div className="flex gap-1">
          <button className="px-2 py-1 rounded-full border border-gray-200 hover:bg-gray-50 flex items-center gap-1"
          onClick={()=>openingComment(data)}>
            <MessageCircle className="w-4 h-4" />
            <span className="text-xs text-gray-800">Comment</span>
          </button>
          <button className="px-2 py-1 rounded-full border border-gray-200 hover:bg-gray-50 flex items-center gap-1"
          onClick={()=>setIsInfoOpen(true)}>
            <Edit className="w-4 h-4" />
            <span className="text-xs text-gray-800">Edit</span>
          </button>
          <button className="px-2 py-1 rounded-full border border-gray-200 hover:bg-gray-50 flex items-center gap-1" 
            onClick={()=>setIsInfoOpen(true)}>
            <Info className="w-4 h-4" />
            <span className="text-xs text-gray-800">Info</span>
          </button>
        </div>
      </div>

      <ModalInfoOneSnap
        data={data}
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        onConfirm={handleEdit}
      />

      <ModalConfirm
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title={`Do you want to delete this photo ?`}
        message="This photo will be permanently deleted. You will not be able to recover it."
      />

      <ModalConfirm
        isOpen={isArchiveOpen}
        onClose={() => setIsArchiveOpen(false)}
        onConfirm={handleArchive}
        title={`Archive Photo`}
        message="Do you want to archive this Photo ?"
      />
    </div>
  );
};