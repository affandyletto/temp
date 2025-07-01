// src/components/Modal/ModalAddElement.jsx

import { Plus, X } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import {
  optionsElemetCategories,
  optionsElemetClassifications,
  optionsElemetInformation,
} from "@/data/dropdown";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import Input from "@/components/Form/Input";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import DragFile from "@/components/Form/DragFile";
import ButtonSecondary from "@/components/Button/ButtonSecondary";
import Select from "@/components/Form/Select";
import InputColorCode from "@/components/Form/InputColorCode";
import DraggableFieldInformation from "@/components/Form/DraggableFieldInformation";
import DraggablePartList from "@/components/Form/DraggablePartList";

const ModalAddElement = ({
  isOpen,
  onClose,
  data = null,
  onSubmit = () => {},
}) => {
  const [categoryName, setCategoryName] = useState("");
  const [fileData, setFileData] = useState(null);
  const [classificationName, setClassificationName] = useState("");

  useEffect(() => {
    setFileData(null);
  }, [isOpen]);

  // Classification
  const handleClassification = (value) => {
    setClassificationName(value);
  };

  const handleSelect = (value) => {
    setCategoryName(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const handleFileChange = (file) => {
    if (file) {
      setFileData(file);
    }
  };

  // Add Part
  const [parts, setParts] = useState([]);
  const handleAdd = () => {
    setParts((prev) => [
      ...prev,
      {
        id: uuidv4(),
        name: "",
        description: "",
      },
    ]);
  };

  // Add Accessory
  const [accessory, setAccessory] = useState([]);
  const handleAccessory = () => {
    setAccessory((prev) => [
      ...prev,
      {
        id: uuidv4(),
        name: "",
        description: "",
      },
    ]);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} sizeModal="w-[936px]" isScroll>
      <div>
        <div className="flex items-center justify-between border-b border-neutral-400 p-6">
          <h2 className="text-xl font-semibold">
            {data ? "Edit" : "Add"} Element
          </h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center"
          >
            <X className="size-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pb-6 pt-4 space-y-8">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                id="element_name"
                label="Element Name"
                placeholder="Input element name"
                required
              />
              <Select
                id="select_category"
                label="Select Category"
                placeholder="Select category"
                options={optionsElemetCategories}
                value={categoryName}
                onChange={handleSelect}
                required
              />
            </div>

            <DragFile
              id="upload_file"
              label="Thumbnail"
              note=".png, .jpg up to 5MB"
              fileData={fileData}
              setFileData={handleFileChange}
              accept="image/*"
              isThumbnail
              required
            />
            <Select
              id="select_classification"
              label="Select Classification"
              placeholder="Select classification"
              options={optionsElemetClassifications}
              value={classificationName}
              onChange={handleClassification}
              required
            />

            <div className="grid grid-cols-3 gap-6">
              <Input
                id="angle"
                label="Angle"
                type="number"
                value="0"
                placeholder="Input angle"
                padding="pl-7"
                spanComponent={<sup>o</sup>}
                required
              />
              <Input
                id="depth"
                label="Depth"
                type="number"
                value="0"
                placeholder="Input depth"
                padding="pl-14"
                spanComponent={<strong>Feet</strong>}
                required
              />
              <Input
                id="opacity"
                label="Opacity"
                type="number"
                value="0"
                placeholder="Input opacity"
                padding="pl-9"
                spanComponent={<strong>%</strong>}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <InputColorCode
                label="Field Color"
                id="field-color"
                value="#FFFF00"
              />
              <InputColorCode
                label="Element Color"
                id="elemnt-color"
                value="#FFFF00"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div
              className={`h-full flex flex-col justify-between ${
                (parts.length || accessory.length) && "space-y-4"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-end justify-between">
                  <p className="text-sm">Element Part Number</p>
                  <span className="text-xs text-secondary">
                    *The first part is set as default
                  </span>
                </div>
                <DraggablePartList parts={parts} setParts={setParts} />
              </div>
              <div
                className={`space-y-4 ${
                  (parts.length || accessory.length) &&
                  "border-t border-neutral-400 pt-4"
                }`}
              >
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    id="part_name"
                    label="Part Name"
                    placeholder="Input part name"
                  />
                  <Input
                    id="price"
                    label="Price"
                    type="number"
                    placeholder="Input price"
                    padding="pl-9"
                    spanComponent={<strong>$</strong>}
                    required
                  />
                </div>
                <ButtonSecondary
                  icon={Plus}
                  type={"button"}
                  label={"Add Part"}
                  onClick={handleAdd}
                />
              </div>
            </div>
            <div
              className={`h-full flex flex-col justify-between ${
                (parts.length || accessory.length) && "space-y-4"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-end justify-between">
                  <p className="text-sm">Secondary Part Number</p>
                </div>
                <DraggablePartList parts={accessory} setParts={setAccessory} />
              </div>
              <div
                className={`space-y-4 ${
                  (parts.length || accessory.length) &&
                  "border-t border-neutral-400 pt-4"
                }`}
              >
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    id="accessory_name"
                    label="Accessory Name"
                    placeholder="Input accessory name"
                  />
                  <Input
                    id="price"
                    label="Price"
                    type="number"
                    placeholder="Input price"
                    padding="pl-9"
                    spanComponent={<strong>$</strong>}
                    required
                  />
                </div>
                <ButtonSecondary
                  icon={Plus}
                  type={"button"}
                  label={"Add Accessory"}
                  onClick={handleAccessory}
                />
              </div>
            </div>
          </div>

          <DraggableFieldInformation
            label="Information"
            options={optionsElemetInformation}
          />

          <div className="h-6"></div>
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

export default ModalAddElement;
