// src/pages/Clients.js

import Topbar from "@/components/Navigation/Topbar";
import Nav from "@/components/Navigation/Nav";
import AppClients from "@/apps/Clients/AppClients";

const breadcrumbItems = [
  { label: "Home", path: null },
  { label: "Clients", path: null },
];

const Clients = () => {
  return (
    <>
      <Topbar title={"Clients"} />
      <Nav breadcrumbItems={breadcrumbItems} />
      <div className="px-6 py-8" style={{ minHeight: "calc(100vh - 158px)" }}>
        <AppClients />
      </div>
    </>
  );
};

export default Clients;
