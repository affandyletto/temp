// src/components/ButtonIcon.js

const ButtonIcon = ({ onClick, icon: Icon, sizeIcon, sizeBtn }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${sizeBtn} flex items-center justify-center size-11 bg-white border border-neutral-400 hover:bg-primary-200 focus:border-primary-300 hover:bg-opacity-5 rounded-lg p-0.5`}
    >
      <Icon className={sizeIcon} />
    </button>
  );
};

export default ButtonIcon;
