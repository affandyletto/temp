// src/components/Modal/ModalSubmitPartNumber.jsx

import { X } from "lucide-react";
import { optionsPartNumber } from "@/data/dropdown";
import Modal from "./Modal";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Select from "../Form/Select";
import ButtonSecondary from "../Button/ButtonSecondary";

const ModalSubmitPartNumber = ({ isOpen, onClose, onSubmit, data = null }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} sizeModal={`w-[936px]`}>
      <div>
        <div className="flex items-start justify-between border-b border-neutral-400 p-6">
          <div>
            <h2 className="text-xl font-semibold">
              Bulk {data ? "Edit" : "Add"} Part Number
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
          <Select
            id="partNumber"
            label="Part Number"
            placeholder="Select part number"
            options={optionsPartNumber}
            onChange={(e) => console.log(e)}
          />
          <p className="text-base font-semibold">
            Total Price {data?.totalPrice || "$0"}
          </p>
          <div className="flex justify-end gap-2">
            <ButtonSecondary
              type={"button"}
              label={"Cancel"}
              onClick={onClose}
            />
            <ButtonPrimary type={"submit"} label={"Apply"} />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ModalSubmitPartNumber;
