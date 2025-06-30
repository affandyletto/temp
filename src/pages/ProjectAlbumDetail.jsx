// src/pages/ProjectAlbumDetail.js

import { useEffect, useState } from "react";
import { tabsProjectDetail } from "@/data/tabs";
import { useLocation } from "react-router-dom";
import { mockProjects } from "@/data/projects";
import { generateBreadcrumb } from "@/utils/breadcrumb";
import Topbar from "@/components/Navigation/Topbar";
import Nav from "@/components/Navigation/Nav";
import Tabs from "@/components/Navigation/Tabs";
import Album from "@/apps/Projects/Album";

const ProjectAlbumDetail = () => {
  const location = useLocation();
  const [tabs, setTabs] = useState(tabsProjectDetail);

  useEffect(() => {
    setTabs((prev) =>
      prev.map((tab) =>
        tab.value === "gallery" ? { ...tab, content: <Album /> } : tab
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

export default ProjectAlbumDetail;
