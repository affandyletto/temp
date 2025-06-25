// src/pages/Organization.jsx

import Topbar from "@/components/Navigation/Topbar";
import Nav from "@/components/Navigation/Nav";
import AppOrganization from "@/apps/Organization/AppOrganization";

const breadcrumbItems = [
  { label: "Home", path: null },
  { label: "Organization", path: null },
];

const Organization = () => {
  return (
    <>
      <Topbar title={"Organization"} />
      <Nav breadcrumbItems={breadcrumbItems} />
      <div className="px-6 py-8" style={{ minHeight: "calc(100vh - 158px)" }}>
        <AppOrganization />
      </div>
    </>
  );
};

export default Organization;
