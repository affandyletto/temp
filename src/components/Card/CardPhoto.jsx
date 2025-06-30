// src/components/Card/CardPhoto.jsx

import { CircleUserRound, Clock4, Check } from "lucide-react";

const CardPhoto = ({
  id,
  name,
  elementId,
  cameraName,
  datetime,
  uploadedBy,
  image,
  selectMode = false,
  isSelected = false,
  onSelect = () => {},
}) => {
  return (
    <div
      className={`relative bg-white border ${
        isSelected ? "border-primary-200" : "border-neutral-400"
      } rounded-lg p-2`}
    >
      {/* Checkbox in select mode */}
      {selectMode && (
        <div className="absolute top-4 right-4 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect?.();
            }}
            className={`size-8 rounded-lg border border-neutral-200 flex items-center justify-center bg-white `}
          >
            {isSelected && (
              <div className="flex items-center justify-center bg-primary-200 rounded-md size-4">
                <Check className="text-white size-3" />
              </div>
            )}
          </button>
        </div>
      )}

      <img
        src={image}
        alt={`thumbnail-${id}`}
        className="relative w-full h-[190px] object-cover rounded-lg mb-2"
      />

      <div className="space-y-2">
        <div>
          <p className="text-sm font-semibold">{name}</p>
          <span className="text-xs text-secondary">
            Element ID: {elementId} | {cameraName}
          </span>
        </div>
        <hr />
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-[10px] text-secondary">
            <Clock4 className="size-3" />
            <span>{datetime}</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-secondary">
            <CircleUserRound className="size-3" />
            <span className="line-clamp-1">Uploaded by {uploadedBy}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPhoto;
