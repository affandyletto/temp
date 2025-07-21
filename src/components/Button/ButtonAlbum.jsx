// src/components/Button/ButtonAccessory.jsx
import { Pencil, Save, X } from "lucide-react";
import ButtonIcon from "./ButtonIcon";
import Input from "../Form/Input";

const ButtonAlbum = ({
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
        selected ? "py-2" : "py-2"
      } bg-neutral-200 border-neutral-300`}
    >
        <>
          <div className="flex items-center gap-2">
            <div className="self-stretch justify-start text-gray-800 font-semibold font-['Inter'] text-base leading-normal tracking-tight">{name}</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 relative overflow-hidden">
              <div className={`w-5 h-5 left-[2px] top-[2px] absolute rounded-full border-2 ${selected ? 'bg-white border-cyan-700' : 'border-gray-400'}`}></div>
              {selected && <div className="w-3 h-3 left-[6px] top-[6px] absolute bg-primary-200 rounded-full"></div>}
            </div>
          </div>
        </>
      
    </div>
  );
};

export default ButtonAlbum;