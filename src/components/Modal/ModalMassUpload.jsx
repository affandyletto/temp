// src/components/Modal/ModalMassUpload.js

import { X } from "lucide-react";
import Modal from "./Modal";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import DragFile from "@/components/Form/DragFile";
import ButtonSecondary from "@/components/Button/ButtonSecondary";
import { useEffect, useState } from "react";

const ModalMassUpload = ({ isOpen, onClose }) => {
  const [fileData, setFileData] = useState(null);

  useEffect(() => {
    setFileData(null);
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleFileChange = (file) => {
    if (file) {
      setFileData(file);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} sizeModal="w-[936px]">
      <div>
        <div className="flex items-center justify-between border-b border-neutral-400 p-6">
          <h2 className="text-xl font-semibold">Edit Category</h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center"
          >
            <X className="size-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pb-6 pt-4 space-y-4">
          <DragFile
            id="upload_file"
            label="Select CSV"
            note=".csv up to 5MB"
            fileData={fileData}
            setFileData={handleFileChange}
            isThumbnail
            accept=".csv,text/csv"
          />

          <div className="flex justify-end space-x-2">
            <ButtonSecondary
              type={"button"}
              label={"Cancel"}
              onClick={onClose}
            />
            <ButtonPrimary type="submit" label="Submit" />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ModalMassUpload;
