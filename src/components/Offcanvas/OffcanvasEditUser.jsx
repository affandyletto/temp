// src/components/OffcanvasEditUser.jsx

import { useEffect, useState } from "react";
import { optionsUserTypes } from "@/data/dropdown";
import { mockCheckboxOneSnap, mockCheckboxOneSurvey } from "@/data/users";
import Input from "../Form/Input";
import Offcanvas from "./Offcanvas";
import InputPhone from "../Form/InputPhone";
import Select from "../Form/Select";
import AppAccessCollapse from "../AppAccessCollapse";
import ButtonSecondary from "../Button/ButtonSecondary";
import ButtonPrimary from "../Button/ButtonPrimary";
import ToggleTabs from "../Toggle/ToggleTabs";

const OffcanvasEditUser = ({ isOpen, onClose, onSubmit, data }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isOneSurvey, setIsOneSurvey] = useState(false);
  const [isOneSnap, setIsOneSnap] = useState(false);
  const [selectTypeValue, setSelecTypeValue] = useState("");

  useEffect(() => {
    setSelecTypeValue(data?.type_value);
  }, [data]);

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
    <Offcanvas title={"Edit User"} isOpen={isOpen} onClose={onClose}>
      <div className="py-8 px-5 h-full overflow-y-auto space-y-6">
        <ToggleTabs
          tabs={["Profile", "App Access"]}
          value={activeTab}
          onChange={setActiveTab}
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="space-y-4"
        >
          {activeTab === 0 ? (
            <>
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
              <Input
                id={"username"}
                label={"Username"}
                value={data?.username}
                placeholder="Input username"
                readOnly={true}
                required={true}
              />
              <InputPhone
                id={"number"}
                label={"Number"}
                value={data?.phone}
                placeholder="Input phone number"
              />

              <Select
                id="select_type"
                label="User Type"
                placeholder="Select user type"
                options={optionsUserTypes}
                value={selectTypeValue}
                onChange={(e) => setSelecTypeValue(e)}
                required={true}
              />
            </>
          ) : (
            <>
              <div className="space-y-5">
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
            </>
          )}

          <div className="flex justify-end gap-2">
            <ButtonSecondary
              type={"button"}
              label={"Cancel"}
              onClick={onClose}
            />
            <ButtonPrimary type="submit" label="Save Change" />
          </div>
        </form>
      </div>
    </Offcanvas>
  );
};

export default OffcanvasEditUser;
