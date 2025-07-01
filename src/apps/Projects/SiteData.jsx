// src/apps/Projects/SiteData.jsx

import { useState } from "react";
import ToggleTabs from "@/components/Toggle/ToggleTabs";
import SurveyInformation from "./SiteData/SurveyInformation";
import InstallationInformation from "./SiteData/InstallationInformation";
import ElementInformation from "./SiteData/ElementInformation";
import BillOfMaterials from "./SiteData/BillOfMaterials";

const SiteData = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div className="space-y-8">
        <div className="w-[729px]">
          <ToggleTabs
            tabs={[
              "Survey Information",
              "Installation Information",
              "Element Information",
              "Bill of Materials",
            ]}
            value={activeTab}
            onChange={setActiveTab}
          />
        </div>
        {activeTab === 0 && <SurveyInformation />}
        {activeTab === 1 && <InstallationInformation />}
        {activeTab === 2 && <ElementInformation />}
        {activeTab === 3 && <BillOfMaterials />}
      </div>
    </>
  );
};

export default SiteData;
