// src/pages/Projects.js

import Topbar from "../components/Topbar";
import Nav from "../components/Nav";

const breadcrumbItems = [
  { label: "Home", path: null },
  { label: "Projects", path: null },
];

const Projects = () => {
  return (
    <>
      <Topbar title={"Projects"} />
      <Nav breadcrumbItems={breadcrumbItems} />
    </>
  );
};

export default Projects;
