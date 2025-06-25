// src/components/Form/DragFile.js

import { Upload } from "lucide-react";
import { useRef } from "react";

const DragFile = ({
  id,
  label,
  note,
  required = false,
  fileData,
  setFileData,
}) => {
  const dropRef = useRef(null);

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
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
        {required && <span className="text-danger-200">*</span>}
      </label>
      <div
        ref={dropRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="w-full h-[189px] flex flex-col items-center justify-center space-y-6 border border-dashed border-neutral-500 rounded-lg cursor-pointer hover:bg-neutral-200 transition"
        onClick={() => dropRef.current.querySelector("input").click()}
      >
        <Upload className="size-8 text-secondary mb-2" />
        <div className="space-y-1 text-center">
          <p className="text-sm">
            {fileData ? fileData.name : "Drag and drop files here"}
          </p>
          <span className="text-xs text-secondary">{note}</span>
          <input
            type="file"
            hidden
            onChange={handleFileSelect}
            accept="image/*,application/pdf"
          />
        </div>
      </div>
    </div>
  );
};

export default DragFile;
