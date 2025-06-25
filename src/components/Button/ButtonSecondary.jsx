// src/components/Button/ButtonSecondary.js

const ButtonSecondary = ({ label, icon: Icon, type = "button", onClick }) => {
  return (
    <button
      type={type}
      className="flex items-center gap-2 bg-white rounded-lg border border-neutral-400 text-sm font-semibold py-2.5 px-5"
      onClick={onClick}
    >
      {Icon && <Icon className="size-4" />}
      <span>{label}</span>
    </button>
  );
};

export default ButtonSecondary;
