// src/components/Modal/ModalSubmitAlbum.js

import { Image, X } from "lucide-react";
import Input from "@/components/Form/Input";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Modal from "./Modal";
import ButtonSecondary from "../Button/ButtonSecondary";
import Select from "../Form/Select";
import { optionsElemetClassifications } from "@/data/dropdown";

const ModalSubmitAlbum = ({
  totalItem,
  data = null,
  isOpen,
  onClose,
  onSubmit = () => {},
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} sizeModal={`w-[936px]`}>
      <div>
        <div className="flex items-start justify-between border-b border-neutral-400 p-6">
          <div>
            <h2 className="text-xl font-semibold">
              {data ? "Edit" : "Create"} Album
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
          <Input id={"title"} label={"Title"} placeholder="Input title" />
          <Select
            id="select_classification"
            label="Classifications"
            placeholder="Select classification"
            options={optionsElemetClassifications}
            onChange={(e) => console.log(e)}
          />
          {totalItem && (
            <div className="flex items-center gap-2">
              <Image className="size-6 text-secondary" />
              <span className="text-sm">{totalItem} Item Selected</span>
            </div>
          )}

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

export default ModalSubmitAlbum;
