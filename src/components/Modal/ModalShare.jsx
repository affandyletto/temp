// src/components/Modal/ModalShare.js

import { useState } from "react";
import { Copy, Link2, X } from "lucide-react";
import Input from "@/components/Form/Input";
import Modal from "./Modal";

const ModalShare = ({ title = "Share", url = "/", isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // Reset after 1.5s
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} sizeModal="w-[936px]">
      <div>
        <div className="flex items-start justify-between border-b border-neutral-400 p-6">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="px-6 pb-6 pt-4 space-y-4">
          {/* Input with copy button */}
          <div className="relative">
            <Input id="share_link" label="Share Link" value={url} readOnly />
            <button
              onClick={handleCopy}
              className="absolute right-4 bottom-4 flex items-center justify-center"
              title="Copy Link"
            >
              <Copy className="size-5 text-secondary" />
            </button>
          </div>

          <button
            type="button"
            className={`flex items-center gap-2 bg-white  border border-neutral-400 text-sm py-2.5 px-5 rounded-full`}
            onClick={handleCopy}
          >
            <Link2 className="size-5" />
            <span>{copied ? "Copied!" : "Copy Preview"}</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalShare;
