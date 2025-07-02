// src/apps/Projects/AllAlbums.jsx

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { mockAlbums } from "@/data/floorplan";
import ModalShare from "@/components/Modal/ModalShare";
import ModalGeneratePdf from "@/components/Modal/ModalGeneratePdf";
import ModalSubmitAlbum from "@/components/Modal/ModalSubmitAlbum";
import CardAlbum from "@/components/Card/CardAlbum";
import { useTab } from "@/context/TabContext";
import SkeletonDefault from "@/components/Skeleton/SkeletonDefault";

const AllAlbums = () => {
  // Loading
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const { id: projectId } = useParams();
  const { setTabValue } = useTab();
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    setTabValue("gallery");
    setAlbum(mockAlbums);
  }, [setTabValue]);

  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isGenerate, setIsGenerate] = useState(false);
  const [isEditAlbumOpen, setIsEditAlbumOpen] = useState(false);

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
                  <h2 className="text-xl font-semibold">All Albums</h2>
                  <span className="bg-primary-100 text-xs text-primary-200 px-2 py-0.5 rounded-full">
                    {album?.length}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-5">
              {album?.map(({ id, ...rest }) => (
                <CardAlbum key={id} id={id} {...rest} linked />
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
    </>
  );
};

export default AllAlbums;
