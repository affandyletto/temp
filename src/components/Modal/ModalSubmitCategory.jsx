// src/components/Modal/ModalSubmitCategory.jsx

import { X } from "lucide-react";
import Modal from "./Modal";
import Input from "@/components/Form/Input";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import DragFile from "@/components/Form/DragFile";
import ButtonSecondary from "@/components/Button/ButtonSecondary";
import Select from "../Form/Select";
import { optionsElemetSuperCategories } from "@/data/dropdown";
import { useEffect, useState } from "react";

const ModalSubmitCategory = ({
  isOpen,
  onClose,
  data = null,
  onSubmit = () => {},
}) => {
  const [categoryName, setCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [fileData, setFileData] = useState(null);

  useEffect(() => {
    if (data) {
      setCategoryName(data?.name || "");
      setSelectedCategory(data?.superCategory || "");
    }
  }, [data]);

  useEffect(() => {
    setFileData(null);
  }, [isOpen]);

  const handleSelect = (value) => {
    setCategoryName(value);
    setSelectedCategory(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...data,
      name: categoryName,
      superCategory: selectedCategory,
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
            {data ? "Edit" : "Add"} Category
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
            id="category_name"
            label="Category Name"
            placeholder="Input category name"
            value={data?.name}
            required
          />
          <Select
            id="select_supercategory"
            label="Select Super Category"
            placeholder="Select super category"
            options={optionsElemetSuperCategories}
            value={categoryName}
            onChange={handleSelect}
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

export default ModalSubmitCategory;
