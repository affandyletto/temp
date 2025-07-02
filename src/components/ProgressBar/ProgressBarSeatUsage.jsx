// src/components/ProgressBar/ProgressBarSeatUsage.jsx
const ProgressBarSeatUsage = ({
  name = "OneSurvey",
  totalSeats = 20,
  usedSeats = 6,
  isLoading = false,
}) => {
  const remaining = totalSeats - usedSeats;
  const percentage = Math.round((usedSeats / totalSeats) * 100);

  // Skeleton loading component
  if (isLoading) {
    return (
      <div className="space-y-1 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="h-4 bg-neutral-300 rounded w-24"></div>
          <div className="flex items-center space-x-2">
            <div className="h-4 bg-neutral-300 rounded w-20"></div>
            <div className="h-4 bg-neutral-300 rounded w-16"></div>
          </div>
        </div>
        <div className="w-full h-2 bg-neutral-300 rounded-full overflow-hidden">
          <div className="h-full bg-neutral-400 rounded-full w-3/5"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-sm">{name}</span>
        <div className="text-sm">
          <span>
            {usedSeats} / {totalSeats} seats used
          </span>
          <span className="text-secondary ml-2">({remaining} left)</span>
        </div>
      </div>
      <div className="w-full h-2 bg-neutral-300 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-200 rounded-full transition-all duration-300"
          style={{
            width: `${percentage}%`,
            background: `linear-gradient(to right, #3A74C2, #003F7D)`,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBarSeatUsage;