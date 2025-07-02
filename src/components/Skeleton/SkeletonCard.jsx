// src/components/Skeleton/SkeletonCard.jsx

import Skeleton from "./Skeleton";

const SkeletonCard = () => {
  return (
    <div>
      <Skeleton width="w-1/3" height="h-10" />
      <div className="grid grid-cols-4 gap-6">
        <Skeleton height="h-40" />
        <Skeleton height="h-40" />
        <Skeleton height="h-40" />
        <Skeleton height="h-40" />
      </div>
    </div>
  );
};

export default SkeletonCard;
