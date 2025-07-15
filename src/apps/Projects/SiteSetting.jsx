// src/apps/Projects/SiteSetting.jsx

import { useState } from "react";
import MultiSelect from "@/components/Form/MultiSelect";
import {
  optionsAccountManager,
  optionsClientOrganization,
  optionsCollaborator,
  optionsTechnician,
  optionsViewer,
} from "@/data/dropdown";

const SiteSetting = () => {
  const [selectedItems1, setSelectedItems1] = useState([]);
  const [selectedItems2, setSelectedItems2] = useState([]);
  const [selectedItems3, setSelectedItems3] = useState([]);
  const [selectedItems4, setSelectedItems4] = useState([]);
  const [selectedItems5, setSelectedItems5] = useState([]);

  return (
    <>
      <div className="space-y-6">
        <h5 className="text-xl font-semibold">Team</h5>
        <div className="space-y-5">
          <MultiSelect
            label="Account Manager"
            options={optionsAccountManager}
            selected={selectedItems1}
            setSelected={setSelectedItems1}
          />
          <MultiSelect
            label="Collaborator"
            options={optionsCollaborator}
            selected={selectedItems2}
            setSelected={setSelectedItems2}
          />
          <MultiSelect
            label="Technician"
            options={optionsTechnician}
            selected={selectedItems3}
            setSelected={setSelectedItems3}
          />
          <MultiSelect
            label="Viewer"
            options={optionsViewer}
            selected={selectedItems4}
            setSelected={setSelectedItems4}
          />
          <MultiSelect
            label="Client Organization"
            options={optionsClientOrganization}
            selected={selectedItems5}
            setSelected={setSelectedItems5}
          />
        </div>
      </div>
    </>
  );
};

export default SiteSetting;