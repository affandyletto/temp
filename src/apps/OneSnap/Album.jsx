// src/apps/Projects/Gallery.jsx
import { useEffect, useState } from "react";
import { mockPhotos, mockAlbums } from "@/data/floorplan";
import { ArrowRight, X, ImagePlus, Trash2, Archive, FileText, ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import CardAlbumOneSnap from "@/components/Card/CardAlbumOneSnap";
import SkeletonCard from "@/components/Skeleton/SkeletonCard";
import ModalSubmitAlbumSnap from "@/components/Modal/ModalSubmitAlbumSnap";
import ButtonThird from "@/components/Button/ButtonThird";
import CommentSection from "@/components/Section/CommentSection";

import { CardOneSnap } from "@/components/Card/CardOneSnap";


export const OneSnapGalleryAlbum = () => {
  // Loading
  const [isLoading, setIsLoading] = useState(true);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [layer, setLayer] = useState("album")
  const [selectedAlbum, setSelectedAlbum] = useState(null)
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const { id: projectId } = useParams();
  const [filteredAlbums, setFilteredAlbums] = useState([]);

  useEffect(() => {
    setFilteredAlbums(mockAlbums.slice(0, 8));
  }, []);

  const onSelect=(id)=>{
    var valbum=filteredAlbums.find(x=>x.id===id)
    setSelectedAlbum(valbum)
    setLayer('photos')
  }

  const openingComment=(data)=>{
    setSelectedPhoto(data)
    setIsCommentOpen(true)
  }

  const allAlbumBack=()=>{
    setLayer("album")
    setSelectedAlbum(null)
  }

  return (
    <>
        <div className="space-y-8">
          {/* Photos Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                {layer==="album"?
                  <div className="flex items-center gap-1">
                    <h2 className="text-xl font-semibold">Albums</h2>
                    <div data-option="Default" data-show-action-arrow_up-outline="true" data-show-icon="true" data-truncate="false" data-type="Secondary" data-variant="Opsi 1" className="px-2 py-0.5 bg-blue-50 rounded-[999px] inline-flex justify-center items-center gap-2.5">
                      <div className="justify-start text-primary-200 text-[10px] font-normal font-['Inter'] leading-none tracking-tight">{filteredAlbums?.length} Photos</div>
                    </div>
                  </div>
                :
                  <div className="flex items-center gap-1">
                    <ArrowLeft onClick={allAlbumBack} className="size-7 cursor-pointer" />
                    <h2 className="text-xl font-semibold">{selectedAlbum?.name}</h2>
                    <div data-option="Default" data-show-action-arrow_up-outline="true" data-show-icon="true" data-truncate="false" data-type="Secondary" data-variant="Opsi 1" className="px-2 py-0.5 bg-blue-50 rounded-[999px] inline-flex justify-center items-center gap-2.5">
                      <div className="justify-start text-primary-200 text-[10px] font-normal font-['Inter'] leading-none tracking-tight">{selectedAlbum?.photos?.length} Photos</div>
                    </div>
                  </div>
                }
                

              </div>
            </div>

            {layer==="album"?
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {filteredAlbums.map(({ id, ...rest }) => (
                  <CardAlbumOneSnap 
                     key={id} id={id} {...rest} linked isLoading={isLoading} onSelect={onSelect}
                  />
                ))}
              </div>
            :
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {selectedAlbum?.photos.map((photo, index) => (
                  <CardOneSnap 
                    key={photo.id} 
                    id={photo.id}
                    data={photo}
                    openingComment={openingComment}
                    isLoading={isLoading}
                    isAlbum={true}
                  />
                ))}
              </div>
            }

          </div>
          <div className="h-48" />
        </div>

        <CommentSection 
          data={selectedPhoto}
          isOpen={isCommentOpen} 
          onClose={() => setIsCommentOpen(false)} 
        />
    </>
  );
};