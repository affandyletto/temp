// src/components/Modal/ModalSubmitAccessories.jsx

import { useState } from "react";
import { X } from "lucide-react";
import { optionsAccessories } from "@/data/dropdown";
import Modal from "./Modal";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import ButtonSecondary from "@/components/Button/ButtonSecondary";
import Checkbox from "@/components/Form/Checkbox";

const ModalSubmitAccessories = ({ isOpen, onClose, onSubmit }) => {
  const [checkbox, setCheckbox] = useState(optionsAccessories);

  const handleChange = (id, newValue) => {
    console.log(id, newValue);
    setCheckbox((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value: newValue } : item))
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} sizeModal={`w-[590px]`}>
      <div>
        <div className="flex items-start justify-between border-b border-neutral-400 p-6">
          <div>
            <h2 className="text-xl font-semibold">Bulk Edit Accessories</h2>
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
          <div className="space-y-4">
            <label htmlFor="" className="text-sm font-semibold">
              Accessories
            </label>
            <div className="space-y-3">
              {checkbox.map(({ id, label, value }) => (
                <Checkbox
                  key={id}
                  id={id}
                  label={label}
                  checked={value}
                  onChange={(newVal) => handleChange(id, newVal)}
                />
              ))}
            </div>
          </div>
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

export default ModalSubmitAccessories;
