// src/components/Form/DragFile.js

import { Upload } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const DragFile = ({
  id,
  label,
  note,
  required = false,
  fileData,
  setFileData = () => {},
  isPreview = false,
  isThumbnail = false,
  accept = "image/*,application/pdf",
}) => {
  const dropRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Generate preview URL
  useEffect(() => {
    if (fileData && isThumbnail && fileData.type.startsWith("image/")) {
      const url = URL.createObjectURL(fileData);
      setPreviewUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [fileData, isThumbnail]);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      setFileData(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    setFileData(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="space-y-4">
      {isThumbnail && isPreview && (
        <div className="size-20 rounded-lg overflow-hidden bg-gray-300 border border-neutral-400">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Thumbnail preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-300" />
          )}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor={id} className="text-sm font-semibold">
          {label}
          {required && <span className="text-danger-200">*</span>}
        </label>

        <div
          ref={dropRef}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className={`w-full flex flex-col items-center justify-center border border-dashed border-neutral-500 rounded-lg cursor-pointer hover:bg-neutral-200 transition ${
            isThumbnail ? "h-[125px] space-y-3" : "h-[189px] space-y-6"
          }`}
          onClick={() => dropRef.current.querySelector("input").click()}
        >
          <Upload
            className={` text-secondary ${
              isThumbnail ? "size-5" : "size-8 mb-2"
            }`}
          />
          <div className="space-y-1 text-center">
            <p className="text-sm">
              {fileData ? fileData.name : "Drag and drop files here"}
            </p>
            <span className="text-xs text-secondary">{note}</span>
            <input
              type="file"
              hidden
              onChange={handleFileSelect}
              accept={accept}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DragFile;
