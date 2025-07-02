// src/apps/Projects/Album.jsx

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, FileText, Pencil, Share2, Trash2, X } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { mockAlbums } from "@/data/floorplan";
import DropdownMenu from "@/components/Dropdown/DropdownMenu";
import ModalShare from "@/components/Modal/ModalShare";
import ModalGeneratePdf from "@/components/Modal/ModalGeneratePdf";
import ModalSubmitAlbum from "@/components/Modal/ModalSubmitAlbum";
import ModalConfirm from "@/components/Modal/ModalConfirm";
import CardPhoto from "@/components/Card/CardPhoto";
import ButtonSecondary from "@/components/Button/ButtonSecondary";
import SkeletonDefault from "@/components/Skeleton/SkeletonDefault";

const Album = () => {
  // Loading
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const { id: projectId, albumId } = useParams();
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    const data = mockAlbums.find(
      (item) => item.id.toString() === albumId.toString()
    );
    setAlbum(data);
  }, [albumId]);

  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isGenerate, setIsGenerate] = useState(false);
  const [isEditAlbumOpen, setIsEditAlbumOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleteAlbumOpen, setIsDeleteAlbumOpen] = useState(false);

  const handleDelete = () => {
    setIsDeleteOpen(true);
  };

  const handleDeleteAlbum = () => {
    setIsDeleteAlbumOpen(true);
  };

  const [selectMode, setSelectMode] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  const handleSelectMode = () => {
    if (selectMode) {
      setSelectedPhotos([]);
    }
    setSelectMode(!selectMode);
  };

  const handleSelectPhoto = (id) => {
    setSelectedPhotos((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  return (
    <>
      {isLoading ? (
        <SkeletonDefault />
      ) : (
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Link
                  to={`/projects/${projectId}/all-albums`}
                  className="flex items-center"
                >
                  <ArrowLeft className="size-7" />
                </Link>
                <div className="flex items-center gap-1">
                  <h2 className="text-xl font-semibold">Album-01</h2>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {selectedPhotos.length > 0 && (
                  <ButtonSecondary
                    icon={Trash2}
                    type={"button"}
                    label={"Remove Photo From Album"}
                    isRed
                    onClick={() => setIsDeleteAlbumOpen(true)}
                  />
                )}
                <button
                  type="button"
                  onClick={handleSelectMode}
                  className={`flex items-center gap-1 rounded-full border text-sm py-2 px-4 ${
                    selectMode
                      ? "bg-primary-100 border-primary-100 text-primary-200"
                      : "bg-white border-neutral-400 "
                  }`}
                >
                  <span>
                    {selectMode
                      ? `${selectedPhotos.length} Photo Selected`
                      : "Select Photo"}
                  </span>
                  {selectMode && <X className="size-5" />}
                </button>
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

            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-neutral-400">
              <div className="space-y-1">
                <div className="flex items-center text-base">
                  <p className="font-semibold w-40">Name</p>
                  <p className="text-secondary">{album?.name}</p>
                </div>
                <div className="flex items-center text-base">
                  <p className="font-semibold w-40">Category</p>
                  <p className="text-secondary">{album?.category}</p>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-base">
                  <p className="font-semibold w-40">Crated By</p>
                  <p className="text-secondary">{album?.createdBy}</p>
                </div>
                <div className="flex items-center text-base">
                  <p className="font-semibold w-40">Date Created</p>
                  <p className="text-secondary">{album?.datetime}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-5">
              {album?.photos?.map(({ id, ...rest }) => (
                <CardPhoto
                  key={id}
                  id={id}
                  {...rest}
                  selectMode={selectMode}
                  isSelected={selectedPhotos.includes(id)}
                  onSelect={() => handleSelectPhoto(id)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <ModalShare
        title="Share Album"
        url="https://staging.d1wxnc4a3tpr3s.amplifyapp.com/gallery/iaGqq1"
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />
      <ModalGeneratePdf
        isOpen={isGenerate}
        onClose={() => setIsGenerate(false)}
        data={album}
      />
      <ModalSubmitAlbum
        isOpen={isEditAlbumOpen}
        onClose={() => setIsEditAlbumOpen(false)}
        data={album}
      />
      <ModalConfirm
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title={`Do you want to delete ${album?.name}?`}
        message="This file will be permanently deleted. You will not be able to recover it."
      />
      <ModalConfirm
        isOpen={isDeleteAlbumOpen}
        onClose={() => setIsDeleteAlbumOpen(false)}
        onConfirm={handleDeleteAlbum}
        title={`Do you want to remove the pictures from this album?`}
        message="This action will remove the selected pictures from the album. They won’t be deleted from your gallery"
      />
    </>
  );
};

export default Album;
