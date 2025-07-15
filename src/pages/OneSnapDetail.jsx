// src/pages/ProjectDetail.js

import { useLocation } from "react-router-dom";
import { mockProjects } from "@/data/projects";
import { generateBreadcrumb } from "@/utils/breadcrumb";
import Topbar from "@/components/Navigation/Topbar";
import Nav from "@/components/Navigation/Nav";
import Tabs from "@/components/Navigation/Tabs";
import { tabsOneSnapDetail } from "@/data/tabs";
import { useOneSnapTab } from "@/context/TabContext";

export const OneSnapDetail = () => {
  const { tabValue } = useOneSnapTab();
  const location = useLocation();

  const getLabelById = (id) => {
    const project = mockProjects.find((p) => p.id.toString() === id);
    return project?.name;
  };

  const breadcrumbItems = generateBreadcrumb(location.pathname, getLabelById);

  return (
    <>
      <Topbar title={"Mif's First Project"} isRename={true} />
      <Nav breadcrumbItems={breadcrumbItems} isNavRight={true} />
      <div className="px-6 py-8">
        <Tabs tabs={tabsOneSnapDetail} value={tabValue || "gallery"} />
      </div>
    </>
  );
};

