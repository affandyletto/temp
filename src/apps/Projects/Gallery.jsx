// src/apps/Projects/Gallery.jsx

import { useEffect, useState } from "react";
import { mockPhotos, mockAlbums } from "@/data/floorplan";
import { ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import CardPhoto from "@/components/Card/CardPhoto";
import CardAlbum from "@/components/Card/CardAlbum";
import SkeletonCard from "@/components/Skeleton/SkeletonCard";

const Gallery = () => {
  // Loading
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const { id: projectId } = useParams();
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);

  useEffect(() => {
    setFilteredPhotos(mockPhotos.slice(0, 8));
    setFilteredAlbums(mockAlbums.slice(0, 4));
  }, []);

  return (
    <>
      {isLoading ? (
        <SkeletonCard />
      ) : (
      <div className="space-y-8">
        {/* Photos Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <h2 className="text-xl font-semibold">Photos</h2>
              </div>
            </div>

            <Link
              to={`/projects/${projectId}/all-photos`}
              className="flex items-center justify-center gap-2 text-sm font-semibold text-primary-200"
            >
              <span>All Photos</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {filteredPhotos.map(({ id, ...rest }) => (
              <CardPhoto key={id} id={id} {...rest} />
            ))}
          </div>
        </div>

        {/* Albums Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <h2 className="text-xl font-semibold">Albums</h2>
              </div>
            </div>

            <Link
              to={`/projects/${projectId}/all-albums`}
              className="flex items-center justify-center gap-2 text-sm font-semibold text-primary-200"
            >
              <span>All Albums</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {filteredAlbums.map(({ id, ...rest }) => (
              <CardAlbum key={id} id={id} {...rest} />
            ))}
          </div>
        </div>

        <div className="h-48" />
      </div>
      )}
    </>
  );
};

export default Gallery;
