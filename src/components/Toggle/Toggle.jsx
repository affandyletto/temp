// src/components/Toggle/Toggle.jsx

const Toggle = ({ label = "", value, onChange = () => {} }) => {
  const isActive = value;
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(!isActive)}
        type="button"
        className={`w-10 h-6 flex items-center rounded-full px-0.5 transition-all duration-300 
        ${isActive ? "bg-primary-200" : "bg-neutral-400"}
      `}
      >
        <div
          className={`bg-white size-5 rounded-full shadow-md transform transition-all duration-300
          ${isActive ? "translate-x-4" : "translate-x-0"}
        `}
        />
      </button>
      {label && <span className="text-sm font-semibold">{label}</span>}
    </div>
  );
};
export default Toggle;