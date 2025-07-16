// src/pages/ProjectDetail.js

import { useLocation } from "react-router-dom";
import { mockOneSnap } from "@/data/oneSnaps";
import { generateBreadcrumbOneSnap } from "@/utils/breadcrumb";
import Topbar from "@/components/Navigation/Topbar";
import Nav from "@/components/Navigation/Nav";
import Tabs from "@/components/Navigation/Tabs";
import { tabsOneSnapDetail } from "@/data/tabs";
import { useOneSnapTab } from "@/context/TabContext";

export const OneSnapDetail = () => {
  const { tabValue } = useOneSnapTab();
  const location = useLocation();

  const getLabelById = (id) => {
    const snap = mockOneSnap.find((p) => p.id.toString() === id);
    return snap?.name;
  };

  const getOnesnapName=()=>{
    const segments = location.pathname.split("/").filter(Boolean);
    const lastSegment = segments.at(-1);
    const snap = mockOneSnap.find((p) => p.id.toString() === lastSegment.toString());
    return snap?.name || mockOneSnap[0]?.name
  }

  const breadcrumbItems = generateBreadcrumbOneSnap(location.pathname, getLabelById);

  return (
    <>
      <Topbar title={getOnesnapName} isOnesnap={true} />
      <Nav breadcrumbItems={breadcrumbItems} isNavRight={false} />
      <div className="px-6 py-8">
        <Tabs tabs={tabsOneSnapDetail} value={tabValue || "gallery"} />
      </div>
    </>
  );
};

