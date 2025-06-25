// src/components/Modal/ModalUploadFile.js

import { useState } from "react";
import { Image, X } from "lucide-react";
import Modal from "./Modal";
import Input from "@/components/Form/Input";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import DragFile from "@/components/Form/DragFile";
import ButtonSecondary from "@/components/Button/ButtonSecondary";

const ModalUploadFile = ({
  isOpen,
  onClose,
  onSubmit,
  fileName,
  setFileName,
  fileData,
  setFileData,
}) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadTime, setUploadTime] = useState(0);

  const simulateUpload = () => {
    let progress = 0;
    let time = 0;
    const interval = setInterval(() => {
      progress += 10;
      time += 1;
      setUploadProgress(progress);
      setUploadTime(time);
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 300);
  };

  const formatSize = (bytes) => {
    const kb = bytes / 1024;
    return kb < 1024 ? `${kb.toFixed(1)} KB` : `${(kb / 1024).toFixed(1)} MB`;
  };

  const handleFileChange = (file) => {
    if (file) {
      setFileName(file);
      setFileData(file);
      setUploadProgress(0);
      simulateUpload();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} sizeModal="w-[936px]">
      <div>
        <div className="flex items-center justify-between border-b border-neutral-400 p-6">
          <h2 className="text-xl font-semibold">Add File</h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center"
          >
            <X className="size-6" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="px-6 pb-6 pt-4 space-y-4"
        >
          <Input
            id="file_name"
            label="File Name"
            placeholder="Input file name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            required
          />

          <DragFile
            id="upload_file"
            label="Upload File"
            note=".png, .jpg, .pdf up to 5MB"
            fileData={fileData}
            setFileData={handleFileChange}
          />

          {fileData && (
            <div className="border border-neutral-400 rounded-lg space-y-3 p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <Image className="size-10 text-secondary" />
                  <div className="pt-1">
                    <p className="text-sm font-semibold leading-none">
                      {fileData.name}
                    </p>
                    <div className="space-x-2.5">
                      <span className="text-xs text-secondary">
                        {formatSize(fileData.size)}
                      </span>
                      {uploadProgress < 100 && (
                        <>
                          <span className="text-xs text-secondary">•</span>
                          <span className="text-xs text-secondary">
                            {uploadTime} second{uploadTime > 1 ? "s" : ""} left
                          </span>
                          <span className="text-xs text-secondary">•</span>
                          <span className="text-xs text-secondary">
                            {uploadProgress}%
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setFileData(null)}
                  className="flex items-center justify-center"
                >
                  <X className="size-5" />
                </button>
              </div>

              {uploadProgress < 100 && (
                <div className="w-full h-2 bg-neutral-300 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-200 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <ButtonSecondary
              type={"button"}
              label={"Cancel"}
              onClick={onClose}
            />
            <ButtonPrimary type="submit" label="Save" />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ModalUploadFile;
