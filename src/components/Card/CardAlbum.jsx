// src/components/Card/CardAlbum.jsx

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import { FileText, Pencil, Share2, Trash2 } from "lucide-react";
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
  return (
    <>
      <div className="bg-white space-y-3">
        {linked ? (
          <Link to={`/projects/${projectId}/all-albums/${id}`}>
            <img
              src={image}
              alt={`thumbnail-${id}`}
              className="w-full h-[200px] object-cover rounded-lg"
            />
          </Link>
        ) : (
          <img
            src={image}
            alt={`thumbnail-${id}`}
            className="w-full h-[200px] object-cover rounded-lg"
          />
        )}
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
