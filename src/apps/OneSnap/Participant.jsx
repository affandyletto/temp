// src/apps/Projects/SiteSetting.jsx

import { useState } from "react";
import MultiSelect from "@/components/Form/MultiSelect";
import SingleSelect from "@/components/Form/SingleSelect";
import {
  optionsAccountManager,
  optionsClientOrganization,
  optionsCollaborator,
  optionsTechnician,
  optionsViewer,
} from "@/data/dropdown";

export const Participant = () => {
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
          <SingleSelect
            label="Client Organization"
            options={optionsClientOrganization}
            selected={selectedItems1}
            setSelected={setSelectedItems1}
            placeholder="No client selected"
            info="Assign this OneSnap event to a client to stay organized. You will be able to see this event under the client profile on the clients page"
          />
          <MultiSelect
            label="Viewers"
            options={optionsViewer}
            selected={selectedItems2}
            setSelected={setSelectedItems2}
            placeholder="Add viewers"
            info="Viewers can see the gallery and albums, but not make changes"
          />
          <MultiSelect
            label="Collabolator"
            options={optionsCollaborator}
            selected={selectedItems3}
            setSelected={setSelectedItems3}
            placeholder="Add collabolator"
            info="Collaborators can make changes, and have access to the archive"
          />
          <MultiSelect
            label="Technician"
            options={optionsTechnician}
            selected={selectedItems4}
            setSelected={setSelectedItems4}            
            placeholder="Add technician"
            info="Technicians can only see the gallery and take photos, and have no access to albums, reports, or the archive"
          />
        </div>
      </div>
    </>
  );
};