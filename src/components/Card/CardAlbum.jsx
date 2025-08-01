// src/components/Card/CardAlbum.jsx

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import { FileText, Pencil, Share2, Trash2, Clock4, CircleUserRound } from "lucide-react";
import DropdownMenu from "@/components/Dropdown/DropdownMenu";
import ModalSubmitAlbum from "../Modal/ModalSubmitAlbum";
import ModalConfirm from "../Modal/ModalConfirm";
import ModalGeneratePdf from "../Modal/ModalGeneratePdf";
import ModalShare from "../Modal/ModalShare";
import { Link } from "react-router-dom";

const CardAlbum = ({
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
}) => {
  const { id: projectId } = useParams();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isGenerate, setIsGenerate] = useState(false);
  const [isEditAlbumOpen, setIsEditAlbumOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDelete = () => {
    setIsDeleteOpen(true);
  };

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
      <Link to={`/projects/${projectId}/all-albums/${id}`}>
        {albumContent}
      </Link>
    ) : (
      albumContent
    );
  };

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
                name: "Generate PDF",
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
      <ModalGeneratePdf
        isOpen={isGenerate}
        onClose={() => setIsGenerate(false)}
        data={{
          id,
          name,
          projectName,
          totalPhotos,
          image,
          createdBy,
          date,
          photos,
        }}
      />
      <ModalSubmitAlbum
        isOpen={isEditAlbumOpen}
        onClose={() => setIsEditAlbumOpen(false)}
        data={{ id, name, totalPhotos, image }}
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

export default CardAlbum;