// src/apps/Projects/Attachment.jsx

import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { attachmentItems } from "@/data/floorplan";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import ToggleView from "@/components/Toggle/ToggleView";
import TableAttachment from "@/components/Table/TableAttachment";
import GridAttachment from "@/components/Grid/GridAttachment";
import ModalUploadFile from "@/components/Modal/ModalUploadFile";
import SkeletonDefault from "@/components/Skeleton/SkeletonDefault";

const Attachment = () => {
  // Loading
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const [isEnabled, setIsEnabled] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileData, setFileData] = useState(null);

  const handleUpload = () => {
    if (!fileName || !fileData) return;
    console.log("Uploading:", { fileName, fileData });
    setIsOpen(false);
    setFileName("");
    setFileData(null);
  };

  return (
    <>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <ButtonPrimary
              icon={Plus}
              label={"Add File"}
              onClick={() => setIsOpen(true)}
            />
            <ToggleView value={isEnabled} onChange={setIsEnabled} />
          </div>

          {isEnabled ? (
            <TableAttachment isLoading={isLoading} items={attachmentItems} />
          ) : (
            <GridAttachment isLoading={isLoading} items={attachmentItems} />
          )}
        </div>
      
      <ModalUploadFile
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleUpload}
        fileName={fileName}
        setFileName={setFileName}
        fileData={fileData}
        setFileData={setFileData}
      />
    </>
  );
};

export default Attachment;
