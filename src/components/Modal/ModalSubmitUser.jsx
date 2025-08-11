// src/components/Modal/ModalSubmitUser.jsx

import { X } from "lucide-react";
import { optionsUserTypes } from "@/data/dropdown";
import { useState, useEffect } from "react";
import { mockCheckboxOneSnap, mockCheckboxOneSurvey } from "@/data/users";
import Input from "@/components/Form/Input";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Modal from "./Modal";
import ButtonSecondary from "@/components/Button/ButtonSecondary";
import Select from "@/components/Form/Select";
import InputPhone from "@/components/Form/InputPhone";
import AppAccessCollapse from "@/components/AppAccessCollapse";

const ModalSubmitUser = ({ data, isOpen, onClose, onSubmit }) => {
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    phone: "",
  });

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

  // Initialize form data when modal opens or data prop changes
  useEffect(() => {
    if (data) {
      setFormData({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        username: data.username || "",
        phone: data.phone || "",
      });
      setSelecTypeValue(data.userType || "");
      setIsOneSurvey(data.oneSurveyAccess || false);
      setIsOneSnap(data.oneSnapAccess || false);
    } else {
      // Reset form when no data (for add new user)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        phone: "",
      });
      setSelecTypeValue("");
      setIsOneSurvey(false);
      setIsOneSnap(false);
      setCheckboxOneSurvey(mockCheckboxOneSurvey);
      setCheckboxOneSnap(mockCheckboxOneSnap);
    }
  }, [data, isOpen]);

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.username || !selectTypeValue) {
      alert("Please fill in all required fields");
      return;
    }

    // Collect all form data
    const submitData = {
      ...formData,
      userType: selectTypeValue,
      appAccess: {
        oneSurvey: {
          enabled: isOneSurvey,
          permissions: checkboxOneSurvey.filter(item => item.value).map(item => ({
            id: item.id,
            label: item.label
          }))
        },
        oneSnap: {
          enabled: isOneSnap,
          permissions: checkboxOneSnap.filter(item => item.value).map(item => ({
            id: item.id,
            label: item.label
          }))
        }
      }
    };

    // Pass data to parent component
    onSubmit(submitData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      sizeModal={`w-[936px]`}
      isScroll={false}
    >
      <div className="flex flex-col max-h-[90vh]">
        {/* Fixed Header - Never scrolls */}
        <div className="flex items-start justify-between border-b border-neutral-400 p-6 flex-shrink-0">
          <div>
            <h2 className="text-xl font-semibold">
              {data ? "Edit User" : "Add User"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center"
          >
            <X className="size-5" />
          </button>
        </div>
        
        {/* Scrollable Form Content Only */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-6 pt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                id={"first_name"}
                label={"First Name"}
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                placeholder="Input first name"
                required={true}
              />
              <Input
                id={"last_name"}
                label={"Last Name"}
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                placeholder="Input last name"
                required={true}
              />
            </div>
            <Input
              id={"email"}
              type={"email"}
              label={"Email"}
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Input email address"
              required={true}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                id={"username"}
                label={"Username"}
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                placeholder="Input username"
                required={true}
              />
              <InputPhone
                id={"number"}
                label={"Number"}
                value={formData.phone}
                onChange={(value) => handleInputChange("phone", value)}
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
          </div>
        </div>
        
        {/* Fixed Footer - Never scrolls */}
        <form onSubmit={handleSubmit}>
          <div className="border-t border-neutral-400 p-6 flex-shrink-0">
            <div className="flex justify-end gap-2">
              <ButtonSecondary
                type={"button"}
                label={"Cancel"}
                onClick={onClose}
              />
              <ButtonPrimary 
                type="submit" 
                label={data ? "Update" : "Submit"} 
              />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ModalSubmitUser;