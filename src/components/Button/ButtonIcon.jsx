// src/components/ButtonIcon.jsx

const ButtonIcon = ({
  onClick,
  icon: Icon,
  sizeIcon,
  sizeBtn,
  disabled = false,
  isRed = false,
  isGreen = false,
}) => {
  const getTextColor = () => {
    if (disabled) return "text-secondary";
    if (isRed) return "text-danger-200";
    if (isGreen) return "text-success-200";
    return "";
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${sizeBtn} ${getTextColor()} ${
        disabled
          ? "disabled bg-light"
          : "bg-white hover:bg-primary-200 focus:border-primary-300 hover:bg-opacity-5"
      } flex items-center justify-center size-11 border border-neutral-400 rounded-lg p-0.5`}
    >
      <Icon className={sizeIcon} />
    </button>
  );
};

export default ButtonIcon;
