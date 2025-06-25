// src/components/Modal/ModalTransfer.js

import { X } from "lucide-react";
import Modal from "./Modal";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Select from "@/components/Form/Select";

const ModalTransfer = ({
  isOpen,
  onClose,
  onSubmit,
  value,
  setValue,
  projectOptions = [],
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} sizeModal={`w-[640px]`}>
      <div>
        <div className="flex items-start justify-between border-b border-neutral-400 p-6">
          <div>
            <h2 className="text-xl font-semibold">Site Transfer</h2>
            <p className="text-sm text-secondary">
              Please select the destination project to transfer the Mif First
              Floor Plan Design
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
          <Select
            id="select_project"
            label="Project"
            value={value}
            onChange={(e) => setValue(e)}
            options={projectOptions}
          />
          <div className="flex justify-end">
            <ButtonPrimary type={"submit"} label={"Submit"} />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ModalTransfer;
