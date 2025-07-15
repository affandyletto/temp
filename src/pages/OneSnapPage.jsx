// src/pages/Elements.jsx

import Topbar from "@/components/Navigation/Topbar";
import Nav from "@/components/Navigation/Nav";
import ElementManager from "@/apps/Elements/ElementManager";
import {OneSnapList} from "@/apps/OneSnap/OneSnapList"

const breadcrumbItems = [
  { label: "Home", path: null },
  { label: "One Snap", path: null },
];

const OneSnapPage = () => {
  return (
    <>
      <Topbar title={"One Snap"} />
      <Nav breadcrumbItems={breadcrumbItems} />
      <div className="px-6 py-8" style={{ minHeight: "calc(100vh - 158px)" }}>
      	<OneSnapList/>
      </div>
    </>
  );
};

export default OneSnapPage;
