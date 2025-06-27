// src/components/Button/ButtonAccessory.jsx

import { Pencil, Save, X } from "lucide-react";
import ButtonIcon from "./ButtonIcon";
import Input from "../Form/Input";

const ButtonAccessory = ({
  id,
  name = "Accessory 1",
  price = 0,
  selected = false,
  onClick = () => {},
  onSave = () => {},
  onCancel = () => {},
}) => {
  return (
    <div
      className={`flex items-center justify-between w-full rounded-lg border px-3 ${
        selected ? "py-3" : "py-4"
      } bg-neutral-200 border-neutral-400`}
    >
      {selected ? (
        <div
          className="flex items-center justify-between gap-3 w-full
        "
        >
          <div className="w-full flex items-center gap-2">
            <div className="shrink-0 flex items-center justify-center size-6 p-0.5">
              <div className="size-5 bg-transparent border border-secondary rounded-md"></div>
            </div>
            <div className="w-full">
              <Input placeholder="Input element name" value={name} />
            </div>
          </div>
          <div className="shrink-0 w-20">
            <Input placeholder="Input price" value={price} type="number" />
          </div>
          <div className="shrink-0">
            <ButtonIcon
              icon={Save}
              sizeIcon="size-4"
              sizeBtn="size-8"
              isGreen
              onClick={onSave}
            />
          </div>
          <div className="shrink-0">
            <ButtonIcon
              icon={X}
              sizeIcon="size-4"
              sizeBtn="size-8"
              isRed
              onClick={onCancel}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center size-6 p-0.5">
              <div className="size-5 bg-transparent border border-secondary rounded-md"></div>
            </div>
            <p className="text-sm">{name}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm">${price}</span>
            <ButtonIcon
              icon={Pencil}
              sizeIcon="size-4"
              sizeBtn="size-8"
              onClick={onClick}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ButtonAccessory;
