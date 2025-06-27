// src/components/ButtonIconPrimary.jsx

const ButtonIconPrimary = ({
  onClick,
  icon: Icon,
  sizeIcon,
  sizeBtn,
  disabled = false,
  isRed = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${sizeBtn} ${
        isRed && !disabled
          ? "text-danger-200"
          : disabled
          ? "text-secondary"
          : "text-white"
      } ${
        disabled
          ? "disabled bg-light"
          : "bg-primary-200 hover:bg-primary-200 focus:border-primary-300 hover:bg-opacity-5 "
      } flex items-center justify-center size-11 border border-neutral-400 rounded-lg p-0.5`}
    >
      <Icon className={sizeIcon} />
    </button>
  );
};

export default ButtonIconPrimary;
