// src/components/Modal/ModalSubmitFields.jsx

import { X } from "lucide-react";
import Modal from "./Modal";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import ButtonSecondary from "@/components/Button/ButtonSecondary";
import DraggableFieldInformation from "../Form/DraggableFieldInformation";
import { optionsElemetInformation } from "@/data/dropdown";

const ModalSubmitFields = ({ isOpen, onClose, onSubmit }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} sizeModal={`w-[936px]`}>
      <div>
        <div className="flex items-start justify-between border-b border-neutral-400 p-6">
          <div>
            <h2 className="text-xl font-semibold">Edit Fields</h2>
            <p className="text-sx text-secondary">
              There are 1 surveys in this site. Would you like to make these
              changes to all of them?
            </p>
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
          <DraggableFieldInformation options={optionsElemetInformation} />
          <div className="flex justify-end gap-2">
            <ButtonSecondary
              type={"button"}
              label={"Cancel"}
              onClick={onClose}
            />
            <ButtonPrimary type={"submit"} label={"Apply to All"} />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ModalSubmitFields;
