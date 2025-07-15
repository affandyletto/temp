// src/components/Modal/ModalSubmitAlbum.js

import { Image, X } from "lucide-react";
import Input from "@/components/Form/Input";
import TextArea from "@/components/Form/TextArea";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Modal from "./Modal";
import ButtonSecondary from "../Button/ButtonSecondary";
import Select from "../Form/Select";
import { optionsElemetClassifications } from "@/data/dropdown";

const ModalInfoOneSnap = ({
  data = null,
  isOpen,
  onClose,
  onSubmit = () => {},
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} sizeModal={`w-[640px]`}>
      <div>
        <div className="flex items-start justify-between border-b border-neutral-400 p-6">
          <div>
            <h2 className="text-xl font-semibold">
              Information
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center"
          >
            <X className="size-5" />
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="px-6 pb-6 pt-4 space-y-4"
        >
          <Input id={"label"} label={"Label"} placeholder="Input label" value={data?.name} />

          <TextArea id={"description"} label={"Description"} placeholder="Input description" value={data?.description} />

          <div className="flex justify-end space-x-2">
            <ButtonSecondary
              type={"button"}
              label={"Cancel"}
              onClick={onClose}
            />
            <ButtonPrimary type={"submit"} label={"Save"} />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ModalInfoOneSnap;
