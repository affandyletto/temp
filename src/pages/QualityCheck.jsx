// src/pages/QualityCheck.js

import Topbar from "@/components/Navigation/Topbar";
import Nav from "@/components/Navigation/Nav";
import Maintenance from "@/components/Maintenance";

const breadcrumbItems = [
  { label: "Home", path: null },
  { label: "Quality Check", path: null },
];

const QualityCheck = () => {
  return (
    <>
      <Topbar title={"Quality Check"} />
      <Nav breadcrumbItems={breadcrumbItems} />
      <div
        className="flex items-center justify-center"
        style={{ height: "calc(100vh - 158px)" }}
      >
        <Maintenance
          title={"Quality Check Is Coming Soon!"}
          description={`We're working on a powerful quality check system to help you track issues and requests. Stay tuned it's on the way!`}
        />
      </div>
    </>
  );
};

export default QualityCheck;
