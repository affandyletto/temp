// src/pages/Tickets.js

import Topbar from "@/components/Navigation/Topbar";
import Nav from "@/components/Navigation/Nav";
import Maintenance from "@/components/Maintenance";

const breadcrumbItems = [
  { label: "Home", path: null },
  { label: "Tickets", path: null },
];

const Tickets = () => {
  return (
    <>
      <Topbar title={"Tickets"} />
      <Nav breadcrumbItems={breadcrumbItems} />
      <div
        className="flex items-center justify-center"
        style={{ height: "calc(100vh - 158px)" }}
      >
        <Maintenance
          title={"Tickets Are Coming Soon!"}
          description={`We're working on a powerful ticketing system to help you track issues and requests. Stay tuned it's on the way!`}
        />
      </div>
    </>
  );
};

export default Tickets;
