// src/apps/Projects/Gallery.jsx
import { useEffect, useState } from "react";
import { mockPhotos, mockAlbums } from "@/data/floorplan";
import { ArrowRight, X, ImagePlus, Trash2, Archive, FileText } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { CardOneSnap } from "@/components/Card/CardOneSnap";
import SkeletonCard from "@/components/Skeleton/SkeletonCard";
import ModalSubmitAlbum from "@/components/Modal/ModalSubmitAlbum";
import ButtonThird from "@/components/Button/ButtonThird";
import CommentSection from "@/components/Section/CommentSection";

export const OneSnapGallery = () => {
  // Loading
  const [isLoading, setIsLoading] = useState(true);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const { id: projectId } = useParams();
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [selectMode, setSelectMode] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  useEffect(() => {
    setFilteredPhotos(mockPhotos.slice(0, 8));
  }, []);

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

  const handleSelectAllPhotos = () => {
    if (selectedPhotos.length === filteredPhotos.length) {
      setSelectedPhotos([]);
    } else {
      setSelectedPhotos(filteredPhotos.map((photo) => photo.id));
    }
  };

  const openingComment=(data)=>{
    setSelectedPhoto(data)
    setIsCommentOpen(true)
  }

  const [isCreateAlbumOpen, setIsCreateAlbumOpen] = useState(false);

  return (
    <>
        <div className="space-y-8">
          {/* Photos Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <h2 className="text-xl font-semibold">Gallery</h2>
                  <div data-option="Default" data-show-action-arrow_up-outline="true" data-show-icon="true" data-truncate="false" data-type="Secondary" data-variant="Opsi 1" class="px-2 py-0.5 bg-blue-50 rounded-[999px] inline-flex justify-center items-center gap-2.5">
                    <div class="justify-start text-cyan-700 text-[10px] font-normal font-['Inter'] leading-none tracking-tight">{filteredPhotos?.length} Photos</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
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

                {selectMode && (
                  <button
                    type="button"
                    onClick={handleSelectAllPhotos}
                    className="flex items-center gap-2 bg-white border border-neutral-400 hover:border-primary-200 active:border-primary-300 text-sm py-2 px-5 rounded-full"
                  >
                    <span>
                      {selectedPhotos.length === filteredPhotos.length
                        ? "Unselect All"
                        : "Select All"}
                    </span>
                  </button>
                )}

                {selectMode && selectedPhotos.length > 0 && (
                  <>
                  <ButtonThird
                    icon={ImagePlus}
                    label={"Create Album"}
                    onClick={() => setIsCreateAlbumOpen(true)}
                    rounded={true}
                  />

                  <ButtonThird
                    icon={FileText}
                    label={"Create Report"}
                    onClick={() => setIsCreateAlbumOpen(true)}
                    rounded={true}
                  />

                  <ButtonThird
                    icon={Archive}
                    label={"Archive"}
                    onClick={() => setIsCreateAlbumOpen(true)}
                    rounded={true}
                  />

                  <ButtonThird
                    icon={Trash2}
                    label={"Delete"}
                    onClick={() => setIsCreateAlbumOpen(true)}
                    rounded={true}
                    isRed={true}
                  />
                  </>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {filteredPhotos.map((photo, index) => (
                <CardOneSnap 
                  key={photo.id} 
                  id={photo.id}
                  data={photo}
                  selectMode={selectMode}
                  isSelected={selectedPhotos.includes(photo.id)}
                  onSelect={() => handleSelectPhoto(photo.id)}
                  openingComment={openingComment}
                  isLoading={isLoading}
                />
              ))}
            </div>
          </div>
          <div className="h-48" />
        </div>
      )

      <CommentSection 
        data={selectedPhoto}
        isOpen={isCommentOpen} 
        onClose={() => setIsCommentOpen(false)} 
      />

      <ModalSubmitAlbum
        totalItem={selectedPhotos.length}
        isOpen={isCreateAlbumOpen}
        onClose={() => setIsCreateAlbumOpen(false)}
      />
    </>
  );
};