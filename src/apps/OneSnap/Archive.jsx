// src/apps/Projects/Gallery.jsx
import { useEffect, useState } from "react";
import { mockPhotos, mockAlbums } from "@/data/floorplan";
import { ArrowRight, X, ImagePlus, Trash2, Archive, FileText } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { CardOneSnap } from "@/components/Card/CardOneSnap";
import SkeletonCard from "@/components/Skeleton/SkeletonCard";
import ModalSubmitAlbumSnap from "@/components/Modal/ModalSubmitAlbumSnap";
import ButtonThird from "@/components/Button/ButtonThird";
import CommentSection from "@/components/Section/CommentSection";

export const OneSnapArchive = () => {
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
                  <h2 className="text-xl font-semibold">Archive</h2>
                  <div data-option="Default" data-show-action-arrow_up-outline="true" data-show-icon="true" data-truncate="false" data-type="Secondary" data-variant="Opsi 1" className="px-2 py-0.5 bg-blue-50 rounded-[999px] inline-flex justify-center items-center gap-2.5">
                    <div className="justify-start text-cyan-700 text-[10px] font-normal font-['Inter'] leading-none tracking-tight">{filteredPhotos?.length} Archived</div>
                  </div>
                </div>
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
                  openingComment={openingComment}
                  isLoading={isLoading}
                  isArchived={true}
                />
              ))}
            </div>
          </div>
          <div className="h-48" />
        </div>
      

      <CommentSection 
        data={selectedPhoto}
        isOpen={isCommentOpen} 
        onClose={() => setIsCommentOpen(false)} 
      />

      <ModalSubmitAlbumSnap
        isOpen={isCreateAlbumOpen}
        onClose={() => setIsCreateAlbumOpen(false)}
      />
    </>
  );
};