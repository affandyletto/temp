import { Tooltip } from "react-tooltip";
import { Info } from "lucide-react";
import Input from "@/components/Form/Input";
import InputLogo from "@/components/Form/InputLogo";
import React, { useEffect, useState } from "react";
import InputColorCode from "@/components/Form/InputColorCode";
import SkeletonDefault from "@/components/Skeleton/SkeletonDefault";

const AppOrganization = () => {
  // Loading
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {isLoading ? (
        <SkeletonDefault />
      ) : (
        <div className="space-y-8">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Mif's Company</h2>
            <div className="flex items-start gap-5">
              <InputLogo title={"Square Logo"} width={"square"} />
              <InputLogo title={"Horizontal Logo"} width={"horizontal"} />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-1">
              <p className="text-sm font-semibold">Color Scheme</p>
              <Info
                data-tooltip-id="info-tooltip"
                className="size-4 cursor-pointer"
              />
            </div>
            <div className="grid grid-cols-5 gap-5">
              <InputColorCode label="Option 1" id="option-1" value="#CCD1D9" />
              <InputColorCode label="Option 2" id="option-2" value="#23272F" />
              <InputColorCode label="Option 3" id="option-3" value="#2C6499" />
              <InputColorCode label="Custom" id="option-4" value="#003F7D" />
            </div>
          </div>
          <form action="">
            <div className="space-y-8">
              <div className="grid grid-cols-3 gap-5">
                <Input
                  id={"billing_contact_name"}
                  label={"Billing Contact Name"}
                  placeholder="Input billing contact name"
                />
                <Input
                  id={"billing_contact_email"}
                  label={"Billing Contact Email"}
                  placeholder="Input billing contact email"
                />
                <Input
                  id={"billing_contact_number"}
                  label={"Billing Contact Number"}
                  placeholder="Input billing contact number"
                />
                <Input
                  id={"technical_contact_name"}
                  label={"Technical Contact Name"}
                  placeholder="Input technical contact name"
                />
                <Input
                  id={"technical_contact_email"}
                  label={"Technical Contact Email"}
                  placeholder="Input technical contact email"
                />
                <Input
                  id={"technical_contact_number"}
                  label={"Technical Contact Number"}
                  placeholder="Input technical contact number"
                />
                <Input
                  id={"primary_contact_name"}
                  label={"Primary Contact Name"}
                  placeholder="Input primary contact name"
                />
                <Input
                  id={"primary_contact_email"}
                  label={"Primary Contact Email"}
                  placeholder="Input primary contact email"
                />
                <Input
                  id={"primary_contact_number"}
                  label={"Primary Contact Number"}
                  placeholder="Input primary contact number"
                />
              </div>
              <hr />
              <div className="grid grid-cols-3 gap-5">
                <Input
                  id={"company_name"}
                  label={"Company Name"}
                  placeholder="Input company name"
                />
                <Input
                  id={"license_number"}
                  label={"License Number"}
                  placeholder="Input license number"
                />
                <Input
                  id={"company_phone"}
                  label={"Company Phone"}
                  placeholder="Input company phone"
                />
                <Input
                  id={"company_website"}
                  label={"Company Website"}
                  placeholder="Input company website"
                />
                <Input
                  id={"street_address"}
                  label={"Street Address"}
                  placeholder="Input street address"
                />
                <Input
                  id={"suite"}
                  label={"Suite / Apartement"}
                  placeholder="Input suite / apartement"
                />
                <Input id={"city"} label={"City"} placeholder="Input city" />
                <Input
                  id={"postal_code"}
                  label={"Postal Code"}
                  placeholder="Input postal code"
                />
                <Input
                  id={"state_province"}
                  label={"State / Province"}
                  placeholder="Input state / province"
                />
                <div className="col-span-3">
                  <Input
                    id={"country"}
                    label={"Country"}
                    placeholder="Input country"
                  />
                </div>
              </div>
            </div>
          </form>
          <div className="h-20"></div>
        </div>
      )}
      <Tooltip
        id="info-tooltip"
        place="top"
        content="Select a color to display when exporting a report for your projects"
        style={{ backgroundColor: "#3F444D", borderRadius: "8px" }}
      />
    </>
  );
};

export default AppOrganization;
