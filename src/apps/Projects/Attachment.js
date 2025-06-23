// src/apps/Projects/Attachment.js

import { Plus } from "lucide-react";
import { useState } from "react";
import { attachmentItems } from "../../data/floorplan";
import ButtonPrimary from "../../components/Button/ButtonPrimary";
import ToggleView from "../../components/ToggleView";
import TableAttachment from "../../components/Table/TableAttachment";
import GridAttachment from "../../components/Grid/GridAttachment";
import ModalUploadFile from "../../components/Modal/ModalUploadFile";

const Attachment = () => {
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
          <TableAttachment items={attachmentItems} />
        ) : (
          <GridAttachment items={attachmentItems} />
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
