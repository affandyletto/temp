// src/components/Button/ButtonDownload.js

import { Download } from "lucide-react";

const ButtonDownload = ({ sizeIcon, sizeBtn, fileUrl, fileName }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName || "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className={`${sizeBtn} flex items-center justify-center size-11 bg-white border border-neutral-400 hover:bg-primary-200 focus:border-primary-300 hover:bg-opacity-5 rounded-lg p-0.5`}
    >
      <Download className={sizeIcon} />
    </button>
  );
};

export default ButtonDownload;
