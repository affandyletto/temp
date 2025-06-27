// src/components/Button/ButtonElement.jsx

const ButtonElement = ({
  id,
  name = "Element 1",
  total = 0,
  selected = false,
  onClick = () => {},
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-between w-full rounded-lg border p-3 hover:bg-primary-100 hover:border-blue-100 ${
        selected ? "bg-primary-100 border-blue-100" : "border-neutral-200"
      }`}
    >
      <div className="flex items-center gap-2">
        <div className="size-8 rounded-lg bg-gray-300"></div>
        <p className="text-sm font-semibold">{name}</p>
      </div>
      <span className="bg-primary-100 rounded-full text-[10px] text-primary-200 py-0.5 px-2">
        {total} Accessories
      </span>
    </button>
  );
};

export default ButtonElement;
