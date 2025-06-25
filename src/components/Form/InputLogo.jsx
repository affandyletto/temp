// src/components/Form/InputLogo.jsx

import React, { useRef, useState } from "react";
import { Plus, X } from "lucide-react";

const InputLogo = ({ title, width = "square" }) => {
  const [image, setImage] = useState(null);
  const inputRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    inputRef.current.click();
  };

  const handleRemove = () => {
    setImage(null);
    inputRef.current.value = "";
  };

  return (
    <div>
      <h6 className="text-sm font-semibold mb-3">{title}</h6>
      <div className="relative mb-2">
        <div
          className={`relative overflow-hidden group flex items-center justify-center ${
            width === "square" ? "w-[200px]" : "w-[400px]"
          } h-[200px] bg-primary-100 border border-dashed border-primary-200 rounded-lg cursor-pointer`}
          onClick={triggerFileInput}
          style={{
            backgroundImage: image ? `url(${image})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {!image && (
            <div className="space-y-2 text-primary-200 text-center">
              <Plus className="size-6 mx-auto" />
              <span className="text-sm">Add Logo</span>
            </div>
          )}
          {image && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation(); // prevent file input trigger
                handleRemove();
              }}
              className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-neutral-200"
            >
              <X className="size-4 text-neutral-600" />
            </button>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>
      <div className="text-[10px]">
        <p>Maximum : 5 MB</p>
        <p>Dimensions: 1000 x 1000 pixels</p>
        <p>Formats: JPEG, PNG, WebP</p>
      </div>
    </div>
  );
};

export default InputLogo;
