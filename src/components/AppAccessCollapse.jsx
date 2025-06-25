// src/components/AppAccessCollapse.jsx

import Toggle from "@/components/Toggle/Toggle";
import Checkbox from "@/components/Form/Checkbox";

const AppAccessCollapse = ({
  title = "App Name",
  description = "",
  isEnabled,
  onToggle,
  checkboxes = [],
  onCheckboxChange = () => {},
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-base font-semibold">{title}</p>
          <span className="text-xs text-secondary">{description}</span>
        </div>
        <Toggle value={isEnabled} onChange={onToggle} />
      </div>
      <div
        className={`space-y-2 border-l border-l-neutral-400 pl-5 transition-all duration-300 ease-in-out ${
          isEnabled ? "max-h-[500px]" : "max-h-0 overflow-hidden"
        }`}
      >
        <p className="text-xs text-secondary">Roles:</p>
        <div className="space-y-2">
          {checkboxes.map(({ id, label, value, info }) => (
            <Checkbox
              key={id}
              id={id}
              label={label}
              checked={value}
              isInfo={true}
              info={info}
              onChange={(newVal) => onCheckboxChange(id, newVal)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppAccessCollapse;
