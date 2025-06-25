// src/components/Nav.js

import { useState } from "react";
import { Info } from "lucide-react";
import Breadcrumb from "./Breadcrumb";
import DropdownProgress from "@/components/Dropdown/DropdownProgress";
import OffcanvasInformation from "@/components/Offcanvas/OffcanvasInformation";
import ButtonIcon from "@/components/Button/ButtonIcon";

const Nav = ({ breadcrumbItems, isNavRight = false }) => {
  const [openInfo, setOpenInfo] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between bg-white border-b border-b-neutral-400 py-4 px-6">
        <Breadcrumb items={breadcrumbItems} />
        {isNavRight && (
          <div className="flex items-center space-x-2.5">
            <DropdownProgress />
            <ButtonIcon
              onClick={() => setOpenInfo(true)}
              icon={Info}
              sizeIcon={"size-5"}
              sizeBtn={"size-11"}
            />
          </div>
        )}
      </div>
      {isNavRight && (
        <OffcanvasInformation
          isOpen={openInfo}
          onClose={() => setOpenInfo(false)}
        />
      )}
    </>
  );
};

export default Nav;
