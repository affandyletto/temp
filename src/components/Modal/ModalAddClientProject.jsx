// src/components/Modal/ModalAddClientProject.jsx

import { X } from "lucide-react";
import Input from "@/components/Form/Input";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import ButtonSecondary from "@/components/Button/ButtonSecondary";
import Modal from "./Modal";

const ModalAddClientProject = ({ data, isOpen, onClose, onSubmit }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} sizeModal={`w-[936px]`}>
      <div>
        <div className="flex items-start justify-between border-b border-neutral-400 p-6">
          <div>
            <h2 className="text-xl font-semibold">
              {data ? "Edit" : "Add"} Project
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
            id={"project_name"}
            label={"Name"}
            placeholder="Input name"
            value={data?.name}
            required={true}
          />
          <Input
            id={"project_number"}
            label={"Number"}
            type="number"
            value={data?.number || 0}
            placeholder="Input number"
            required={true}
          />
          <div className="flex justify-end">
            <div className="flex justify-end gap-2">
              <ButtonSecondary
                type={"button"}
                label={"Cancel"}
                onClick={onClose}
              />
              <ButtonPrimary type={"submit"} label={data ? "Save" : "Submit"} />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ModalAddClientProject;
