// src/apps/Projects/SiteSetting.jsx

import { useEffect, useState } from "react";
import SingleSelect from "@/components/Form/SingleSelect";
import {
  optionsAccountManager,
  optionsClientOrganization,
  optionsCollaborator,
  optionsTechnician,
  optionsViewer,
} from "@/data/dropdown";
import SkeletonDefault from "@/components/Skeleton/SkeletonDefault";

const SiteSetting = () => {
  // Loading
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const [selectedItems1, setSelectedItems1] = useState("");
  const [selectedItems2, setSelectedItems2] = useState("");
  const [selectedItems3, setSelectedItems3] = useState("");
  const [selectedItems4, setSelectedItems4] = useState("");
  const [selectedItems5, setSelectedItems5] = useState("");

  return (
    <>
      {isLoading ? (
        <SkeletonDefault />
      ) : (
        <div className="space-y-6">
          <h5 className="text-xl font-semibold">Team</h5>
          <div className="space-y-5">
            <SingleSelect
              label="Account Manager"
              options={optionsAccountManager}
              selected={selectedItems1}
              setSelected={setSelectedItems1}
            />
            <SingleSelect
              label="Collaborator"
              options={optionsCollaborator}
              selected={selectedItems2}
              setSelected={setSelectedItems2}
            />
            <SingleSelect
              label="Technician"
              options={optionsTechnician}
              selected={selectedItems3}
              setSelected={setSelectedItems3}
            />
            <SingleSelect
              label="Viewer"
              options={optionsViewer}
              selected={selectedItems4}
              setSelected={setSelectedItems4}
            />
            <SingleSelect
              label="Client Organization"
              options={optionsClientOrganization}
              selected={selectedItems5}
              setSelected={setSelectedItems5}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SiteSetting;
