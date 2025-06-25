// src/pages/Projects.js

import Topbar from "@/components/Navigation/Topbar";
import Nav from "@/components/Navigation/Nav";
import ProjectList from "@/apps/Projects/ProjectList";

const breadcrumbItems = [
  { label: "Home", path: null },
  { label: "Projects", path: null },
];

const Projects = () => {
  return (
    <>
      <Topbar title={"Projects"} />
      <Nav breadcrumbItems={breadcrumbItems} />
      <div className="px-6 py-8" style={{ minHeight: "calc(100vh - 158px)" }}>
        <ProjectList />
      </div>
    </>
  );
};

export default Projects;
