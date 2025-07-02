// src/components/Skeleton.jsx

const Skeleton = ({
  width = "w-full",
  height = "h-4",
  rounded = "rounded",
  className = "",
}) => {
  return (
    <div
      className={`animate-pulse bg-neutral-300 ${width} ${height} ${rounded} ${className} mb-5`}
    ></div>
  );
};

export default Skeleton;
