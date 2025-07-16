// src/components/Card/CardAlbumOneSnap.jsx

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import { FileText, Pencil, Share2, Trash2, Clock4, CircleUserRound } from "lucide-react";
import DropdownMenu from "@/components/Dropdown/DropdownMenu";
import ModalSubmitAlbum from "../Modal/ModalSubmitAlbum";
import ModalConfirm from "../Modal/ModalConfirm";
import ModalSubmitReportSnap from "../Modal/ModalSubmitReportSnap";
import ModalShare from "../Modal/ModalShare";
import { Link } from "react-router-dom";

const CardAlbumOneSnap = ({
  id,
  name,
  projectName,
  totalPhotos,
  image,
  createdBy,
  date,
  datetime,
  photos,
  linked = false,
  isLoading = false,
  onSelect
}) => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isGenerate, setIsGenerate] = useState(false);
  const [isEditAlbumOpen, setIsEditAlbumOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDelete = () => {
    setIsDeleteOpen(true);
  };

  // Skeleton loading component
  const renderSkeleton = () => (
    <div className="bg-white space-y-3 animate-pulse">
      {/* Thumbnail skeleton */}
      <div className="w-full h-[200px] bg-gray-200 rounded-lg"></div>
      
      {/* Title and photos count skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-32"></div>
          <div className="h-3 bg-gray-200 rounded w-20"></div>
        </div>
        <div className="w-6 h-6 bg-gray-200 rounded"></div>
      </div>
      
      <hr />
      
      {/* Metadata skeleton */}
      <div className="space-y-2">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
          <div className="h-2 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
          <div className="h-2 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  );

  // Function to render album thumbnail based on number of photos
  const renderAlbumThumbnail = () => {
    if (!photos || photos.length === 0) {
      // Fallback to original image if no photos array
      return (
        <img
          src={image}
          alt={`thumbnail-${id}`}
          className="w-full h-[200px] object-cover rounded-lg"
        />
      );
    }

    const photoCount = Math.min(photos.length, 4); // Max 4 photos for layout
    const albumPhotos = photos.slice(0, 4); // Take first 4 photos

    const albumContent = (
      <div className="w-full h-[200px] rounded-lg overflow-hidden bg-gray-100">
        {photoCount === 1 && (
          <img
            src={albumPhotos[0].image}
            alt={`photo-1`}
            className="w-full h-full object-cover"
          />
        )}
        
        {photoCount === 2 && (
          <div className="flex h-full gap-1">
            <img
              src={albumPhotos[0].image}
              alt={`photo-1`}
              className="w-1/2 h-full object-cover"
            />
            <img
              src={albumPhotos[1].image}
              alt={`photo-2`}
              className="w-1/2 h-full object-cover"
            />
          </div>
        )}
        
        {photoCount === 3 && (
          <div className="flex flex-col h-full gap-1">
            <img
              src={albumPhotos[0].image}
              alt={`photo-1`}
              className="w-full h-1/2 object-cover"
            />
            <div className="flex h-1/2 gap-1">
              <img
                src={albumPhotos[1].image}
                alt={`photo-2`}
                className="w-1/2 h-full object-cover"
              />
              <img
                src={albumPhotos[2].image}
                alt={`photo-3`}
                className="w-1/2 h-full object-cover"
              />
            </div>
          </div>
        )}
        
        {photoCount >= 4 && (
          <div className="flex flex-col h-full gap-1">
            <div className="flex h-1/2 gap-1">
              <img
                src={albumPhotos[0].image}
                alt={`photo-1`}
                className="w-1/2 h-full object-cover"
              />
              <img
                src={albumPhotos[1].image}
                alt={`photo-2`}
                className="w-1/2 h-full object-cover"
              />
            </div>
            <div className="flex h-1/2 gap-1">
              <img
                src={albumPhotos[2].image}
                alt={`photo-3`}
                className="w-1/2 h-full object-cover"
              />
              <img
                src={albumPhotos[3].image}
                alt={`photo-4`}
                className="w-1/2 h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
    );

    return linked ? (
      <div className="cursor-pointer" onClick={()=>onSelect(id)}>
        {albumContent}
      </div>
    ) : (
      albumContent
    );
  };

  // Return skeleton if loading
  if (isLoading) {
    return renderSkeleton();
  }

  return (
    <>
      <div className="bg-white space-y-3">
        {renderAlbumThumbnail()}
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base font-semibold">{name}</p>
            <span className="text-sm text-secondary">{totalPhotos} Photo</span>
          </div>
          <DropdownMenu
            onOpen={() => {}}
            onClose={() => {}}
            menu={[
              {
                id: uuidv4(),
                name: "Create Report",
                icon: FileText,
                onClick: () => setIsGenerate(true),
              },
              {
                id: uuidv4(),
                name: "Share",
                icon: Share2,
                onClick: () => setIsShareOpen(true),
              },
              {
                id: uuidv4(),
                name: "Edit",
                icon: Pencil,
                onClick: () => setIsEditAlbumOpen(true),
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
        </div>
        <hr />
        
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-[10px] text-secondary">
            <CircleUserRound className="size-3" />
            <span className="line-clamp-1">Created by {createdBy}</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-secondary">
            <Clock4 className="size-3" />
            <span>{datetime}</span>
          </div>
        </div>
      </div>

      <ModalShare
        title="Share Album"
        url="https://staging.d1wxnc4a3tpr3s.amplifyapp.com/gallery/iaGqq1"
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />
      <ModalSubmitReportSnap
        isOpen={isGenerate}
        onClose={() => setIsGenerate(false)}
      />
      <ModalSubmitAlbum
        isOpen={isEditAlbumOpen}
        onClose={() => setIsEditAlbumOpen(false)}
        data={{ id, name, totalPhotos, image }}
        isSnap={true}
      />
      <ModalConfirm
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title={`Do you want to delete ${name}?`}
        message="This file will be permanently deleted. You will not be able to recover it."
      />
    </>
  );
};

export default CardAlbumOneSnap;