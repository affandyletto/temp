// src/components/Modal/ModalSubmitUser.jsx

import { X } from "lucide-react";
import { optionsUserTypes } from "@/data/dropdown";
import { useState } from "react";
import { mockCheckboxOneSnap, mockCheckboxOneSurvey } from "@/data/users";
import Input from "@/components/Form/Input";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Modal from "./Modal";
import ButtonSecondary from "@/components/Button/ButtonSecondary";
import Select from "@/components/Form/Select";
import InputPhone from "@/components/Form/InputPhone";
import AppAccessCollapse from "@/components/AppAccessCollapse";

const ModalSubmitUser = ({ data, isOpen, onClose, onSubmit }) => {
  const [isOneSurvey, setIsOneSurvey] = useState(false);
  const [isOneSnap, setIsOneSnap] = useState(false);
  const [selectTypeValue, setSelecTypeValue] = useState("");

  // handle OneSurvey
  const [checkboxOneSurvey, setCheckboxOneSurvey] = useState(
    mockCheckboxOneSurvey
  );

  const handleSurveyChange = (id, newValue) => {
    setCheckboxOneSurvey((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value: newValue } : item))
    );
  };

  // handle OneSnap
  const [checkboxOneSnap, setCheckboxOneSnap] = useState(mockCheckboxOneSnap);

  const handleSnapChange = (id, newValue) => {
    setCheckboxOneSnap((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value: newValue } : item))
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      sizeModal={`w-[936px]`}
      isScroll={true}
    >
      <div>
        <div className="flex items-start justify-between border-b border-neutral-400 p-6">
          <div>
            <h2 className="text-xl font-semibold">Add User</h2>
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
          <div className="grid grid-cols-2 gap-4">
            <Input
              id={"first_name"}
              label={"First Name"}
              value={data?.firstName}
              placeholder="Input first name"
              required={true}
            />
            <Input
              id={"last_name"}
              label={"Last Name"}
              value={data?.lastName}
              placeholder="Input last name"
              required={true}
            />
          </div>
          <Input
            id={"email"}
            type={"email"}
            label={"Email"}
            value={data?.email}
            placeholder="Input email address"
            required={true}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              id={"username"}
              label={"Username"}
              value={data?.username}
              placeholder="Input username"
              required={true}
            />
            <InputPhone
              id={"number"}
              label={"Number"}
              value={data?.phone}
              placeholder="Input phone number"
            />
          </div>
          <Select
            id="select_type"
            label="User Type"
            placeholder="Select user type"
            options={optionsUserTypes}
            value={selectTypeValue}
            onChange={(e) => setSelecTypeValue(e)}
            required={true}
          />
          <div className="space-y-3">
            <p className="text-sm">App Access</p>
            <AppAccessCollapse
              title="OneSurvey"
              description="Survey creation and management"
              isEnabled={isOneSurvey}
              onToggle={setIsOneSurvey}
              checkboxes={checkboxOneSurvey}
              onCheckboxChange={handleSurveyChange}
            />

            <hr />

            <AppAccessCollapse
              title="OneSnap"
              description="Image capture tool"
              isEnabled={isOneSnap}
              onToggle={setIsOneSnap}
              checkboxes={checkboxOneSnap}
              onCheckboxChange={handleSnapChange}
            />
          </div>

          <div className="flex justify-end gap-2">
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

export default ModalSubmitUser;
