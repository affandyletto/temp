// src/components/Modal/ModalSubmitClient.js

import { X } from "lucide-react";
import Input from "../Form/Input";
import ButtonPrimary from "../Button/ButtonPrimary";
import Modal from "./Modal";
import ButtonSecondary from "../Button/ButtonSecondary";
import Select from "../Form/Select";
import { optionsIndustry } from "../../data/dropdown";
import Textarea from "../Form/Textarea";
import InputPhone from "../Form/InputPhone";

const ModalSubmitClient = ({ data, isOpen, onClose, onSubmit }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} sizeModal={`w-[936px]`}>
      <div>
        <div className="flex items-start justify-between border-b border-neutral-400 p-6">
          <div>
            <h2 className="text-xl font-semibold">
              {data ? "Edit" : "Add"} Client
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
            id={"company_name"}
            label={"Company Name"}
            value={data?.name}
            placeholder="Input company name"
            required={true}
          />
          <Select
            id="select_industry"
            label="Industry"
            placeholder="Select Industry"
            options={optionsIndustry}
            onChange={(e) => console.log(e)}
          />
          <Textarea
            id={"address"}
            label={"Address"}
            placeholder="Input address"
            required={false}
          />
          <Input
            id={"contact_name"}
            label={"Contact Name"}
            placeholder="Input contact name"
            required={false}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              id={"email"}
              type={"email"}
              label={"Email"}
              placeholder="Input email"
              required={false}
            />
            <InputPhone
              id={"number"}
              label={"Number"}
              placeholder="Input number"
              required={false}
            />
          </div>
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

export default ModalSubmitClient;
