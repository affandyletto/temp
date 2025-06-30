// src/pages/ProjectPhotos.js

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { tabsProjectDetail } from "@/data/tabs";
import { mockProjects } from "@/data/projects";
import { generateBreadcrumb } from "@/utils/breadcrumb";
import Topbar from "@/components/Navigation/Topbar";
import Nav from "@/components/Navigation/Nav";
import Tabs from "@/components/Navigation/Tabs";
import AllPhotos from "@/apps/Projects/AllPhotos";

const ProjectPhotos = () => {
  const location = useLocation();
  const [tabs, setTabs] = useState(tabsProjectDetail);

  useEffect(() => {
    setTabs((prev) =>
      prev.map((tab) =>
        tab.value === "gallery" ? { ...tab, content: <AllPhotos /> } : tab
      )
    );
  }, []);

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
        <Tabs tabs={tabs} value={"gallery"} />
      </div>
    </>
  );
};

export default ProjectPhotos;
