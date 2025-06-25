// src/pages/Users.jsx

import Topbar from "@/components/Navigation/Topbar";
import Nav from "@/components/Navigation/Nav";
import Userlist from "@/apps/Users/UserList";

const breadcrumbItems = [
  { label: "Home", path: null },
  { label: "Users", path: null },
];

const Users = () => {
  return (
    <>
      <Topbar title={"Users"} />
      <Nav breadcrumbItems={breadcrumbItems} />
      <div className="px-6 py-8" style={{ minHeight: "calc(100vh - 158px)" }}>
        <Userlist />
      </div>
    </>
  );
};

export default Users;
