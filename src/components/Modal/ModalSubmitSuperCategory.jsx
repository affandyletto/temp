// src/components/Modal/ModalSubmitSuperCategory.jsx

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Modal from "./Modal";
import Input from "@/components/Form/Input";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import DragFile from "@/components/Form/DragFile";
import ButtonSecondary from "@/components/Button/ButtonSecondary";

const ModalSubmitSuperCategory = ({
  isOpen,
  onClose,
  data = null,
  onSubmit = () => {},
}) => {
  const [superName, setSuperName] = useState("");
  const [fileData, setFileData] = useState(null);

  useEffect(() => {
    if (data) {
      setSuperName(data.name || "");
    }
  }, [data]);

  useEffect(() => {
    setFileData(null);
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...data,
      name: superName,
    });
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
          <h2 className="text-xl font-semibold">
            {data ? "Edit" : "Add"} Super Category
          </h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center"
          >
            <X className="size-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pb-6 pt-4 space-y-4">
          <Input
            id="super_category_name"
            label="Super Category Name"
            placeholder="Input super category name"
            value={data?.name}
            required
          />

          <DragFile
            id="upload_file"
            label="Thumbnail"
            note=".png, .jpg up to 5MB"
            fileData={fileData}
            setFileData={handleFileChange}
            accept="image/*"
            isPreview
            isThumbnail={data}
            required
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

export default ModalSubmitSuperCategory;
