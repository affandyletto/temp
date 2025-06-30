// src/components/Card/CardEmptyElement.jsx

import ButtonSecondary from "../Button/ButtonSecondary";
import { Plus } from "lucide-react";

const CardEmptyElement = ({ title, label, description, onClick }) => {
  return (
    <div className="space-y-4 text-center p-8">
      <div className="space-y-0.5">
        <p className="text-sm font-semibold">{title}</p>
        <span className="text-xs text-secondary">
          {description}
        </span>
      </div>
      <div className="flex justify-center">
        <ButtonSecondary
          icon={Plus}
          type={"button"}
          label={label}
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default CardEmptyElement;
