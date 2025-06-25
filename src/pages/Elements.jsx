// src/pages/Elements.jsx

import Topbar from "@/components/Navigation/Topbar";
import Nav from "@/components/Navigation/Nav";

const breadcrumbItems = [
  { label: "Home", path: null },
  { label: "Elements", path: null },
];

const Elements = () => {
  return (
    <>
      <Topbar title={"Elements"} />
      <Nav breadcrumbItems={breadcrumbItems} />
      <div
        className="px-6 py-8"
        style={{ minHeight: "calc(100vh - 158px)" }}
      ></div>
    </>
  );
};

export default Elements;
