// src/components/Button/ButtonPrimary.js
const ButtonPrimary = ({ label, icon: Icon, type = "button", onClick, svg, disabled = false }) => {
  return (
    <button
      type={type}
      className={`flex items-center gap-2 transition-all duration-300 rounded-lg text-sm font-semibold py-2 px-5 ${
        disabled
          ? "bg-gray-300 border border-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-primary-200 hover:bg-primary-300 border border-primary-200 hover:border-primary-300 active:bg-secondary-300 active:border-secondary-300 text-white"
      }`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >    
      {Icon ? <Icon className={`size-4 ${disabled ? "text-gray-500" : ""}`} /> : svg ? <>{svg}</> : ""}
      <span>{label}</span>
    </button>
  );
};
export default ButtonPrimary;