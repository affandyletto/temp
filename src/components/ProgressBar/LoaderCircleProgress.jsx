// src/components/ProgressBar/LoaderCircleProgress.jsx

import { useEffect, useState } from "react";

const LoaderCircleProgress = ({ size = 54, duration = 2000 }) => {
  const [percentage, setPercentage] = useState(0);

  const radius = (size - 4) / 2;
  const stroke = 4;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    let start = null;
    let frame;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const newPercentage = Math.min((progress / duration) * 100, 100);
      setPercentage(newPercentage);

      if (newPercentage < 100) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [duration]);

  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      {/* Background Circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#D4D4D4"
        strokeWidth={stroke}
        fill="none"
      />
      {/* Progress Circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="url(#gradient)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        fill="none"
      />
      {/* Gradient */}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#003F7D" />
          <stop offset="100%" stopColor="#003F7D" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default LoaderCircleProgress;
