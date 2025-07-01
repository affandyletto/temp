// src/pages/ClientDetail.js

import { useLocation } from "react-router-dom";
import { mockClients } from "@/data/clients";
import { generateBreadcrumb } from "@/utils/breadcrumb";
import Topbar from "@/components/Navigation/Topbar";
import Nav from "@/components/Navigation/Nav";
import Tabs from "@/components/Navigation/Tabs";
import { tabsClientDetail } from "@/data/tabs";

const ClientDetail = () => {
  const location = useLocation();

  const getLabelById = (id) => {
    const client = mockClients.find((p) => p.id.toString() === id);
    return client?.name;
  };

  const breadcrumbItems = generateBreadcrumb(location.pathname, getLabelById);

  return (
    <>
      <Topbar title={"Clients"} />
      <Nav breadcrumbItems={breadcrumbItems} />
      <div className="px-6 py-8">
        <Tabs tabs={tabsClientDetail} value="basic-info" />
      </div>
    </>
  );
};

export default ClientDetail;
