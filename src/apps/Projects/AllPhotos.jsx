// src/apps/Projects/AllPhotos.jsx

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";
import { mockPhotos } from "@/data/floorplan";
import { useTab } from "@/context/TabContext";
import ModalSubmitAlbum from "@/components/Modal/ModalSubmitAlbum";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import DropdownFilter from "@/components/Dropdown/DropdownFilter";
import CardPhoto from "@/components/Card/CardPhoto";
import SkeletonDefault from "@/components/Skeleton/SkeletonDefault";

const AllPhotos = () => {
  // Loading
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const { id: projectId } = useParams();
  const { setTabValue } = useTab();
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [selectMode, setSelectMode] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  useEffect(() => {
    setTabValue("gallery");
    setFilteredPhotos(mockPhotos);
  }, [setTabValue]);

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

  // Create Album
  const [isCreateAlbumOpen, setIsCreateAlbumOpen] = useState(false);

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
                  to={`/projects/${projectId}`}
                  className="flex items-center"
                >
                  <ArrowLeft className="size-7" />
                </Link>
                <div className="flex items-center gap-1">
                  <h2 className="text-xl font-semibold">All Photos</h2>
                  <span className="bg-primary-100 text-xs text-primary-200 px-2 py-0.5 rounded-full">
                    {filteredPhotos.length}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {selectMode && selectedPhotos.length > 0 && (
                  <ButtonPrimary
                    label={"Create Album"}
                    onClick={setIsCreateAlbumOpen}
                  />
                )}
                {selectMode && (
                  <button
                    type="button"
                    onClick={handleSelectAllPhotos}
                    className="flex items-center gap-2 bg-white rounded-lg border border-neutral-400 text-sm font-semibold py-2 px-5"
                  >
                    <span>
                      {selectedPhotos.length === filteredPhotos.length
                        ? "Unselect All"
                        : "Select All"}
                    </span>
                  </button>
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

                <DropdownFilter
                  onChange={(filters) => {
                    const isFiltered = Object.values(filters).some((val) => {
                      if (typeof val === "object") {
                        return val?.start || val?.end;
                      }
                      return val !== "";
                    });

                    if (isFiltered) {
                      setFilteredPhotos([]); // simulate no result
                    } else {
                      setFilteredPhotos(mockPhotos); // reset to all
                    }
                  }}
                />
              </div>
            </div>

            {filteredPhotos.length === 0 ? (
              <div className="col-span-4 space-y-1 text-center py-32">
                <p className="text-sm font-semibold">No Photos Found</p>
                <span className="text-xs text-secondary">
                  We couldn’t find any photos matching your filter. Try
                  adjusting your filter options or upload new photos.
                </span>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {filteredPhotos?.map(({ id, ...rest }) => (
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
            )}
          </div>
        </div>
      )}

      <ModalSubmitAlbum
        totalItem={selectedPhotos.length}
        isOpen={isCreateAlbumOpen}
        onClose={() => setIsCreateAlbumOpen(false)}
      />
    </>
  );
};

export default AllPhotos;
