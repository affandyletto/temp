// src/components/Form/FieldAccessory.jsx

import Input from "@/components/Form/Input";
import ButtonIconPrimary from "../Button/ButtonIconPrimary";
import { Plus } from "lucide-react";

const FieldAccessory = () => {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold">Add New Accessory</p>
      <div>
        <div className="flex items-center gap-2">
          <div className="w-full">
            <Input id={`accessory_name`} placeholder="Input accessory name" />
          </div>

          <div className="shrink-0 w-[100px]">
            <Input
              id={`accessory_number`}
              placeholder="Input accessory number"
              type="number"
              value={0}
            />
          </div>

          <div className="shrink-0">
            <ButtonIconPrimary
              icon={Plus}
              sizeIcon="size-5"
              sizeBtn="size-[52px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldAccessory;
