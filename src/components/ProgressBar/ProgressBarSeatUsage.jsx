// src/components/ProgressBar/ProgressBarSeatUsage.jsx

const ProgressBarSeatUsage = ({
  name = "OneSurvey",
  totalSeats = 20,
  usedSeats = 6,
}) => {
  const remaining = totalSeats - usedSeats;
  const percentage = Math.round((usedSeats / totalSeats) * 100);

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
