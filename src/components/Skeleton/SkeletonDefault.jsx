// src/components/Skeleton/SkeletonDefault.jsx

import Skeleton from "./Skeleton";

const SkeletonDefault = () => {
  return (
    <div>
      <Skeleton width="w-1/3" height="h-10" />
      <Skeleton width="w-2/3" height="h-10" />
      <Skeleton height="h-10" />
    </div>
  );
};

export default SkeletonDefault;
