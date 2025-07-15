// src/components/Modal/ModalSubmitClient.js

import { X } from "lucide-react";
import { optionsStage, optionsClients } from "@/data/dropdown";
import Input from "@/components/Form/Input";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Modal from "./Modal";
import ButtonSecondary from "@/components/Button/ButtonSecondary";
import Select from "@/components/Form/Select";

export const ModalSubmitOneSnap = ({ data, isOpen, onClose, onSubmit }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} sizeModal={`w-[936px]`}>
      <div>
        <div className="flex items-start justify-between border-b border-neutral-400 p-6">
          <div>
            <h2 className="text-xl font-semibold">
              {data ? "Edit" : "Create New"} OneSnap
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
          <Input
            id={"name"}
            label={"OneSnap Title"}
            value={data?.title}
            placeholder="Input title"
            required={true}
          />
          <div className="flex justify-end gap-2">
            <ButtonSecondary
              type={"button"}
              label={"Cancel"}
              onClick={onClose}
            />
            <ButtonPrimary type={"submit"} label={data ? "Save" : "Submit"} />
          </div>
        </form>
      </div>
    </Modal>
  );
};
