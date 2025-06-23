// src/pages/ProjectDetail.js

import { useLocation } from "react-router-dom";
import { projects } from "../data/projects";
import { generateBreadcrumb } from "../utils/breadcrumb";
import Topbar from "../components/Topbar";
import Nav from "../components/Nav";
import Tabs from "../components/Tabs";
import { tabsProjectDetail } from "../data/tabs";

const ProjectDetail = () => {
  const location = useLocation();

  const getLabelById = (id) => {
    const project = projects.find((p) => p.id.toString() === id);
    return project?.name;
  };

  const breadcrumbItems = generateBreadcrumb(location.pathname, getLabelById);

  return (
    <>
      <Topbar title={"Mif's First Project"} isRename={true} />
      <Nav breadcrumbItems={breadcrumbItems} isNavRight={true} />
      <div className="px-6 py-8">
        <Tabs tabs={tabsProjectDetail} />
      </div>
    </>
  );
};

export default ProjectDetail;
